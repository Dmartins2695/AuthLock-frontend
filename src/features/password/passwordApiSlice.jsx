import { apiSlice } from '../../app/api/apiSlice'

export const passwordsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPasswords: builder.mutation({
      query: (userId) => ({
        url: `/user/stored-passwords/${userId}`,
        method: 'GET'
      })
    }),
    updatePasswordApi: builder.mutation({
      query: ({ userId, id, password, websiteUrl }) => ({
        url: `/user/${userId}/${id}/update`,
        method: 'PATCH',
        body: { password, websiteUrl }
      })
    }),
    createPasswordApi: builder.mutation({
      query: ({ userId, password, websiteUrl }) => ({
        url: `/user/${userId}/create`,
        method: 'POST',
        body: { password, websiteUrl }
      })
    }),
    setFavoriteApi: builder.mutation({
      query: ({ userId, id }) => ({
        url: `/user/${userId}/${id}/favorite`,
        method: 'PATCH'
      })
    }),
    deletePasswordApi: builder.mutation({
      query: ({ userId, id }) => ({
        url: `/user/${userId}/${id}/delete`,
        method: 'DELETE'
      })
    })
  })
})

export const {
  useGetPasswordsMutation,
  useUpdatePasswordApiMutation,
  useCreatePasswordApiMutation,
  useSetFavoriteApiMutation,
  useDeletePasswordApiMutation
} = passwordsApiSlice
