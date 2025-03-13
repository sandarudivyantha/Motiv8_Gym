// src/features/auth/PersistLogin.jsx
import { Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useRefreshMutation } from './authApiSlice'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from './authSlice'
import PulseLoader from 'react-spinners/PulseLoader'

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true)
  const token = useSelector(selectCurrentToken)
  const [refresh] = useRefreshMutation()

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh()
      } catch (err) {
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    !token ? verifyRefreshToken() : setIsLoading(false)
  }, [])

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <PulseLoader color="#3B82F6" />
        </div>
      ) : (
        <Outlet />
      )}
    </>
  )
}

export default PersistLogin