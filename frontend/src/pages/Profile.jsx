import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import { User, ShieldCheck, Mail, ShieldAlert } from "lucide-react";
import PageTransition from "../components/ui/PageTransition";

function Profile() {
  const fullName = localStorage.getItem("full_name") || "Security Operator";
  const role = localStorage.getItem("role") || "Administrator";
  const username = localStorage.getItem("username") || "operator";

  return (
    <PageTransition>
      <div style={{ position: "relative", zIndex: 1 }} className="container">
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "1.8rem", color: "#F8FAFC", marginBottom: "0.25rem" }}>
          User Profile
        </h1>
        <p style={{ color: "#94A3B8", fontSize: "0.9rem" }}>
          Active terminal session identity and security access profile.
        </p>
      </div>

      <div style={{ maxWidth: "600px" }}>
        <Card glow="primary">
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem", borderBottom: "1px solid rgba(255, 255, 255, 0.05)", paddingBottom: "1rem" }}>
            <div style={{
              width: "50px",
              height: "50px",
              borderRadius: "14px",
              background: "rgba(0, 229, 255, 0.08)",
              border: "1px solid rgba(0, 229, 255, 0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#00E5FF",
            }}>
              <User size={24} />
            </div>
            <div>
              <h2 style={{ fontSize: "1.2rem", color: "#F8FAFC", fontFamily: "'Orbitron', sans-serif" }}>
                {fullName}
              </h2>
              <span style={{ fontSize: "0.75rem", color: "#64748B", fontFamily: "monospace" }}>
                Node Identifier: {username}
              </span>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={profileFieldStyle}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <ShieldCheck size={16} style={{ color: "#00E5FF" }} />
                <span style={labelStyle}>AUTHORIZATION LEVEL</span>
              </div>
              <Badge variant="primary">{role.toUpperCase()}</Badge>
            </div>

            <div style={profileFieldStyle}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Mail size={16} style={{ color: "#7C3AED" }} />
                <span style={labelStyle}>TELEMETRY SINK EMAIL</span>
              </div>
              <span style={valueStyle}>admin@nexora.ai</span>
            </div>

            <div style={profileFieldStyle}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <ShieldAlert size={16} style={{ color: "#22C55E" }} />
                <span style={labelStyle}>ACCESS CHANNEL STATUS</span>
              </div>
              <span style={{ color: "#22C55E", fontWeight: "700", fontSize: "0.85rem", fontFamily: "'Orbitron', sans-serif" }}>
                ACTIVE / ONLINE
              </span>
            </div>
          </div>
        </Card>
      </div>
      </div>
    </PageTransition>
  );
}

const profileFieldStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  background: "rgba(0, 0, 0, 0.2)",
  border: "1px solid rgba(255, 255, 255, 0.04)",
  borderRadius: "12px",
  padding: "0.75rem 1rem",
};

const labelStyle = {
  fontSize: "0.7rem",
  color: "#94A3B8",
  fontWeight: "700",
  fontFamily: "'Orbitron', sans-serif",
  letterSpacing: "0.05em",
};

const valueStyle = {
  fontSize: "0.85rem",
  color: "#F8FAFC",
  fontWeight: "600",
  fontFamily: "monospace",
};

export default Profile;
