import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) headers.set('Authorization', `Bearer ${token}`);
    return headers;
  }
});

// Add token refresh logic similar to sample
export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User', 'Payment'],
  endpoints: builder => ({})
});