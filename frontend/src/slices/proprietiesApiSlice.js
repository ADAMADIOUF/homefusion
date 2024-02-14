// postApiSlice.js
import { PROPRIETIES_URL, UPLOAD_URL ,PAYMENTSRENT_URL, UPLOAD_PROPRIETY_URL} from '../constants'
import { apiSlice } from './apiSlice'
export const proprietiesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProperties: builder.query({
      query: () => ({
        url: PROPRIETIES_URL,
      }),
      providesTags: ['Proprieties'],
    }),
    getProprietiesById: builder.query({
      query: (productId) => ({
        url: `${PROPRIETIES_URL}/${productId}`,
      }),

      keepUnusedDataFor: 5,
    }),
    createPropriety: builder.mutation({
      query: () => ({
        url: PROPRIETIES_URL,
        method: 'POST',
      }),

      invalidatesTags: ['Proprieties'],
    }),
    updatePropriety: builder.mutation({
      query: (data) => ({
        url: `${PROPRIETIES_URL}/${data.productId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Proprieties'],
    }),
    deletePropriety: builder.mutation({
      query: (productId) => ({
        url: `${PROPRIETIES_URL}/${productId}`,
        method: 'DELETE',
      }),
    }),
    uploadPostImage: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    uploadProprietyImage: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_PROPRIETY_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    savePaymentDetails: builder.mutation({
      query: (paymentDetails) => ({
        url: PAYMENTSRENT_URL,
        method: 'POST',
        body: paymentDetails,
      }),
    }),
  }),
})

export const {
  useGetPropertiesQuery,
  useGetProprietiesByIdQuery,
  useCreateProprietyMutation,
  useUpdateProprietyMutation,  useDeleteProprietyMutation,
  useUploadProprietyImageMutation,
  useUploadPostImageMutation,
  useSavePaymentDetailsMutation
} = proprietiesApiSlice
