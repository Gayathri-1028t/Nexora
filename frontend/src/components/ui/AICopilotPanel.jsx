import { useState } from "react";
import Card from "./Card";
import Badge from "./Badge";
import Button from "./Button";
import { Brain, CheckCircle, ShieldAlert, Zap, ShieldCheck } from "lucide-react";

function AICopilotPanel() {
  const [recommendations, setRecommendations] = useState([
    {
      id: 1,
      title: "Isolate Endpoint US-West-01",
      description: "Heuristic anomaly detected. Rapid outbound port scanning activity originating from local interface.",
      severity: "High",
      status: "AWAITING_ACTION", // AWAITING_ACTION, MITIGATING, RESOLVED
      actionLabel: "Isolate Device",
    },
    {
      id: 2,
      title: "Kill Suspicious PID (4819)",
      description: "Running process matches hash signature associated with credential dumping binaries.",
      severity: "Critical",
      status: "AWAITING_ACTION",
      actionLabel: "Terminate Process",
    },
    {
      id: 3,
      title: "Update Kernel Audit Policies",
      description: "Logs registry shows incomplete logs configuration on network gateway nodes.",
      severity: "Low",
      status: "AWAITING_ACTION",
      actionLabel: "Apply Policy",
    },
  ]);

  const handleMitigate = (id) => {
    // Transition state to show the interface is alive
    setRecommendations((prev) =>
      prev.map((rec) => {
        if (rec.id === id) {
          return { ...rec, status: "MITIGATING" };
        }
        return rec;
      })
    );

    setTimeout(() => {
      setRecommendations((prev) =>
        prev.map((rec) => {
          if (rec.id === id) {
            return { ...rec, status: "RESOLVED" };
          }
          return rec;
        })
      );
    }, 1500);
  };

  return (
    <Card
      glow="secondary"
      hoverLift={false}
      style={{
        flex: "1 1 320px",
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
          <Brain size={18} style={{ color: "#7C3AED" }} />
          <h3
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: "0.9rem",
              color: "#F8FAFC",
              letterSpacing: "0.05em",
            }}
          >
            AI COPILOT REMEDIATIONS
          </h3>
        </div>
        <Badge variant="secondary" showPulse>
          COGNITIVE ACTIVE
        </Badge>
      </div>

      {/* AI Assistant Avatar Segment */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.875rem",
          background: "rgba(124, 58, 237, 0.05)",
          border: "1px solid rgba(124, 58, 237, 0.15)",
          borderRadius: "14px",
          padding: "0.875rem 1.25rem",
        }}
      >
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: "rgba(124, 58, 237, 0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#D8B4FE",
            boxShadow: "0 0 10px rgba(124, 58, 237, 0.3)",
          }}
        >
          <Brain size={18} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.125rem" }}>
          <span style={{ fontSize: "0.8rem", fontWeight: "700", color: "#F8FAFC" }}>Nexora Sentinel Assistant</span>
          <span style={{ fontSize: "0.7rem", color: "#94A3B8" }}>Heuristic rules: 4 operational suggestions pending</span>
        </div>
      </div>

      {/* Recommendations Checklist */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", flex: 1, overflowY: "auto" }}>
        {recommendations.map((rec) => (
          <div
            key={rec.id}
            style={{
              background: "rgba(0, 0, 0, 0.2)",
              border: `1px solid ${
                rec.status === "RESOLVED"
                  ? "rgba(34, 197, 94, 0.15)"
                  : rec.severity === "Critical"
                  ? "rgba(255, 77, 109, 0.15)"
                  : "rgba(255, 255, 255, 0.04)"
              }`,
              borderRadius: "14px",
              padding: "0.875rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              transition: "all 0.3s ease",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "0.85rem", fontWeight: "700", color: "#F8FAFC" }}>{rec.title}</span>
              <Badge
                variant={
                  rec.status === "RESOLVED"
                    ? "success"
                    : rec.severity === "Critical"
                    ? "danger"
                    : rec.severity === "High"
                    ? "danger"
                    : "info"
                }
              >
                {rec.status === "RESOLVED" ? "RESOLVED" : rec.severity}
              </Badge>
            </div>
            
            <p style={{ fontSize: "0.75rem", color: "#94A3B8", lineHeight: "1.4" }}>{rec.description}</p>
            
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "0.25rem" }}>
              {rec.status === "AWAITING_ACTION" ? (
                <Button variant="primary" size="sm" onClick={() => handleMitigate(rec.id)}>
                  {rec.actionLabel}
                </Button>
              ) : rec.status === "MITIGATING" ? (
                <Button variant="secondary" size="sm" disabled loading>
                  Mitigating...
                </Button>
              ) : (
                <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", color: "#22C55E", fontSize: "0.75rem", fontWeight: "700" }}>
                  <ShieldCheck size={14} />
                  <span>Mitigation Complete</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default AICopilotPanel;
