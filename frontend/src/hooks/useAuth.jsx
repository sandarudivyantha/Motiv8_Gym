// import { useSelector } from 'react-redux';
// import { jwtDecode } from 'jwt-decode';

// const useAuth = () => {
//   const token = useSelector(state => state.auth.token);
  
//   if (token) {
//     const decoded = jwtDecode(token);
//     const { username, roles } = decoded.UserInfo;

//     return {
//       username,
//       roles,
//       isAdmin: roles.includes('Admin'),
//       isTrainer: roles.includes('Trainer'),
//       isMember: roles.includes('Member'),
//       status: roles.includes('Admin') ? 'Admin' : roles.includes('Trainer') ? 'Trainer' : 'Member'
//     };
//   }

//   return { username: '', roles: [], isAdmin: false, isTrainer: false, isMember: false, status: '' };
// };

// export default useAuth;


import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, logOut } from '../features/auth/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) headers.set('authorization', `Bearer ${token}`);
    return headers;
  }
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 403) {
    const refreshResult = await baseQuery('/auth/refresh', api, extraOptions);
    
    if (refreshResult?.data) {
      api.dispatch(setCredentials({ ...refreshResult.data }));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User', 'Payment'],
  endpoints: builder => ({})
});