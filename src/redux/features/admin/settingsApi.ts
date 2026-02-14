import { baseAPI } from "../../api/baseApi";


interface PlatformSettings {
  maintenance_mode: boolean;
  smtp_email_service: boolean;
  welcome_email: boolean;
  reminder_email: boolean;
}

interface PlatformSettingsResponse {
  success: boolean;
  data: PlatformSettings;
  message?: string;
}

interface UpdatePlatformSettingsRequest {
  maintenance_mode?: boolean;
  smtp_email_service?: boolean;
  welcome_email?: boolean;
  reminder_email?: boolean;
}

export const platformSettingsApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    // GET platform settings
    getPlatformSettings: builder.query<PlatformSettingsResponse, void>({
      query: () => '/admin/platform-settings/',
      providesTags: ['PlatformSettings'],
    }),

    // PATCH update platform settings
    updatePlatformSettings: builder.mutation<PlatformSettingsResponse, UpdatePlatformSettingsRequest>({
      query: (data) => ({
        url: '/admin/platform-settings/',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['PlatformSettings'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetPlatformSettingsQuery,
  useUpdatePlatformSettingsMutation,
} = platformSettingsApi;