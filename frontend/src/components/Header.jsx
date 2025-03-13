// src/components/Header.jsx
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="bg-gray-800 text-white">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold">
              Motiv8 Gym
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/login"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header