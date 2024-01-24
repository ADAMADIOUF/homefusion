// postApiSlice.js
import { PROPRIETIES_URL, UPLOAD_URL } from '../constants'
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
      query: (id) => `${PROPRIETIES_URL}/${id}`,
    }),

    deletePost: builder.mutation({
      query: (id) => ({
        url: `${PROPRIETIES_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Posts'],
    }),
    uploadPostImage: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
})

export const {
  useGetPropertiesQuery,
  useGetProprietiesByIdQuery,
  useDeletePostMutation,
  useUploadPostImageMutation,
} = proprietiesApiSlice
