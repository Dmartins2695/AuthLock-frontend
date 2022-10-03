import { apiSlice } from '../../app/api/apiSlice'

export const analyticsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOutdatedCount: builder.mutation({
      query: (userId) => ({
        url: `/user/stored-passwords/outdated/${userId}`,
        method: 'GET'
      })
    }),
    getWeakCount: builder.mutation({
      query: (userId) => ({
        url: `/user/stored-passwords/weak/${userId}`,
        method: 'GET'
      })
    }),
    getDuplicatedCount: builder.mutation({
      query: (userId) => ({
        url: `/user/stored-passwords/duplicated/${userId}`,
        method: 'GET'
      })
    })
  })
})

export const { useGetOutdatedCountMutation, useGetWeakCountMutation, useGetDuplicatedCountMutation } = analyticsApiSlice
