import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { store } from '../../app/store';
import { usersApiSlice } from '../users/usersApiSlice';
import { paymentsApiSlice } from '../payments/paymentsApiSlice';

const Prefetch = () => {
  useEffect(() => {
    store.dispatch(usersApiSlice.util.prefetch('getUsers', 'usersList', { force: true }));
    store.dispatch(paymentsApiSlice.util.prefetch('getPayments', 'paymentsList', { force: true }));
  }, []);

  return <Outlet />;
};

export default Prefetch;