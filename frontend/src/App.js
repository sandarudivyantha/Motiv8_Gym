import { Routes, Route } from "react-router-dom";

function App() {

  return (
    <Routes>
      {/* <Route path="/" element={<Layout />}> */}
      
      <Route path="/" element={<App />} />
    </Routes>
  );
}

export default App;