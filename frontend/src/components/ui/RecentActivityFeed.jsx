import Card from "./Card";
import Badge from "./Badge";
import { Terminal, Shield, FileText, Database, Settings } from "lucide-react";

function RecentActivityFeed() {
  const activities = [
    {
      id: 1,
      title: "FastAPI Connection Ping",
      description: "Gateway heartbeat returned 200 OK. SQLite logs flushed.",
      time: "2m ago",
      icon: Database,
      variant: "success",
    },
    {
      id: 2,
      title: "Heuristics Database Update",
      description: "Pulled latest signatures index containing 4,204 threat vectors.",
      time: "10m ago",
      icon: Shield,
      variant: "primary",
    },
    {
      id: 3,
      title: "PDF Audit Report Prepared",
      description: "Telemetry summary compiled. Awaiting download check.",
      time: "45m ago",
      icon: FileText,
      variant: "info",
    },
    {
      id: 4,
      title: "Policy Revision Synced",
      description: "Applied sandboxing rules to directories under watch.",
      time: "1h ago",
      icon: Settings,
      variant: "secondary",
    },
  ];

  return (
    <Card
      glow="secondary"
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
          <Terminal size={16} style={{ color: "#7C3AED" }} />
          <h3
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: "0.9rem",
              color: "#F8FAFC",
              letterSpacing: "0.05em",
            }}
          >
            RECENT ACTIVITY FEED
          </h3>
        </div>
        <span style={{ fontSize: "0.7rem", color: "#64748B", fontFamily: "monospace" }}>
          ADMIN STATUS
        </span>
      </div>

      {/* Activity List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", flex: 1, overflowY: "auto", maxHeight: "300px" }}>
        {activities.map((act) => {
          const Icon = act.icon;
          return (
            <div
              key={act.id}
              style={{
                display: "flex",
                gap: "0.875rem",
                alignItems: "flex-start",
                padding: "0.5rem",
                borderRadius: "12px",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.02)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              {/* Icon Container */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  color: act.variant === "success" ? "#22C55E" : act.variant === "primary" ? "#00E5FF" : act.variant === "secondary" ? "#7C3AED" : "#94A3B8",
                  flexShrink: 0,
                }}
              >
                <Icon size={14} />
              </div>

              {/* Text */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.125rem", flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span style={{ fontSize: "0.8rem", fontWeight: "700", color: "#F8FAFC" }}>{act.title}</span>
                  <span style={{ fontSize: "0.65rem", color: "#64748B", fontFamily: "monospace" }}>{act.time}</span>
                </div>
                <span style={{ fontSize: "0.75rem", color: "#94A3B8", lineHeight: "1.4" }}>{act.description}</span>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

export default RecentActivityFeed;
