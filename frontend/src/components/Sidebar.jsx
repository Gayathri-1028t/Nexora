import { NavLink } from "react-router-dom";

function Sidebar() {
  const linkStyle = ({ isActive }) => ({
    color: isActive ? "#38bdf8" : "white",
    textDecoration: "none",
    fontWeight: isActive ? "bold" : "normal",
    display: "block",
    width: "100%",
  });

  return (
    <div className="sidebar">
      <h2>🛡 Nexora</h2>

      <ul>
        <li>
          <NavLink to="/dashboard" style={linkStyle}>
            🏠 Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink to="/alerts" style={linkStyle}>
            🚨 Alerts
          </NavLink>
        </li>

        <li>
          <NavLink to="/analytics" style={linkStyle}>
            📊 Analytics
          </NavLink>
        </li>

        <li>
          <NavLink to="/reports" style={linkStyle}>
            📄 Reports
          </NavLink>
        </li>

        <li>
          <NavLink to="/settings" style={linkStyle}>
            ⚙ Settings
          </NavLink>
        </li>

        <li>
          <NavLink to="/profile" style={linkStyle}>
            👤 Profile
          </NavLink>
        </li>

        <li>
          <NavLink to="/change-password" style={linkStyle}>
            🔐 Change Password
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
