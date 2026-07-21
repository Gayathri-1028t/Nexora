import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import CyberWorldBackground from "../components/ui/CyberWorldBackground";

function DashboardLayout() {
  const [isCollapsed, setIsCollapsed] = useState(
    localStorage.getItem("sidebarCollapsed") === "true"
  );
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleSidebar = () => {
    if (isMobile) {
      setIsDrawerOpen((prev) => !prev);
    } else {
      setIsCollapsed((prev) => {
        localStorage.setItem("sidebarCollapsed", !prev);
        return !prev;
      });
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const mobileStatus = width < 768;
      setIsMobile(mobileStatus);

      if (width < 1024) {
        setIsCollapsed(true);
      } else {
        // Restore user preference on desktop
        setIsCollapsed(localStorage.getItem("sidebarCollapsed") === "true");
      }

      // Close drawer when screen goes above mobile width
      if (!mobileStatus) {
        setIsDrawerOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    // Initial check
    handleResize();

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

      {/* Backdrop for mobile drawer */}
      {isMobile && isDrawerOpen && (
        <div
          onClick={() => setIsDrawerOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(8px)",
            zIndex: 98,
            transition: "opacity 0.3s ease",
          }}
        />
      )}

      {/* Collapsible Sidebar / Mobile Drawer */}
      <Sidebar 
        isCollapsed={isCollapsed} 
        toggleSidebar={toggleSidebar} 
        isMobile={isMobile}
        isDrawerOpen={isDrawerOpen}
        closeDrawer={() => setIsDrawerOpen(false)}
      />

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
        <Navbar toggleSidebar={toggleSidebar} isCollapsed={isCollapsed} isMobile={isMobile} isDrawerOpen={isDrawerOpen} />

        <main
          style={{
            flex: 1,
            padding: isMobile ? "1rem" : "2rem",
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
