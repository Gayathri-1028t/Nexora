import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function DashboardLayout() {
  return (
    <div className="layout">
      <Sidebar />

      <div className="main">
        <Navbar />

        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout;
