import { CONTACT_APPLICATION_URL, CONTACT_FORM_URL, CONTACT_MAINTENANCE_URL, CONTACT_URL } from '../constants'
import { apiSlice } from './apiSlice'

export const contactApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendContactForm: builder.mutation({
      query: (data) => ({
        url: CONTACT_URL,
        method: 'POST',
        body: data,
      }),
    }),
    contactForm: builder.mutation({
      query: (data) => ({
        url: CONTACT_FORM_URL,
        method: 'POST',
        body: data,
      }),
    }),
    contactApplication: builder.mutation({
      query: (data) => ({
        url: CONTACT_APPLICATION_URL,
        method: 'POST',
        body: data,
      }),
    }),
    contactMaintenance: builder.mutation({
      query: (data) => ({
        url: CONTACT_MAINTENANCE_URL,
        method: 'POST',
        body: data,
      }),
    }),
  }),
})

export const { useSendContactFormMutation,useContactFormMutation,useContactApplicationMutation ,useContactMaintenanceMutation} = contactApiSlice
