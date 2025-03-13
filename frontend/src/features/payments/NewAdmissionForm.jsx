// src/features/payments/NewAdmissionForm.jsx
import { useState } from 'react'
import { useCreateAdmissionPaymentMutation } from './paymentsApiSlice'
import { useNavigate } from 'react-router-dom'

const NewAdmissionForm = () => {
  const [createPayment, { isLoading, isSuccess, isError, error }] = useCreateAdmissionPaymentMutation()
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [amount, setAmount] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    await createPayment({ username, amount })
    if (isSuccess) navigate('/dash/payments')
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">New Admission Payment</h2>
      
      {isError && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
          {error.data?.message || 'Failed to create payment'}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            required
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

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

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? 'Processing...' : 'Create Payment'}
        </button>
      </form>
    </div>
  )
}

export default NewAdmissionForm