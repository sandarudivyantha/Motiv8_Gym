// src/features/auth/Welcome.jsx
import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const Welcome = () => {
  const { username, isAdmin, isTrainer } = useAuth()

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Welcome {username}!</h1>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Link
          to="/dash/payments"
          className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-2">Manage Payments</h2>
          <p className="text-gray-600">View and manage all payment records</p>
        </Link>

        {(isAdmin || isTrainer) && (
          <Link
            to="/dash/users"
            className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">Manage Users</h2>
            <p className="text-gray-600">View and manage user accounts</p>
          </Link>
        )}
      </div>
    </div>
  )
}

export default Welcome