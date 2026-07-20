import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Flame, Cpu, Radio, ShieldAlert } from "lucide-react";
import Card from "./Card";
import Badge from "./Badge";

function DashboardHero({ alertsCount = 0 }) {
  const [securityScore, setSecurityScore] = useState(0);
  const fullName = localStorage.getItem("full_name") || "Security Operator";
  const role = localStorage.getItem("role") || "Administrator";

  useEffect(() => {
    // Animate security score counter up on mount
    const target = 92;
    const duration = 1200; // ms
    const stepTime = Math.abs(Math.floor(duration / target));
    let current = 0;
    
    const timer = setInterval(() => {
      current += 1;
      setSecurityScore(current);
      if (current >= target) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <Card
      glow="primary"
      hoverLift={false}
      style={{
        padding: "2rem",
        marginBottom: "2rem",
        background: "linear-gradient(135deg, rgba(8, 12, 32, 0.7) 0%, rgba(15, 23, 42, 0.4) 100%)",
        border: "1px solid rgba(0, 229, 255, 0.15)",
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.5), 0 0 30px rgba(0, 229, 255, 0.05)",
      }}
    >
      {/* Glow highlight inside */}
      <div
        style={{
          position: "absolute",
          top: "-50px",
          right: "-50px",
          width: "250px",
          height: "250px",
          background: "radial-gradient(circle, rgba(0, 229, 255, 0.08) 0%, rgba(0, 0, 0, 0) 70%)",
          borderRadius: "50%",
          filter: "blur(30px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-50px",
          left: "-50px",
          width: "200px",
          height: "200px",
          background: "radial-gradient(circle, rgba(124, 58, 237, 0.08) 0%, rgba(0, 0, 0, 0) 70%)",
          borderRadius: "50%",
          filter: "blur(30px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "2rem",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Welcome Section */}
        <div style={{ flex: "1 1 350px", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <Badge variant="primary" showPulse>
              SYSTEM SECURE
            </Badge>
            <span style={{ fontSize: "0.75rem", color: "#64748B", fontFamily: "'Orbitron', sans-serif" }}>
              NODES: ACTIVE
            </span>
          </div>

          <h1
            style={{
              fontSize: "1.8rem",
              fontWeight: "800",
              color: "#F8FAFC",
              background: "linear-gradient(to right, #F8FAFC, #00E5FF)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginTop: "0.25rem",
            }}
          >
            Welcome, Operator {fullName.split(" ")[0]}
          </h1>
          <p style={{ color: "#94A3B8", fontSize: "0.9rem", lineHeight: "1.5", maxWidth: "450px" }}>
            Nexora AI Engine is active. Live packet filtering, file integrity checks, and system metrics are running with zero anomalies detected.
          </p>

          <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem", flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#E2E8F0", fontSize: "0.8rem" }}>
              <Cpu size={14} style={{ color: "#00E5FF" }} />
              <span>Role: <strong style={{ color: "#00E5FF" }}>{role}</strong></span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#E2E8F0", fontSize: "0.8rem" }}>
              <Radio size={14} style={{ color: "#7C3AED" }} />
              <span>Sensor Bandwidth: <strong style={{ color: "#7C3AED" }}>1.4 Gb/s</strong></span>
            </div>
          </div>
        </div>

        {/* Counters & Score Systems */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1.5rem",
            alignItems: "center",
            justifyContent: "flex-end",
            flex: "1 1 450px",
          }}
        >
          {/* Security Score Widget */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.25rem",
              background: "rgba(0, 0, 0, 0.25)",
              border: "1px solid rgba(255, 255, 255, 0.05)",
              borderRadius: "20px",
              padding: "1rem 1.5rem",
              minWidth: "220px",
            }}
          >
            {/* Radial gauge mock */}
            <div style={{ position: "relative", width: "65px", height: "65px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="65" height="65" viewBox="0 0 36 36">
                <path
                  stroke="rgba(255, 255, 255, 0.05)"
                  strokeWidth="2.5"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <motion.path
                  stroke="url(#cyanPurpleGrad)"
                  strokeWidth="2.5"
                  strokeDasharray={`${securityScore}, 100`}
                  strokeLinecap="round"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                />
                <defs>
                  <linearGradient id="cyanPurpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00E5FF" />
                    <stop offset="100%" stopColor="#7C3AED" />
                  </linearGradient>
                </defs>
              </svg>
              <div
                style={{
                  position: "absolute",
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: "0.95rem",
                  fontWeight: "800",
                  color: "#00E5FF",
                  textShadow: "0 0 8px rgba(0, 229, 255, 0.4)",
                }}
              >
                {securityScore}
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "0.75rem", color: "#64748B", fontFamily: "'Orbitron', sans-serif" }}>
                SECURITY HEALTH
              </span>
              <span style={{ fontSize: "1.1rem", fontWeight: "700", color: "#F8FAFC", marginTop: "0.125rem" }}>
                OPTIMIZED
              </span>
              <span style={{ fontSize: "0.7rem", color: "#22C55E", display: "flex", alignItems: "center", gap: "0.25rem", marginTop: "0.125rem" }}>
                <ShieldCheck size={10} /> +1.2% this week
              </span>
            </div>
          </div>

          {/* Quick Metrics */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", minWidth: "180px" }}>
            {/* Active Threats Counter */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                background: "rgba(255, 77, 109, 0.05)",
                border: "1px solid rgba(255, 77, 109, 0.15)",
                borderRadius: "14px",
                padding: "0.5rem 1rem",
              }}
            >
              <Flame size={16} style={{ color: "#FF4D6D" }} className="threat-pulse-high" />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "0.65rem", color: "#64748B", fontFamily: "'Orbitron', sans-serif" }}>
                  ACTIVE ALERTS
                </span>
                <span style={{ fontSize: "0.9rem", fontWeight: "700", color: "#FF4D6D" }}>
                  {alertsCount} Detections
                </span>
              </div>
            </div>

            {/* AI Core State */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                background: "rgba(0, 229, 255, 0.05)",
                border: "1px solid rgba(0, 229, 255, 0.15)",
                borderRadius: "14px",
                padding: "0.5rem 1rem",
              }}
            >
              <ShieldCheck size={16} style={{ color: "#00E5FF" }} />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "0.65rem", color: "#64748B", fontFamily: "'Orbitron', sans-serif" }}>
                  INTELLIGENT AGENT
                </span>
                <span style={{ fontSize: "0.9rem", fontWeight: "700", color: "#00E5FF" }}>
                  Cognitive Shield V4.1
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mini Critical Alert Containment Strip if there are alerts */}
      {alertsCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{
            marginTop: "1.5rem",
            background: "rgba(255, 77, 109, 0.06)",
            border: "1px solid rgba(255, 77, 109, 0.2)",
            borderRadius: "12px",
            padding: "0.75rem 1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "0.75rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <ShieldAlert size={14} style={{ color: "#FF4D6D" }} />
            <span style={{ fontSize: "0.75rem", color: "#F8FAFC", fontFamily: "'Inter', sans-serif" }}>
              Warning: <strong>{alertsCount} active file Integrity anomalies</strong> pending validation sandbox review.
            </span>
          </div>
          <Badge variant="danger" showPulse>
            Sandbox Awaiting
          </Badge>
        </motion.div>
      )}
    </Card>
  );
}

export default DashboardHero;
