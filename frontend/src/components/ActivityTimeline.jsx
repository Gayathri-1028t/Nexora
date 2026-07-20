import Card from "./ui/Card";
import Badge from "./ui/Badge";
import { Clock, Terminal, ShieldAlert } from "lucide-react";

function ActivityTimeline({ alerts }) {
  const getBadgeVariant = (threat) => {
    switch (threat) {
      case "High":
        return "danger";
      case "Medium":
        return "warning";
      case "Low":
        return "success";
      default:
        return "info";
    }
  };

  return (
    <Card
      glow="primary"
      hoverLift={false}
      style={{
        marginTop: "2rem",
        padding: "1.5rem",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
          paddingBottom: "0.875rem",
          marginBottom: "1.5rem",
        }}
      >
        <Clock size={18} style={{ color: "#00E5FF" }} />
        <h2
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: "1rem",
            fontWeight: "700",
            color: "#F8FAFC",
            letterSpacing: "0.03em",
          }}
        >
          Recent Activity Timeline
        </h2>
      </div>

      {alerts.length === 0 ? (
        <div style={{ textAlign: "center", padding: "2rem", color: "#64748B", fontSize: "0.875rem" }}>
          <Terminal size={24} style={{ display: "block", margin: "0 auto 0.5rem", opacity: 0.5 }} />
          No recent activity logged in kernel.
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
            paddingLeft: "1.5rem",
          }}
        >
          {/* Vertical connecting line */}
          <div
            style={{
              position: "absolute",
              left: "4px",
              top: "8px",
              bottom: "8px",
              width: "2px",
              background: "linear-gradient(to bottom, rgba(0, 229, 255, 0.4), rgba(124, 58, 237, 0.1))",
            }}
          />

          {alerts
            .slice()
            .reverse()
            .slice(0, 5)
            .map((alert, index) => (
              <div
                key={index}
                style={{
                  position: "relative",
                  marginBottom: index === 4 ? "0" : "1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.375rem",
                }}
              >
                {/* Glowing bullet node */}
                <div
                  style={{
                    position: "absolute",
                    left: "-25px",
                    top: "4px",
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    backgroundColor: alert.threat === "High" ? "#FF4D6D" : alert.threat === "Medium" ? "#FACC15" : "#22C55E",
                    boxShadow: `0 0 10px ${alert.threat === "High" ? "#FF4D6D" : alert.threat === "Medium" ? "#FACC15" : "#22C55E"}`,
                    border: "2px solid #050816",
                  }}
                />

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "0.5rem",
                  }}
                >
                  <h4 style={{ fontSize: "0.875rem", fontWeight: "700", color: "#F8FAFC" }}>
                    {alert.file}
                  </h4>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <span
                      style={{
                        fontFamily: "'Orbitron', sans-serif",
                        fontSize: "0.7rem",
                        color: "#64748B",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.25rem",
                      }}
                    >
                      <Clock size={10} />
                      {alert.time}
                    </span>
                    <Badge variant={getBadgeVariant(alert.threat)}>
                      {alert.threat}
                    </Badge>
                  </div>
                </div>

                <p style={{ color: "#94A3B8", fontSize: "0.8125rem", display: "flex", alignItems: "center", gap: "0.375rem" }}>
                  <Terminal size={12} style={{ color: "#7C3AED" }} />
                  <span>Action: <strong>{alert.status}</strong></span>
                </p>
              </div>
            ))}
        </div>
      )}
    </Card>
  );
}

export default ActivityTimeline;
