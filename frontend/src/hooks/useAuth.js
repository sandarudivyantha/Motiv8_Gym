// // src/hooks/useAuth.js
// import { useSelector } from 'react-redux'
// import { selectCurrentToken } from '../features/auth/authSlice'
// import { jwtDecode } from 'jwt-decode'

// const useAuth = () => {
//   const token = useSelector(selectCurrentToken)
  
//   if (token) {
//     const decoded = jwtDecode(token)
//     const { username, roles } = decoded.UserInfo

//     return {
//       username,
//       roles,
//       isAdmin: roles.includes('Admin'),
//       isTrainer: roles.includes('Trainer'),
//       isMember: roles.includes('Member')
//     }
//   }

//   return { username: '', roles: [], isAdmin: false, isTrainer: false, isMember: false }
// }

// export default useAuth

// src/hooks/useAuth.js
import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../features/auth/authSlice'
import { jwtDecode } from 'jwt-decode'

const useAuth = () => {
  const token = useSelector(selectCurrentToken)

  if (token) {
    const decoded = jwtDecode(token)
    const { username, roles } = decoded.UserInfo

    return {
      username,
      roles,
      isAdmin: roles.includes('Admin'),
      isTrainer: roles.includes('Trainer'),
      isMember: roles.includes('Member'),
      status: roles.find(role => ['Admin', 'Trainer', 'Member'].includes(role)) || 'Member'
    }
  }

  return { 
    username: '', 
    roles: [], 
    isAdmin: false, 
    isTrainer: false, 
    isMember: false,
    status: 'Guest'
  }
}

export default useAuth