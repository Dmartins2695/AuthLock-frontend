import { apiSlice } from '../../app/api/apiSlice'

export const passwordsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPasswords: builder.mutation({
      query: (userId) => ({
        url: `/user/stored-passwords/${userId}`,
        method: 'GET'
      })
    }),
    getFavorites: builder.mutation({
      query: (userId) => ({
        url: `/user/stored-passwords/favorites/${userId}`,
        method: 'GET'
      })
    }),
    updatePasswordApi: builder.mutation({
      query: ({ userId, id, password, websiteUrl }) => ({
        url: `/user/${userId}/${id}/update`,
        method: 'POST',
        body: { password, websiteUrl }
      })
    })
  })
})

export const { useGetPasswordsMutation, useGetFavoritesMutation, useUpdatePasswordApiMutation } = passwordsApiSlice
