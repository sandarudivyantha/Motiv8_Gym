import { apiSlice } from "../../app/api/apiSlice";
import { createEntityAdapter } from "@reduxjs/toolkit";

// Create an entity adapter for managing payments in a normalized state
const paymentsAdapter = createEntityAdapter({});
const initialState = paymentsAdapter.getInitialState(); // Get the initial empty state for payments

// Inject payment-related endpoints into the base API slice
export const paymentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Define a query to fetch all payments
    getPayments: builder.query({
      query: () => "/payments", // API endpoint for fetching payment records
      // Transform the API response into a normalized state using paymentsAdapter
      transformResponse: (responseData) => {
        return paymentsAdapter.setAll(initialState, responseData);
      },
      // Tags help in automatic cache updates when data changes
      providesTags: (result) => [
        { type: "Payment", id: "LIST" }, // Used for cache invalidation on payment list updates
        ...result.ids.map((id) => ({ type: "Payment", id })), // Associate tags with each payment
      ],
    }),
    // Define a mutation to create a new payment
    createPayment: builder.mutation({
      query: (paymentData) => ({
        url: "/payments", // API endpoint for creating a new payment
        method: "POST", // HTTP method
        body: paymentData, // Send payment details in the request body
      }),
      // Invalidate the payment list tag to trigger a cache refresh
      invalidatesTags: [{ type: "Payment", id: "LIST" }],
    }),
    // Define a mutation to update an existing payment
    updatePayment: builder.mutation({
      query: (paymentData) => ({
        url: `/payments/${paymentData.id}`, // API endpoint for updating a specific payment
        method: "PATCH", // HTTP method for partial updates
        body: paymentData, // Send updated payment details in the request body
      }),
      // Invalidate the cache for the specific updated payment
      invalidatesTags: (result, error, arg) => [
        { type: "Payment", id: arg.id },
      ],
    }),
    // Define a mutation to delete a payment
    deletePayment: builder.mutation({
      query: ({ id }) => ({
        url: `/payments/${id}`, // API endpoint for deleting a payment
        method: "DELETE", // HTTP DELETE method
      }),
      // Invalidate the cache for the deleted payment
      invalidatesTags: (result, error, arg) => [
        { type: "Payment", id: arg.id },
      ],
    }),
  }),
});

// Export hooks for the defined endpoints to be used in React components
export const {
  useGetPaymentsQuery, // Hook for fetching payments
  useCreatePaymentMutation, // Hook for creating a new payment
  useUpdatePaymentMutation, // Hook for updating a payment
  useDeletePaymentMutation, // Hook for deleting a payment
} = paymentsApiSlice;
