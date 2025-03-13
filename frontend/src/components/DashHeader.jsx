// src/components/DashHeader.jsx
import { Link, useNavigate } from 'react-router-dom'
import { useSendLogoutMutation } from '../features/auth/authApiSlice'
import useAuth from '../hooks/useAuth'
import { HomeIcon, UserPlusIcon, DocumentPlusIcon, UsersIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline'
import PulseLoader from 'react-spinners/PulseLoader'

const DashHeader = () => {
  const { username, isAdmin, isTrainer } = useAuth()
  const navigate = useNavigate()
  const [sendLogout, { isLoading, isSuccess }] = useSendLogoutMutation()

  const handleLogout = async () => {
    await sendLogout()
    navigate('/')
  }

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link to="/dash" className="flex items-center">
            <span className="text-xl font-bold text-gray-900">Motiv8 Gym</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            {isAdmin || isTrainer ? (
              <>
                <Link
                  to="/dash/users/new"
                  className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                  title="New User"
                >
                  <UserPlusIcon className="h-6 w-6" />
                </Link>
                <Link
                  to="/dash/payments/new"
                  className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                  title="New Payment"
                >
                  <DocumentPlusIcon className="h-6 w-6" />
                </Link>
              </>
            ) : null}

            <button
              onClick={handleLogout}
              className="p-2 text-gray-600 hover:text-red-600 transition-colors"
              title="Logout"
            >
              {isLoading ? (
                <PulseLoader size={8} color="#4B5563" />
              ) : (
                <ArrowLeftOnRectangleIcon className="h-6 w-6" />
              )}
            </button>

            <div className="ml-4 flex items-center">
              <span className="text-sm font-medium text-gray-700">
                {username}
              </span>
              {/* <span className="ml-2 inline-block h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-medium">
                {username?.charAt(0).toUpperCase()}
              </span> */}
              <span className="ml-2 h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-medium">
                {username?.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default DashHeader