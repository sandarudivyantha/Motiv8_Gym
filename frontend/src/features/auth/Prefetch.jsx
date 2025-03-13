// src/features/auth/Prefetch.jsx
import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { store } from '../../app/store'
import { usersApiSlice } from '../users/usersApiSlice'

const Prefetch = () => {
  useEffect(() => {
    store.dispatch(
      usersApiSlice.util.prefetch('getUsers', 'usersList', { force: true })
    )
  }, [])

  return <Outlet />
}

export default Prefetch