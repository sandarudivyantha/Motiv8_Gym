// src/App.jsx
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Public from './components/Public'
import Login from './features/auth/Login'
import DashLayout from './components/DashLayout'
import Welcome from './features/auth/Welcome'
import UsersList from './features/users/UsersList'
import PaymentsList from './features/payments/PaymentsList'
import NewUserForm from './features/users/NewUserForm'
import EditUserForm from './features/users/EditUserForm'
import NewAdmissionForm from './features/payments/NewAdmissionForm'
import NewMonthlyForm from './features/payments/NewMonthlyForm'
import EditPaymentForm from './features/payments/EditPaymentForm'
import Prefetch from './features/auth/Prefetch'
import PersistLogin from './features/auth/PersistLogin'
import RequireAuth from './features/auth/RequireAuth'
import { ROLES } from './config/roles'
import useTitle from './hooks/useTitle'

function App() {
  useTitle('Motiv8 Gym Management')

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
            <Route element={<Prefetch />}>
              <Route path="dash" element={<DashLayout />}>
                <Route index element={<Welcome />} />

                {/* Users Routes */}
                <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Trainer]} />}>
                  <Route path="users">
                    <Route index element={<UsersList />} />
                    <Route path=":id" element={<EditUserForm />} />
                    <Route path="new" element={<NewUserForm />} />
                  </Route>
                </Route>

                {/* Payments Routes */}
                <Route path="payments">
                  <Route index element={<PaymentsList />} />
                  <Route path=":id" element={<EditPaymentForm />} />
                  <Route path="new/admission" element={<NewAdmissionForm />} />
                  <Route path="new/monthly" element={<NewMonthlyForm />} />
                </Route>

              </Route>{/* End Dash */}
            </Route>
          </Route>
        </Route>{/* End Protected Routes */}

      </Route>
    </Routes>
  )
}

export default App