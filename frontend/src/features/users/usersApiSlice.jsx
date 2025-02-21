import { apiSlice } from "../../app/api/apiSlice";
import { createEntityAdapter } from "@reduxjs/toolkit";

const usersAdapter = createEntityAdapter({}); // Create an entity adapter for managing user state in a normalized way
const initialState = usersAdapter.getInitialState(); // Get the initial empty state for users

// Inject user-related endpoints into the base API slice
export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Define a query to fetch all users
    getUsers: builder.query({
      query: () => "/user", // API endpoint for fetching users
      // Transform the API response into a normalized state using usersAdapter
      transformResponse: (responseData) => {
        return usersAdapter.setAll(initialState, responseData);
      },
      // Tags help in automatic cache updates when data changes
      providesTags: (result) => [
        { type: "User", id: "LIST" }, // Used for cache invalidation on user list updates
        ...result.ids.map((id) => ({ type: "User", id })), // Associate tags with each user
      ],
    }),
    // Define a mutation to add a new user
    addNewUser: builder.mutation({
      query: (userData) => ({
        url: "/user", // API endpoint for adding a new user
        method: "POST", // HTTP method
        body: userData, // Send the new user data in the request body
      }),
      // Invalidate the user list tag to trigger a cache refresh
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    // Define a mutation to update an existing user
    updateUser: builder.mutation({
      query: (userData) => ({
        url: `/user/${userData.id}`, // API endpoint for updating a specific user
        method: "PATCH", // HTTP method for partial updates
        body: userData, // Send updated user data in the request body
      }),
      // Invalidate the cache for the specific updated user
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
    // Define a mutation to delete a user
    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: `/user/${id}`, // API endpoint for deleting a user
        method: "DELETE", // HTTP DELETE method
      }),
      // Invalidate the cache for the deleted user
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
  }),
});

// Export hooks for the defined endpoints to be used in React components
export const {
  useGetUsersQuery, // Hook for fetching users
  useAddNewUserMutation, // Hook for adding a new user
  useUpdateUserMutation, // Hook for updating a user
  useDeleteUserMutation, // Hook for deleting a user
} = usersApiSlice;
