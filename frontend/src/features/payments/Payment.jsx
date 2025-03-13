// src/features/payments/Payment.jsx
import { useGetPaymentsQuery } from './paymentsApiSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { memo } from 'react'
import { format } from 'date-fns'

const Payment = ({ paymentId }) => {
  const { payment } = useGetPaymentsQuery('paymentsList', {
    selectFromResult: ({ data }) => ({
      payment: data?.entities[paymentId]
    })
  })

  const navigate = useNavigate()
  const { isAdmin, isTrainer } = useAuth()

  if (payment) {
    const handleEdit = () => navigate(`/dash/payments/${paymentId}`)
    const paymentDate = format(new Date(payment.paymentDate), 'dd MMM yyyy')
    const statusColor = payment.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'

    return (
      <tr className="hover:bg-gray-50">
        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
          {payment.billCode}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          {payment.firstName} {payment.lastName}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">{paymentDate}</td>
        <td className="px-6 py-4 whitespace-nowrap">LKR {payment.amount.toFixed(2)}</td>
        <td className="px-6 py-4 whitespace-nowrap capitalize">{payment.paymentType}</td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColor}`}>
            {payment.status}
          </span>
        </td>
        {(isAdmin || isTrainer) && (
          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <button
              onClick={handleEdit}
              className="text-blue-600 hover:text-blue-900 mr-4"
            >
              <FontAwesomeIcon icon={faEdit} />
            </button>
            <DeletePayment paymentId={paymentId} />
          </td>
        )}
      </tr>
    )
  } else return null
}

const memoizedPayment = memo(Payment)
export default memoizedPayment