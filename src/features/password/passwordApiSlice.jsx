import { apiSlice } from '../../app/api/apiSlice'

export const passwordsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPasswords: builder.mutation({
      query: () => ({
        url: '/api/v1/user/stored-passwords/2',
        method: 'GET'
      })
    })
  })
})

export const { useGetPasswordsMutation } = passwordsApiSlice
