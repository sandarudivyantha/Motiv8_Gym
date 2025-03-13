// src/features/payments/EditPaymentForm.jsx
import { useState, useEffect } from 'react'
import { useUpdatePaymentMutation } from './paymentsApiSlice'
import { useNavigate } from 'react-router-dom'

const EditPaymentForm = ({ payment }) => {
  const [updatePayment, { isLoading, isSuccess, isError, error }] = useUpdatePaymentMutation()
  const navigate = useNavigate()

  const [amount, setAmount] = useState(payment.amount)
  const [status, setStatus] = useState(payment.status)
  const [validFrom, setValidFrom] = useState(payment.validFrom || '')
  const [validTo, setValidTo] = useState(payment.validTo || '')

  useEffect(() => {
    if (isSuccess) navigate('/dash/payments')
  }, [isSuccess, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const updateData = {
      id: payment.id,
      amount,
      status,
      ...(payment.paymentType === 'Monthly' && { validFrom, validTo })
    }
    await updatePayment(updateData)
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Edit Payment - {payment.billCode}</h2>
      
      {isError && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
          {error.data?.message || 'Failed to update payment'}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Amount</label>
          <input
            type="number"
            step="0.01"
            required
            value={amount}
            onChange={e => setAmount(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            value={status}
            onChange={e => setStatus(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {payment.paymentType === 'Monthly' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Valid From</label>
              <input
                type="date"
                required
                value={validFrom}
                onChange={e => setValidFrom(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Valid To</label>
              <input
                type="date"
                required
                value={validTo}
                onChange={e => setValidTo(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? 'Updating...' : 'Update Payment'}
        </button>
      </form>
    </div>
  )
}

export default EditPaymentForm