import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  ShieldAlert,
  Brain,
  Scan,
  Activity,
  BarChart3,
  FileSpreadsheet,
  Settings,
  ChevronLeft,
  ChevronRight,
  Shield,
} from "lucide-react";

function Sidebar({ isCollapsed, toggleSidebar, isMobile = false, isDrawerOpen = false, closeDrawer }) {
  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Threat Center", path: "/alerts", icon: ShieldAlert },
    { name: "AI Detection", path: "/ai-detection", icon: Brain },
    { name: "File Scanner", path: "/file-scanner", icon: Scan },
    { name: "Live Monitoring", path: "/live-monitoring", icon: Activity },
    { name: "Analytics", path: "/analytics", icon: BarChart3 },
    { name: "Reports", path: "/reports", icon: FileSpreadsheet },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  const username = localStorage.getItem("username") || "operator";
  const fullName = localStorage.getItem("full_name") || "Gayathri";
  const role = localStorage.getItem("role") || "Administrator";

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const sidebarWidth = isMobile ? "280px" : (isCollapsed ? "80px" : "280px");
  const sidebarLeft = isMobile ? (isDrawerOpen ? "0px" : "-280px") : "0px";
  const sidebarPosition = isMobile ? "fixed" : "sticky";

  return (
    <aside
      style={{
        width: sidebarWidth,
        background: "rgba(3, 5, 15, 0.92)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderRight: "1px solid rgba(255, 255, 255, 0.08)",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        position: sidebarPosition,
        left: sidebarLeft,
        top: 0,
        zIndex: 999,
        transition: "width 0.3s cubic-bezier(0.16, 1, 0.3, 1), left 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {/* Brand Header */}
      <div
        style={{
          padding: "1.5rem",
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          justifyContent: (isCollapsed && !isMobile) ? "center" : "flex-start",
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
          height: "70px",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "36px",
            height: "36px",
            borderRadius: "10px",
            background: "linear-gradient(135deg, #00E5FF 0%, #7C3AED 100%)",
            boxShadow: "0 0 15px rgba(0, 229, 255, 0.4)",
            color: "white",
            flexShrink: 0,
          }}
        >
          <Shield size={20} />
        </div>
        {(!isCollapsed || isMobile) && (
          <span
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: "1.25rem",
              fontWeight: "900",
              background: "linear-gradient(to right, #00E5FF, #7C3AED)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "0.08em",
            }}
          >
            NEXORA
          </span>
        )}

        {/* Collapse Toggle Trigger button (Desktop/Tablet only) */}
        {!isMobile && (
          <button
            onClick={toggleSidebar}
            style={{
              position: "absolute",
              right: "-14px",
              top: "22px",
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              background: "#080c20",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              color: "#00E5FF",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
              zIndex: 10,
            }}
          >
            {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        )}
      </div>

      {/* Navigation Links list */}
      <nav
        style={{
          flex: 1,
          padding: "1rem 0.75rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.375rem",
          overflowY: "auto",
        }}
      >
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            style={{ textDecoration: "none" }}
            onClick={() => {
              if (isMobile && closeDrawer) {
                closeDrawer();
              }
            }}
          >
            {({ isActive }) => {
              const Icon = item.icon;
              return (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    padding: "0.875rem 1rem",
                    borderRadius: "12px",
                    color: isActive ? "#00E5FF" : "#94A3B8",
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: "0.8125rem",
                    fontWeight: "600",
                    letterSpacing: "0.03em",
                    position: "relative",
                    cursor: "pointer",
                    transition: "color 0.2s ease-in-out",
                  }}
                  className="nav-link-item"
                >
                  {/* Sliding active glow indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavBg"
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "rgba(0, 229, 255, 0.06)",
                        border: "1px solid rgba(0, 229, 255, 0.15)",
                        boxShadow: "0 0 15px rgba(0, 229, 255, 0.05)",
                        borderRadius: "12px",
                        zIndex: 0,
                      }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}

                  <div style={{ display: "flex", position: "relative", zIndex: 1 }}>
                    <Icon size={18} style={{ strokeWidth: 2 }} />
                  </div>

                  {(!isCollapsed || isMobile) && (
                    <span style={{ position: "relative", zIndex: 1 }}>{item.name}</span>
                  )}
                </div>
              );
            }}
          </NavLink>
        ))}
      </nav>

      {/* User Session Footer Section */}
      <div
        style={{
          padding: "1rem 0.75rem",
          borderTop: "1px solid rgba(255, 255, 255, 0.05)",
          background: "rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            justifyContent: (isCollapsed && !isMobile) ? "center" : "flex-start",
            padding: "0.5rem",
            borderRadius: "12px",
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.03)",
          }}
        >
          {/* Avatar circle */}
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              background: "rgba(124, 58, 237, 0.15)",
              border: "1px solid rgba(124, 58, 237, 0.3)",
              color: "#D8B4FE",
              fontSize: "0.85rem",
              fontWeight: "700",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'Orbitron', sans-serif",
              flexShrink: 0,
            }}
          >
            {getInitials(fullName)}
          </div>

          {!isCollapsed && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.125rem",
                overflow: "hidden",
                width: "100%",
              }}
            >
              <span
                style={{
                  fontSize: "0.8125rem",
                  fontWeight: "700",
                  color: "#F8FAFC",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                {fullName}
              </span>
              <span
                style={{
                  fontSize: "0.6875rem",
                  color: "#00E5FF",
                  fontWeight: "600",
                  fontFamily: "'Orbitron', sans-serif",
                  letterSpacing: "0.03em",
                }}
              >
                {role}
              </span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
