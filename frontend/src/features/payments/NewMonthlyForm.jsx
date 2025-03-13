// src/features/payments/NewMonthlyForm.jsx
import { useState } from 'react'
import { useCreateMonthlyPaymentMutation } from './paymentsApiSlice'
import { useNavigate } from 'react-router-dom'

const NewMonthlyForm = () => {
  const [createPayment, { isLoading, isSuccess, isError, error }] = useCreateMonthlyPaymentMutation()
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [amount, setAmount] = useState('')
  const [validFrom, setValidFrom] = useState('')
  const [validTo, setValidTo] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    await createPayment({ username, amount, validFrom, validTo })
    if (isSuccess) navigate('/dash/payments')
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">New Monthly Payment</h2>
      
      {isError && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
          {error.data?.message || 'Failed to create payment'}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Username and Amount fields same as Admission */}
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

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:opacity-50"
        >
          {isLoading ? 'Processing...' : 'Create Payment'}
        </button>
      </form>
    </div>
  )
}

export default NewMonthlyForm