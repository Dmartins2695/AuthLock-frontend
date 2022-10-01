import { apiSlice } from '../../app/api/apiSlice'

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login ',
        method: 'POST',
        body: { ...credentials }
      })
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: '/registration',
        method: 'POST',
        body: { ...credentials }
      })
    }),
    confirmToken: builder.mutation({
      query: (token) => ({
        url: '/registration/confirm',
        method: 'GET',
        params: { token }
      })
    }),
    refresh: builder.mutation({
      query: () => ({
        url: '/auth/refresh-token',
        method: 'POST'
      })
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST'
      })
    })
  })
})

export const { useLoginMutation, useRefreshMutation, useLogoutMutation, useRegisterMutation, useConfirmTokenMutation } = authApiSlice
