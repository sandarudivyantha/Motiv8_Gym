import { Routes, Route } from "react-router-dom";
import DashboardHeader from "./components/Public/DashboardHeader";
import DashboardFooter from "./components/Public/DashboardFooter";
import DashoardPage from "./components/Public/DashoardPage";

function App() {

  return (
    <Routes>
      {/* public routes */}
      <Route path="/" element={<DashoardPage />}></Route>

    </Routes>
  );
}

export default App;
