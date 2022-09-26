import { apiSlice } from '../../app/api/apiSlice'

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: credentials => ({
        url: '/api/v1/auth/login ',
        method: 'POST',
        body: { ...credentials }
      })
    }),
    refresh: builder.mutation({
      query: () => ({
        url: 'api/v1/auth/refresh-token',
        method: 'POST'
      })
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/api/v1/auth/logout',
        method: 'POST'
      })
    })
  })
})

export const { useLoginMutation, useRefreshMutation, useLogoutMutation } = authApiSlice