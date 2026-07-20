import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import CyberWorldBackground from "../components/ui/CyberWorldBackground";

function DashboardLayout() {
  const [isCollapsed, setIsCollapsed] = useState(
    localStorage.getItem("sidebarCollapsed") === "true"
  );

  const toggleSidebar = () => {
    setIsCollapsed((prev) => {
      localStorage.setItem("sidebarCollapsed", !prev);
      return !prev;
    });
  };

  // Close sidebar on smaller screens initially
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsCollapsed(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#050816",
        color: "#F8FAFC",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      {/* Dynamic Animated Cyber Background */}
      <CyberWorldBackground />

      {/* Floating Lights Blur System */}
      <div className="floating-lights">
        <div className="light-bulb-1" />
        <div className="light-bulb-2" />
      </div>

      {/* Collapsible Sidebar */}
      <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />

      {/* Main Panel Content Container */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          marginLeft: 0,
          transition: "padding-left 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Navbar toggleSidebar={toggleSidebar} isCollapsed={isCollapsed} />

        <main
          style={{
            flex: 1,
            padding: "2rem",
            position: "relative",
            overflowY: "auto",
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
