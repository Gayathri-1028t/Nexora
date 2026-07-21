import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { Bell, Search, Sun, Moon, LogOut, Radio, Clock, ShieldCheck, Menu } from "lucide-react";
import Badge from "./ui/Badge";

function Navbar({ toggleSidebar, isCollapsed, isMobile = false, isDrawerOpen = false }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useContext(ThemeContext);

  const [time, setTime] = useState(new Date());
  const [showNotifications, setShowNotifications] = useState(false);

  // Live Clock Update
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  // Format Time: e.g., "13:12:45"
  const formattedTime = time.toLocaleTimeString([], { hour12: false });
  // Format Date: e.g., "20 Jul 2026"
  const formattedDate = time.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  // Calculate Breadcrumbs
  const getBreadcrumbs = () => {
    const path = location.pathname.substring(1);
    if (!path) return "HOME";
    return path
      .split("-")
      .map((word) => word.toUpperCase())
      .join(" ");
  };

  const mockNotifications = [
    { id: 1, title: "Zero-Day Containment Active", time: "5m ago", type: "danger" },
    { id: 2, title: "Database Backup Completed", time: "1h ago", type: "success" },
    { id: 3, title: "Anomaly detected in /usr/bin", time: "2h ago", type: "warning" },
  ];

  return (
    <header
      style={{
        height: "70px",
        background: "rgba(8, 12, 32, 0.5)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: isMobile ? "0 1rem" : "0 2rem",
        position: "sticky",
        top: 0,
        zIndex: 900,
        transition: "padding 0.3s ease",
      }}
    >
      {/* Breadcrumb section with menu toggle for mobile */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        {isMobile && (
          <button
            onClick={toggleSidebar}
            style={{
              background: "transparent",
              border: "none",
              color: "#00E5FF",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0.25rem",
              marginRight: "0.25rem",
            }}
          >
            <Menu size={20} />
          </button>
        )}
        {!isMobile && (
          <span
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: "0.6875rem",
              color: "#64748B",
              fontWeight: "700",
              letterSpacing: "0.08em",
            }}
          >
            NEXORA
          </span>
        )}
        {!isMobile && <span style={{ color: "rgba(255,255,255,0.15)", fontSize: "0.85rem" }}>/</span>}
        <span
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: "0.8125rem",
            color: "#00E5FF",
            fontWeight: "700",
            letterSpacing: "0.08em",
            textShadow: "0 0 10px rgba(0, 229, 255, 0.2)",
          }}
        >
          {getBreadcrumbs()}
        </span>
      </div>

      {/* Center Search Console (Desktop only) */}
      {!isMobile && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            background: "rgba(0, 0, 0, 0.2)",
            border: "1px solid rgba(255, 255, 255, 0.05)",
            borderRadius: "10px",
            padding: "0.375rem 0.75rem",
            width: "280px",
            gap: "0.5rem",
            transition: "all 0.2s",
          }}
          className="nav-search-bar"
          onFocusCapture={(e) => {
            e.currentTarget.style.borderColor = "rgba(0,229,255,0.5)";
            e.currentTarget.style.boxShadow = "0 0 10px rgba(0,229,255,0.1)";
          }}
          onBlurCapture={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <Search size={14} style={{ color: "#64748B" }} />
          <input
            type="text"
            placeholder="Search IOCs, logs, nodes..."
            style={{
              background: "transparent",
              border: "none",
              outline: "none",
              color: "#F8FAFC",
              fontSize: "0.75rem",
              width: "100%",
              padding: 0,
            }}
          />
        </div>
      )}

      {/* Right Navbar Controls */}
      <div style={{ display: "flex", alignItems: "center", gap: isMobile ? "0.75rem" : "1.25rem" }}>
        {/* Dynamic AI Status Capsule (Desktop only) */}
        {!isMobile && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.375rem",
              background: "rgba(0, 229, 255, 0.05)",
              border: "1px solid rgba(0, 229, 255, 0.15)",
              borderRadius: "6px",
              padding: "0.25rem 0.5rem",
              fontSize: "0.6875rem",
              color: "#00E5FF",
              fontWeight: "700",
              fontFamily: "'Orbitron', sans-serif",
              letterSpacing: "0.03em",
            }}
          >
            <ShieldCheck size={12} />
            <span>AI SHIELD: ACTIVE</span>
          </div>
        )}

        {/* Live Clock Component (Desktop/Tablet only) */}
        {!isMobile && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "#94A3B8",
              fontSize: "0.75rem",
              fontFamily: "'Orbitron', sans-serif",
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.05)",
              borderRadius: "8px",
              padding: "0.375rem 0.75rem",
            }}
          >
            <Clock size={12} style={{ color: "#00E5FF" }} />
            <span>{formattedTime}</span>
            <span style={{ color: "rgba(255,255,255,0.15)" }}>|</span>
            <span style={{ fontSize: "0.7rem", color: "#64748B" }}>{formattedDate}</span>
          </div>
        )}

        {/* System Online Status */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
          <Radio size={12} style={{ color: "#22C55E", animation: "navbarPulse 2s infinite" }} />
          {!isMobile && (
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: "700",
                color: "#22C55E",
                fontFamily: "'Orbitron', sans-serif",
              }}
            >
              ONLINE
            </span>
          )}
        </div>

        {/* Notifications Bell Dropdown */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "#94A3B8",
              position: "relative",
              display: "flex",
              alignItems: "center",
              padding: "0.25rem",
            }}
          >
            <Bell size={18} />
            <span
              style={{
                position: "absolute",
                top: "1px",
                right: "1px",
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#FF4D6D",
                boxShadow: "0 0 8px #FF4D6D",
              }}
            />
          </button>

          {/* Absolute glass alerts panel */}
          {showNotifications && (
            <div
              style={{
                position: "absolute",
                right: 0,
                top: "35px",
                width: "280px",
                background: "rgba(8, 12, 32, 0.9)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "16px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                padding: "0.75rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                zIndex: 100,
              }}
            >
              <div
                style={{
                  fontSize: "0.75rem",
                  fontWeight: "700",
                  fontFamily: "'Orbitron', sans-serif",
                  color: "#F8FAFC",
                  paddingBottom: "0.375rem",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>RECENT LOG ACTIONS</span>
                <span style={{ color: "#00E5FF" }}>3 items</span>
              </div>
              {mockNotifications.map((notif) => (
                <div
                  key={notif.id}
                  style={{
                    padding: "0.5rem",
                    borderRadius: "8px",
                    background: "rgba(255,255,255,0.02)",
                    fontSize: "0.75rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.125rem",
                  }}
                >
                  <span
                    style={{
                      color: notif.type === "danger" ? "#FF4D6D" : notif.type === "warning" ? "#FACC15" : "#E2E8F0",
                      fontWeight: "600",
                    }}
                  >
                    {notif.title}
                  </span>
                  <span style={{ fontSize: "0.65rem", color: "#64748B" }}>{notif.time}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          style={{
            background: "rgba(255, 255, 255, 0.03)",
            border: "1px solid rgba(255, 255, 255, 0.05)",
            borderRadius: "8px",
            width: "32px",
            height: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#00E5FF",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
        >
          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {/* Logout Control Button */}
        <button
          onClick={logout}
          style={{
            background: "rgba(255, 77, 109, 0.08)",
            border: "1px solid rgba(255, 77, 109, 0.25)",
            borderRadius: "8px",
            width: "32px",
            height: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#FF4D6D",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
          title="Sign Out"
        >
          <LogOut size={16} />
        </button>
      </div>

      <style>{`
        @keyframes navbarPulse {
          0% { opacity: 0.6; }
          50% { opacity: 1; }
          100% { opacity: 0.6; }
        }
      `}</style>
    </header>
  );
}

export default Navbar;
