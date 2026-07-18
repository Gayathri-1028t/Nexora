import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import DashboardLayout from "./layouts/DashboardLayout";

function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return (
    <Routes>
      {/* Default Route */}
      <Route
        path="/"
        element={
          isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
        }
      />

      {/* Login Page */}
      <Route path="/login" element={<Login />} />

      {/* Protected Dashboard */}
      <Route
        path="/dashboard"
        element={isLoggedIn ? <DashboardLayout /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}

export default App;
