// src/features/users/UsersList.jsx
import { useGetUsersQuery } from './usersApiSlice'
import User from './User'
import PulseLoader from 'react-spinners/PulseLoader'
import useTitle from '../../hooks/useTitle'

const UsersList = () => {
  useTitle('Gym Management - Users')
  
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetUsersQuery(undefined, {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  })

  let content

  if (isLoading) content = <PulseLoader color="#3B82F6" className="mt-8"/>

  if (isError) {
    content = <div className="p-4 text-red-600 bg-red-100 rounded-lg">
      {error?.data?.message || 'Failed to load users'}
    </div>
  }

  if (isSuccess) {
    const { ids } = users
    const tableContent = ids?.length && ids.map(userId => <User key={userId} userId={userId} />)

    content = (
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Username</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Roles</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Edit</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tableContent}
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
        <a 
          href="/dash/users/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add New User
        </a>
      </div>
      {content}
    </div>
  )
}

export default UsersList