// src/components/DashFooter.jsx
import { useAuth } from '../hooks/useAuth'

const DashFooter = () => {
  const { username, isAdmin, isTrainer } = useAuth()
  
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Current User: {username}
          </p>
          <div className="flex space-x-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              Status: {isAdmin ? 'Admin' : isTrainer ? 'Trainer' : 'Member'}
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default DashFooter