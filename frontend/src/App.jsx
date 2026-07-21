import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Alerts from "./pages/Alerts";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import { DashboardSkeleton } from "./components/ui/Skeletons";

// Heavy secondary pages - Lazy Loaded
const Analytics = lazy(() => import("./pages/Analytics"));
const Reports = lazy(() => import("./pages/Reports"));
const AIDetection = lazy(() => import("./pages/AIDetection"));
const FileScanner = lazy(() => import("./pages/FileScanner"));
const LiveMonitoring = lazy(() => import("./pages/LiveMonitoring"));

function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <Routes>
        {/* Default Route */}
        <Route
          path="/"
          element={
            isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
          }
        />

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Protected Layout */}
        <Route
          element={isLoggedIn ? <DashboardLayout /> : <Navigate to="/login" />}
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/change-password" element={<ChangePassword />} />
          
          {/* Expanded Navigation Routes */}
          <Route path="/ai-detection" element={<AIDetection />} />
          <Route path="/file-scanner" element={<FileScanner />} />
          <Route path="/live-monitoring" element={<LiveMonitoring />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
