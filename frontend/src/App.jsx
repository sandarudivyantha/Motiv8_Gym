import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/Public";
import Login from "./features/auth/Login";
import Prefetch from "./features/auth/Prefetch";
import PersistLogin from "./features/auth/PersistLogin";
import RequireAuth from "./features/auth/RequireAuth";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />

        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route element={<Prefetch />}>
              {/* Protected routes here */}
              <Route path="dash" element={<DashLayout />}>
                <Route index element={<Welcome />} />
                {/* Other dashboard routes */}
              </Route>
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}
export default App;
