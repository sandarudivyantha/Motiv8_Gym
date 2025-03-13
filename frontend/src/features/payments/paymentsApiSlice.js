// src/features/payments/paymentsApiSlice.js
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit"
import { apiSlice } from "../../app/api/apiSlice"

const paymentsAdapter = createEntityAdapter({
  sortComparer: (a, b) => new Date(b.paymentDate) - new Date(a.paymentDate)
})

const initialState = paymentsAdapter.getInitialState()

export const paymentsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getPayments: builder.query({
      query: () => '/payments',
      transformResponse: responseData => {
        return paymentsAdapter.setAll(initialState, responseData)
      },
      providesTags: (result) => [
        { type: 'Payment', id: 'LIST' },
        ...result.ids.map(id => ({ type: 'Payment', id }))
      ]
    }),
    createAdmissionPayment: builder.mutation({
      query: paymentData => ({
        url: '/payments/admission',
        method: 'POST',
        body: paymentData
      }),
      invalidatesTags: [{ type: 'Payment', id: 'LIST' }]
    }),
    createMonthlyPayment: builder.mutation({
      query: paymentData => ({
        url: '/payments/monthly',
        method: 'POST',
        body: paymentData
      }),
      invalidatesTags: [{ type: 'Payment', id: 'LIST' }]
    }),
    updatePayment: builder.mutation({
      query: paymentData => ({
        url: `/payments/${paymentData.id}`,
        method: 'PATCH',
        body: paymentData
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Payment', id: arg.id }
      ]
    }),
    deletePayment: builder.mutation({
      query: ({ id }) => ({
        url: `/payments/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Payment', id: arg.id }
      ]
    })
  })
})

export const {
  useGetPaymentsQuery,
  useCreateAdmissionPaymentMutation,
  useCreateMonthlyPaymentMutation,
  useUpdatePaymentMutation,
  useDeletePaymentMutation
} = paymentsApiSlice

export const selectPaymentsResult = paymentsApiSlice.endpoints.getPayments.select()

const selectPaymentsData = createSelector(
  selectPaymentsResult,
  paymentsResult => paymentsResult.data
)

export const {
  selectAll: selectAllPayments,
  selectById: selectPaymentById,
  selectIds: selectPaymentIds
} = paymentsAdapter.getSelectors(state => selectPaymentsData(state) ?? initialState)