/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface AuthState {
  user: any;
  token: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token") || null,
  refreshToken: localStorage.getItem("refreshToken") || null,
  loading: false,
  error: null,
};

// Login action
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, data);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      console.log('=== setCredentials Called ===');
      console.log('Payload:', action.payload);
      
      const { user, token, refreshToken } = action.payload;
      
      // 🟢 VALIDATE: Make sure token is a real string, not 'undefined'
      if (!token || token === 'undefined' || typeof token !== 'string') {
        console.error('❌ Invalid token received:', token);
        return; // Don't save invalid token
      }
      
      console.log('✅ Valid token received');
      
      state.user = user;
      state.token = token;
      state.refreshToken = refreshToken || null;
      
      // Save to localStorage
      localStorage.setItem("token", token);
      
      if (refreshToken && refreshToken !== 'undefined') {
        localStorage.setItem("refreshToken", refreshToken);
      }
      
      console.log('✅ Credentials saved');
      console.log('Token (first 30 chars):', token.substring(0, 30) + '...');
    },
    
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      console.log('✅ Logged out - tokens cleared');
    },
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        
        // 🟢 VALIDATE token here too
        const token = action.payload.token || action.payload.access;
        
        if (!token || token === 'undefined') {
          console.error('❌ No valid token in response');
          state.error = 'Authentication failed - no token received';
          return;
        }
        
        state.user = action.payload.user;
        state.token = token;
        localStorage.setItem("token", token);
      })
      .addCase(loginUser.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload?.message || 'Login failed';
      });
  },
});

export const { logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;








// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// interface AuthState {
//   user: any;
//   token: string | null;
//   loading: boolean;
//   error: string | null;
// }

// const initialState: AuthState = {
//   user: null,
//   token: localStorage.getItem("token") || null,
//   loading: false,
//   error: null,
// };

// // Login action
// export const loginUser = createAsyncThunk(
//   "auth/loginUser",
//   async (data: { email: string; password: string }, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, data);
//       return response.data;
//     } catch (err: any) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

// export const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     // ✅ এই reducer টা যোগ করুন
//     setCredentials: (state, action) => {
//       state.user = action.payload.user;
//       state.token = action.payload.token;
//       localStorage.setItem("token", action.payload.token);
//     },
//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//       localStorage.removeItem("token");
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//         localStorage.setItem("token", action.payload.token);
//       })
//       .addCase(loginUser.rejected, (state, action: any) => {
//         state.loading = false;
//         state.error = action.payload.message;
//       });
//   },
// });


// export const { logout, setCredentials } = authSlice.actions;
// export default authSlice.reducer;






// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// interface AuthState {
//   user: any;
//   token: string | null;
//   loading: boolean;
//   error: string | null;
// }

// const initialState: AuthState = {
//   user: null,
//   token: localStorage.getItem("token") || null,
//   loading: false,
//   error: null,
// };

// // Login action
// export const loginUser = createAsyncThunk(
//   "auth/loginUser",
//   async (data: { email: string; password: string }, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, data);
//       return response.data;
//     } catch (err: any) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

// export const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//       localStorage.removeItem("token");
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//         localStorage.setItem("token", action.payload.token);
//       })
//       .addCase(loginUser.rejected, (state, action: any) => {
//         state.loading = false;
//         state.error = action.payload.message;
//       });
//   },
// });

// export const { logout } = authSlice.actions;
// export default authSlice.reducer;