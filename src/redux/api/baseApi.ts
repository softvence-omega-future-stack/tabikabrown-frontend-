/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";
import { setCredentials, logout } from "../features/auth/authSlice";

const baseQueryAPI = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  prepareHeaders: (headers, { getState, endpoint }) => {
    const state = getState() as RootState;
    let token = state.auth.token;
    
    // Check if token is invalid
    if (token === 'undefined' || token === undefined || token === null || token === '') {
      token = null;
    }
    
    console.log('=== API Call Debug ===');
    console.log('Endpoint:', endpoint);
    console.log('Token exists:', !!token);
    
    // 🟢 Public endpoints (no token needed)
    const publicEndpoints = [
      'login',
      'register',
      'verifyOTP',
      'resendOTP',
      'forgotPassword',
      'resetPassword',
      'changePassword',
      'EmailverifyOTP',
      'adminLogin',
      'adminRegister',
      'password-forgot',
      'verified-account',
      'token-refresh', // 🟢 Add refresh endpoint
    ];
    
    const isPublicEndpoint = publicEndpoints.some(
      e => endpoint?.toLowerCase().includes(e.toLowerCase())
    );
    
    // Only add token for protected endpoints
    if (token && !isPublicEndpoint) {
      headers.set("Authorization", `Bearer ${token}`);
      console.log('✅ Authorization header set');
    } else {
      console.log(isPublicEndpoint ? '⚠️ Public endpoint' : '❌ No valid token');
    }
    
    console.log('======================');
    
    return headers;
  },
});

// 🟢 Custom baseQuery with auto token refresh
const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQueryAPI(args, api, extraOptions);
  
  // 🟢 If we get 401 Unauthorized (token expired)
  if (result.error && result.error.status === 401) {
    console.log('⚠️ 401 Error - Token may be expired, attempting refresh...');
    
    const state = api.getState() as RootState;
    const refreshToken = state.auth.refreshToken;
    
    if (refreshToken) {
      console.log('🔄 Refreshing token...');
      
      // Try to refresh the token
      const refreshResult = await baseQueryAPI(
        {
          url: '/accounts/token-refresh/', // 🟢 Correct endpoint
          method: 'POST',
          body: { refresh: refreshToken },
        },
        api,
        extraOptions
      );
      
      if (refreshResult.data) {
        console.log('✅ Token refreshed successfully!');
        
        // Extract new access token
        const newAccessToken = (refreshResult.data as any).access;
        const user = state.auth.user;
        
        // Update Redux store with new token
        api.dispatch(
          setCredentials({
            user,
            token: newAccessToken,
            refreshToken: refreshToken, // Keep same refresh token
          })
        );
        
        // 🟢 Retry the original request with new token
        console.log('🔁 Retrying original request with new token...');
        result = await baseQueryAPI(args, api, extraOptions);
      } else {
        // Refresh failed - logout user
        console.log('❌ Token refresh failed - logging out');
        api.dispatch(logout());
        
        // Redirect to login page
        window.location.href = '/login';
      }
    } else {
      // No refresh token available - logout
      console.log('❌ No refresh token available - logging out');
      api.dispatch(logout());
      window.location.href = '/login';
    }
  }
  
  return result;
};

export const baseAPI = createApi({
  reducerPath: "baseAPI",
  baseQuery: baseQueryWithReauth, // 🟢 Use wrapped version with auto-refresh
  tagTypes: [
    "AdminProfile",
    "PlatformSettings",
    "Users",
    "Doctors",
    "Appointments",
    "Notifications",
    "Providers",
  ],
  endpoints: () => ({}),
});