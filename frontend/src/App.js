import { Routes, Route } from "react-router-dom";
// import DashboardHeader from "./components/Public/DashboardHeader";
// import Layout from './components/Layout'
import Public from './components/public'
import Login from './features/auth/Login'
import DashLayout from './components/public/DashLayout'
import Welcome from './features/auth/Welcome'
import PaymentsList from './features/payments/PaymentsList'
import UsersList from './features/users/UsersList'
import NewUserForm from './features/users/NewUserForm'
import EditUser from './features/users/EditUser'
import Prefetch from './features/auth/Prefetch'
import PersistLogin from './features/auth/PersistLogin'
import RequireAuth from './features/auth/RequireAuth'
import { ROLES } from './config/roles'
import useTitle from './hooks/useTitle'

function App() {
  useTitle('Motiv8 Gym')

  return (
    <Routes>
      {/* <Route path="/" element={<Layout />}> */}
      <Route path="/" element={<DashLayout />}>
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />

        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
            <Route element={<Prefetch />}>
              <Route path="dash" element={<DashLayout />}>
                <Route index element={<Welcome />} />

                <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Trainer]} />}>
                  <Route path="users">
                    <Route index element={<UsersList />} />
                    <Route path=":id" element={<EditUser />} />
                    <Route path="new" element={<NewUserForm />} />
                  </Route>
                </Route>

                <Route path="payments">
                  <Route index element={<PaymentsList />} />
                  <Route path="new" element={<NewPayment />} />
                  <Route path=":id" element={<EditPayment />} />
                </Route>

              </Route>
            </Route>
          </Route>
        </Route>

      </Route>
    </Routes>
  );
}

export default App;