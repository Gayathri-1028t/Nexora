import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>🛡 Nexora</h2>

      <ul>
        <li>
          <NavLink
            to="/dashboard"
            style={({ isActive }) => ({
              color: isActive ? "#38bdf8" : "white",
              textDecoration: "none",
              fontWeight: isActive ? "bold" : "normal",
            })}
          >
            🏠 Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/alerts"
            style={({ isActive }) => ({
              color: isActive ? "#38bdf8" : "white",
              textDecoration: "none",
              fontWeight: isActive ? "bold" : "normal",
            })}
          >
            🚨 Alerts
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/analytics"
            style={({ isActive }) => ({
              color: isActive ? "#38bdf8" : "white",
              textDecoration: "none",
              fontWeight: isActive ? "bold" : "normal",
            })}
          >
            📊 Analytics
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/reports"
            style={({ isActive }) => ({
              color: isActive ? "#38bdf8" : "white",
              textDecoration: "none",
              fontWeight: isActive ? "bold" : "normal",
            })}
          >
            📄 Reports
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/settings"
            style={({ isActive }) => ({
              color: isActive ? "#38bdf8" : "white",
              textDecoration: "none",
              fontWeight: isActive ? "bold" : "normal",
            })}
          >
            ⚙ Settings
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
