import { apiSlice } from "../../app/api/apiSlice";
import { logOut, setCredentials } from "./authSlice";

// Inject authentication-related endpoints into the base API slice
export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Define the login endpoint as a mutation
    login: builder.mutation({
      // Function to build the query for login; takes user credentials and posts them
      query: (credentials) => ({
        url: "/auth", // Endpoint URL for login
        method: "POST", // HTTP method
        body: { ...credentials }, // Spread the credentials into the body
      }),
    }),
    // Define the sendLogout endpoint as a mutation
    sendLogout: builder.mutation({
      // Build the query to log out; no body required
      query: () => ({
        url: "/auth/logout", // Endpoint URL for logout
        method: "POST", // HTTP method for logout
      }),
      // Extra side effect that runs when the query is started
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled; // Wait until the logout query is fulfilled
          dispatch(logOut()); // Dispatch the logOut action to clear auth state
          // Reset the API state after 1 second to clear any cached data
          setTimeout(() => {
            dispatch(apiSlice.util.resetApiState());
          }, 1000);
        } catch (err) {
          console.log(err);
        }
      },
    }),
    // Define the refresh endpoint as a mutation to refresh tokens
    refresh: builder.mutation({
      // Build the query to refresh the token
      query: () => ({
        url: "/auth/refresh", // Endpoint URL for token refresh
        method: "GET", // HTTP method for token refresh
      }),
      // Extra side effect that runs when the query is started
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          // Wait for the refresh query to be fulfilled and destructure the data
          const { data } = await queryFulfilled;
          // Dispatch the setCredentials action with the new token data
          dispatch(setCredentials({ ...data }));
        } catch (err) {
          // Log any error that occurs during token refresh
          console.log(err);
        }
      },
    }),
  }),
});

// Export hooks for the defined endpoints so they can be used in components
export const { useLoginMutation, useSendLogoutMutation, useRefreshMutation } =
  authApiSlice;
