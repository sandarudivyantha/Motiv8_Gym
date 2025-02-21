import { createSlice } from "@reduxjs/toolkit";

// Creating a slice of the Redux store for authentication
const authSlice = createSlice({
  name: "auth", // The name of the slice
  initialState: { token: null }, // Initial state with a null token
  reducers: {
    // Reducer to set authentication credentials
    setCredentials: (state, action) => {
      const { accessToken } = action.payload; // Extract accessToken from the action payload
      state.token = accessToken; // Store the token in the state
    },
    // Reducer to log out the user by clearing the token
    logOut: (state, action) => {
      state.token = null; // Reset token to null on logout
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions; // Exporting the action creators for use in components
export default authSlice.reducer; // Exporting the reducer to be used in the store
export const selectCurrentToken = (state) => state.auth.token; // Selector function to get the current authentication token from the state
