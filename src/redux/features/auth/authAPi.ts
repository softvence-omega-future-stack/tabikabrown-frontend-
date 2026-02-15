
import { baseAPI } from "../../api/baseApi";

export const userAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    
    login: build.mutation({
      query: (data: { email: string; password: string }) => ({
        url: "/accounts/login/",
        method: "POST",
        body: data,
      }),
    }),

   // 🟢 Token Refresh Endpoint - CORRECT URL
    refreshToken: build.mutation({
      query: (refreshToken: string) => ({
        url: "/accounts/token-refresh/", 
        method: "POST",
        body: { refresh: refreshToken },
      }),
    }),


       EmailverifyOTP: build.mutation({
      query: (data) => ({
        url: "/accounts/password-forgot-request/",
        method: "POST",
        body: data,
      }),
    }),


    registerUser: build.mutation({
      query: (data: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        acceptedTerms: boolean;
      }) => {
    
        return {
          url: "/auth/doctor/register",
          method: "POST",
          body: data,
        };
      },
 
    }),

     
     verifyOTP: build.mutation({
      query: (data) => ({
        url: "/auth/verified-account",
        method: "POST",
        body: data,
      }),
    }),

    resendOTP: build.mutation({
      query: (data) => ({
        url: "/accounts/resend-otp/",
        method: "POST",
        body: data,
      }),
    }),

        forgotPassword: build.mutation({
      query: (data) => ({
        url: "/accounts/password-forgot-confirm/",
        method: "POST",
        body: data,
      }),
    }),
        chnagePassword: build.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "POST",
        body: data,
      }),
    }),

    resetPassword: build.mutation({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
      }),
    }),

    // Admin Endpoints
    adminLogin: build.mutation({
      query: (data: { email: string; password: string }) => ({
        url: "/auth/admin/login",
        method: "POST",
        body: data,
      }),
    }),
    adminRegister: build.mutation({
      query: (data: { 
        email: string; 
        password: string; 
        firstName: string; 
        lastName: string 
      }) => ({
        url: "/auth/admin/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [],
    }),
  }),
});

export const {
  useLoginMutation,
   useRefreshTokenMutation,
  useRegisterUserMutation,
   useForgotPasswordMutation,
   useChnagePasswordMutation,
  useResetPasswordMutation,
  useVerifyOTPMutation,
  useEmailverifyOTPMutation,
  useAdminLoginMutation,
  useAdminRegisterMutation,
} = userAPI;
