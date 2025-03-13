// src/components/DashLayout.jsx
import DashHeader from './DashHeader'
import DashFooter from './DashFooter'
import { Outlet } from 'react-router-dom'

const DashLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <DashHeader />
      <div className="flex-1 p-4 bg-gray-50">
        <Outlet />
      </div>
      <DashFooter />
    </div>
  )
}

export default DashLayout