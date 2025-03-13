// src/features/users/EditUserForm.jsx
import { useState, useEffect } from 'react'
import { useUpdateUserMutation } from './usersApiSlice'
import { useNavigate } from 'react-router-dom'
import { ROLES } from '../../config/roles'

const EditUserForm = ({ user }) => {
  const [updateUser, { isLoading, isSuccess, isError, error }] = useUpdateUserMutation()
  const navigate = useNavigate()

  const [firstName, setFirstName] = useState(user.firstName)
  const [lastName, setLastName] = useState(user.lastName)
  const [email, setEmail] = useState(user.email)
  const [phoneNo, setPhoneNo] = useState(user.phoneNo)
  const [roles, setRoles] = useState(user.roles)
  const [active, setActive] = useState(user.active)
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (isSuccess) {
      setPassword('')
      navigate('/dash/users')
    }
  }, [isSuccess, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    await updateUser({
      id: user.id,
      firstName,
      lastName,
      email,
      phoneNo,
      roles,
      active,
      password: password || undefined
    })
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Edit User</h2>
      
      {isError && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
          {error.data?.message || 'Failed to update user'}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Similar form fields as NewUserForm */}
        {/* Add existing fields with current user data */}
        {/* Add password field (optional) */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? 'Updating...' : 'Update User'}
        </button>
      </form>
    </div>
  )
}

export default EditUserForm