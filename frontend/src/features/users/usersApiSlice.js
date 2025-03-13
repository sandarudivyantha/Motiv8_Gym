// src/features/users/usersApiSlice.js
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit"
import { apiSlice } from "../../app/api/apiSlice"

const usersAdapter = createEntityAdapter({})

const initialState = usersAdapter.getInitialState()

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUsers: builder.query({
      query: () => ({
        url: '/users',
        validateStatus: (response, result) => 
          response.status === 200 && !result.isError
      }),
      transformResponse: responseData => {
        return usersAdapter.setAll(initialState, responseData)
      },
      providesTags: (result) => [
        { type: 'User', id: 'LIST' },
        ...result.ids.map(id => ({ type: 'User', id }))
      ]
    }),
    addNewUser: builder.mutation({
      query: userData => ({
        url: '/users',
        method: 'POST',
        body: userData
      }),
      invalidatesTags: [{ type: 'User', id: 'LIST' }]
    }),
    updateUser: builder.mutation({
      query: userData => ({
        url: '/users',
        method: 'PATCH',
        body: userData
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'User', id: arg.id }
      ]
    }),
    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: `/users`,
        method: 'DELETE',
        body: { id }
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'User', id: arg.id }
      ]
    })
  })
})

export const {
  useGetUsersQuery,
  useAddNewUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation
} = usersApiSlice

export const selectUsersResult = usersApiSlice.endpoints.getUsers.select()

const selectUsersData = createSelector(
  selectUsersResult,
  usersResult => usersResult.data
)

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds
} = usersAdapter.getSelectors(state => selectUsersData(state) ?? initialState)