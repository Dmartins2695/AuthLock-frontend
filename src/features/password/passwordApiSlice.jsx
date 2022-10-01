import { apiSlice } from '../../app/api/apiSlice'

export const passwordsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPasswords: builder.mutation({
      query: (userId) => ({
        url: `/user/stored-passwords/${userId}`,
        method: 'GET'
      })
    })
  })
})

export const { useGetPasswordsMutation } = passwordsApiSlice
