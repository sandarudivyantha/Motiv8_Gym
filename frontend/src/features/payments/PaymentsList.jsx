// src/features/payments/PaymentsList.jsx
import { useGetPaymentsQuery } from './paymentsApiSlice'
import Payment from './Payment'
import PulseLoader from 'react-spinners/PulseLoader'
import useAuth from '../../hooks/useAuth'

const PaymentsList = () => {
  const { isAdmin, isTrainer } = useAuth()
  const {
    data: payments,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetPaymentsQuery(undefined, {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  })

  let content

  if (isLoading) content = <PulseLoader color="#3B82F6" className="mt-8"/>

  if (isError) {
    content = <div className="p-4 text-red-600 bg-red-100 rounded-lg">
      {error?.data?.message || 'Failed to load payments'}
    </div>
  }

  if (isSuccess) {
    const { ids } = payments
    const tableContent = ids?.length && ids.map(paymentId => (
      <Payment key={paymentId} paymentId={paymentId} />
    ))

    content = (
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bill Code</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Member</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              {(isAdmin || isTrainer) && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tableContent}
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Payment Records</h1>
        {(isAdmin || isTrainer) && (
          <div className="space-x-4">
            <a 
              href="/dash/payments/new/admission"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              New Admission
            </a>
            <a 
              href="/dash/payments/new/monthly"
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              New Monthly
            </a>
          </div>
        )}
      </div>
      {content}
    </div>
  )
}

export default PaymentsList