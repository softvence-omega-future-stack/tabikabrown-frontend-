/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseAPI } from "../../api/baseApi";

// Types
interface OfficeHours {
  id: number;
  mon: string;
  tue: string;
  wed: string;
  thu: string;
  fri: string;
  sat: string;
  sun: string;
}

interface Provider {
  id: number;
  name: string;
  image: string;
  provider_category: string;
  designation: string;
  specializations: string;
  email: string;
  phone: string;
  website?: string;
  address: string;
  city?: string;
  status?: boolean;
  office_hours?: OfficeHours;
}

interface ProviderListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Provider[];
}

// interface CreateProviderRequest {
//   name: string;
//   image: string; // base64 or URL
//   provider_category: string;
//   designation: string;
//   specializations: string;
//   email: string;
//   phone: string;
//   website?: string;
//   address: string;
//   city?: string;
//   office_hours: string; // JSON string containing office hours
// }

// interface UpdateProviderRequest {
//   name?: string;
//   image?: string; // base64 or URL
//   provider_category?: string;
//   designation?: string;
//   specializations?: string;
//   email?: string;
//   phone?: string;
//   website?: string;
//   address?: string;
//   city?: string;
//   office_hours?: string; // JSON string containing office hours
// }

// interface UpdateStatusRequest {
//   status: boolean;
// }

export const providerApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    
    // GET /providers/ - List all providers with pagination
    getProviders: builder.query<ProviderListResponse, { page?: number; search?: string }>({
      query: ({ page = 1, search = '' }) => {
        const params = new URLSearchParams();
        if (page) params.append('page', page.toString());
        if (search) params.append('search', search);
        
        return {
          url: `/providers/?${params.toString()}`,
          method: 'GET',
        };
      },
      providesTags: ['Providers'],
      transformResponse: (response: ProviderListResponse) => {
        console.log('✅ Providers list:', response);
        return response;
      },
    }),

    // GET /providers/{id}/ - Get single provider details
    getProviderById: builder.query<Provider, number>({
      query: (id) => ({
        url: `/providers/${id}/`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'Providers', id }],
      transformResponse: (response: Provider) => {
        console.log('✅ Provider details:', response);
        return response;
      },
    }),

    // POST /providers/ - Create new provider
    createProvider: builder.mutation<Provider, any>({
      query: (data) => {
        console.log('🚀 Creating provider:', data);
        
        // Check if there's an image file
        const hasImageFile = data.imageFile instanceof File;
        
        if (hasImageFile) {
          // Use FormData for file upload
          const formData = new FormData();
          
          formData.append('name', data.name);
          formData.append('provider_category', data.provider_category);
          formData.append('designation', data.designation);
          formData.append('specializations', data.specializations);
          formData.append('email', data.email);
          formData.append('phone', data.phone);
          formData.append('address', data.address);
          formData.append('office_hours', data.office_hours);
          
          if (data.website) formData.append('website', data.website);
          if (data.city) formData.append('city', data.city);
          if (data.imageFile) formData.append('image', data.imageFile);
          
          console.log('📤 Sending FormData');
          
          return {
            url: '/providers/',
            method: 'POST',
            body: formData,
          };
        } else {
          // Regular JSON (if image is base64 string)
          const {  ...jsonData } = data;
          
          return {
            url: '/providers/',
            method: 'POST',
            body: jsonData,
          };
        }
      },
      invalidatesTags: ['Providers'],
      transformResponse: (response: Provider) => {
        console.log('✅ Provider created:', response);
        return response;
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transformErrorResponse: (error: any) => {
        console.error('❌ Create provider error:', error);
        return error;
      },
    }),

    // PATCH /providers/{id}/ - Update provider
    updateProvider: builder.mutation<Provider, { id: number; data: any }>({
      query: ({ id, data }) => {
        console.log('🚀 Updating provider:', id, data);
        
        const hasImageFile = data.imageFile instanceof File;
        
        if (hasImageFile) {
          // Use FormData for file upload
          const formData = new FormData();
          
          if (data.name !== undefined) formData.append('name', data.name);
          if (data.provider_category !== undefined) formData.append('provider_category', data.provider_category);
          if (data.designation !== undefined) formData.append('designation', data.designation);
          if (data.specializations !== undefined) formData.append('specializations', data.specializations);
          if (data.email !== undefined) formData.append('email', data.email);
          if (data.phone !== undefined) formData.append('phone', data.phone);
          if (data.address !== undefined) formData.append('address', data.address);
          if (data.office_hours !== undefined) formData.append('office_hours', data.office_hours);
          if (data.website !== undefined) formData.append('website', data.website);
          if (data.city !== undefined) formData.append('city', data.city);
          if (data.imageFile) formData.append('image', data.imageFile);
          
          return {
            url: `/providers/${id}/`,
            method: 'PATCH',
            body: formData,
          };
        } else {
          // Regular JSON
          const {...jsonData } = data;
          
          return {
            url: `/providers/${id}/`,
            method: 'PATCH',
            body: jsonData,
          };
        }
      },
      invalidatesTags: (result, error, { id }) => [
        'Providers',
        { type: 'Providers', id }
      ],
      transformResponse: (response: Provider) => {
        console.log('✅ Provider updated:', response);
        return response;
      },
    }),

    // DELETE /providers/{id}/ - Delete provider
    deleteProvider: builder.mutation<void, number>({
      query: (id) => ({
        url: `/providers/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Providers'],
      transformResponse: () => {
        console.log('✅ Provider deleted');
      },
    }),

    // PATCH /providers/status-update/ - Update provider status
    updateProviderStatus: builder.mutation<void, { id: number; status: boolean }>({
      query: ({ id, status }) => {
        console.log('🚀 Updating provider status:', id, status);
        
        return {
          url: `/providers/status-update/`,
          method: 'PATCH',
          body: { status },
          // Note: You might need to pass id as query param or in body
          // Check your API documentation for exact requirement
        };
      },
      invalidatesTags: ['Providers'],
      transformResponse: () => {
        console.log('✅ Provider status updated');
      },
    }),

  }),
  overrideExisting: false,
});

export const {
  useGetProvidersQuery,
  useGetProviderByIdQuery,
  useCreateProviderMutation,
  useUpdateProviderMutation,
  useDeleteProviderMutation,
  useUpdateProviderStatusMutation,
} = providerApi;