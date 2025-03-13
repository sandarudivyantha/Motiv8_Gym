// src/features/payments/DeletePayment.jsx
import { useState } from 'react'
import { useDeletePaymentMutation } from './paymentsApiSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import Modal from '../../components/Modal'

const DeletePayment = ({ paymentId }) => {
  const [showModal, setShowModal] = useState(false)
  const [deletePayment, { isLoading }] = useDeletePaymentMutation()

  const handleDelete = async () => {
    await deletePayment({ id: paymentId })
    setShowModal(false)
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="text-red-600 hover:text-red-900"
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Confirm Delete"
      >
        <div className="space-y-4">
          <p>Are you sure you want to delete this payment?</p>
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setShowModal(false)}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={isLoading}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
            >
              {isLoading ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default DeletePayment