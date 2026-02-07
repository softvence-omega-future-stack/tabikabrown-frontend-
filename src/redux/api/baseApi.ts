import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";


const baseQueryAPI = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL, 
  prepareHeaders: (headers, { getState }) => {
    const accessToken = (getState() as RootState).auth.token;
    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
});

export const baseAPI = createApi({
  reducerPath: "baseAPI",
  baseQuery: baseQueryAPI,
  tagTypes: ["User", "Doctor", "Appointments", "Notifications"], 
  endpoints: () => ({}),
});