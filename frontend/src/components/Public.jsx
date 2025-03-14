// src/components/Public.jsx
import { Link } from 'react-router-dom'

const Public = () => {
  return (
    <section className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to <span className="text-blue-500">Motiv8 Gym</span>
          </h1>
          <p className="text-xl text-gray-300">
            Transform your body, empower your mind
          </p>
        </header>

        <main className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Why Choose Us?</h2>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <span className="text-blue-500 mr-2">✓</span>
                  State-of-the-art equipment
                </li>
                <li className="flex items-center">
                  <span className="text-blue-500 mr-2">✓</span>
                  Certified professional trainers
                </li>
                <li className="flex items-center">
                  <span className="text-blue-500 mr-2">✓</span>
                  24/7 facility access
                </li>
                <li className="flex items-center">
                  <span className="text-blue-500 mr-2">✓</span>
                  Personalized training programs
                </li>
              </ul>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Our Facilities</h2>
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="https://source.unsplash.com/random/800x600?gym" 
                  alt="Gym interior"
                  className="rounded-lg h-48 object-cover"
                />
                <img 
                  src="https://source.unsplash.com/random/800x600?fitness-equipment" 
                  alt="Fitness equipment"
                  className="rounded-lg h-48 object-cover"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Membership Plans</h2>
              <div className="space-y-4">
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-xl font-semibold text-blue-400">Basic</h3>
                  <p className="text-gray-400">Perfect for starters</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-xl font-semibold text-blue-400">Pro</h3>
                  <p className="text-gray-400">For regular trainers</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-xl font-semibold text-blue-400">Premium</h3>
                  <p className="text-gray-400">VIP experience</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Visit Us</h2>
              <address className="not-italic">
                <p className="mb-2">123 Fitness Street</p>
                <p className="mb-2">Colombo 00500</p>
                <p className="mb-4">Sri Lanka</p>
                <a 
                  href="tel:+94112345678" 
                  className="text-blue-400 hover:text-blue-300"
                >
                  (+94) 112-345-678
                </a>
              </address>
            </div>
          </div>
        </main>

        <footer className="text-center border-t border-gray-800 pt-8">
          <p className="mb-4">Owner: Sandaru Divyantha</p>
          <Link 
            to="/login"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg
            hover:bg-blue-700 transition-colors duration-200"
          >
            Employee Login
          </Link>
        </footer>
      </div>
    </section>
  )
}

export default Public