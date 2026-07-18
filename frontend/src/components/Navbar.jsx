import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <div className="navbar">
      <h2>🛡 Nexora Security Center</h2>

      <div className="nav-right">
        <span>🔔 2 Alerts</span>

        <span style={{ color: "#4ade80" }}>🟢 Online</span>

        <span>👤 Gayathri</span>

        <button
          onClick={logout}
          style={{
            background: "#ef4444",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
