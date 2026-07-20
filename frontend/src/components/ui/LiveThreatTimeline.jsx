import Card from "./Card";
import Badge from "./Badge";
import { Clock, Terminal, ChevronRight } from "lucide-react";

function LiveThreatTimeline({ alerts = [] }) {
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
        flex: "1 1 340px",
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem",
        minHeight: "380px",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
          paddingBottom: "0.875rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Clock size={16} style={{ color: "#00E5FF" }} />
          <h3
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: "0.9rem",
              color: "#F8FAFC",
              letterSpacing: "0.05em",
            }}
          >
            LIVE THREAT TIMELINE
          </h3>
        </div>
        <span style={{ fontSize: "0.7rem", color: "#64748B", fontFamily: "monospace" }}>
          LIVE FEED
        </span>
      </div>

      {/* Timeline items list */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          position: "relative",
          paddingLeft: "1.25rem",
          gap: "1.25rem",
          flex: 1,
          overflowY: "auto",
          maxHeight: "300px",
        }}
      >
        {/* Vertical line indicator */}
        <div
          style={{
            position: "absolute",
            left: "4px",
            top: "6px",
            bottom: "6px",
            width: "2px",
            background: "linear-gradient(to bottom, rgba(0, 229, 255, 0.3), rgba(124, 58, 237, 0.1))",
          }}
        />

        {alerts.length === 0 ? (
          <div style={{ textAlign: "center", padding: "2rem", color: "#64748B", fontSize: "0.8rem", fontFamily: "monospace" }}>
            No kernel alarms logged.
          </div>
        ) : (
          alerts
            .slice()
            .reverse()
            .slice(0, 8)
            .map((item, idx) => (
              <div
                key={item.id || idx}
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.25rem",
                }}
              >
                {/* Glowing status bullet */}
                <div
                  style={{
                    position: "absolute",
                    left: "-23px",
                    top: "4px",
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: item.threat === "High" ? "#FF4D6D" : item.threat === "Medium" ? "#FACC15" : "#22C55E",
                    boxShadow: `0 0 8px ${item.threat === "High" ? "#FF4D6D" : item.threat === "Medium" ? "#FACC15" : "#22C55E"}`,
                    border: "2px solid #050816",
                  }}
                />

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.5rem" }}>
                  <span
                    style={{
                      fontSize: "0.8rem",
                      fontWeight: "700",
                      color: "#F8FAFC",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      maxWidth: "200px",
                    }}
                  >
                    {item.file}
                  </span>
                  <Badge variant={getBadgeVariant(item.threat)}>
                    {item.threat}
                  </Badge>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "0.7rem",
                    color: "#94A3B8",
                  }}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                    <Terminal size={10} style={{ color: "#7C3AED" }} />
                    Action: {item.status}
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: "0.25rem", fontFamily: "monospace" }}>
                    <Clock size={10} />
                    {item.time}
                  </span>
                </div>
              </div>
            ))
        )}
      </div>
    </Card>
  );
}

export default LiveThreatTimeline;
