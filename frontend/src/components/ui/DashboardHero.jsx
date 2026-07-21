import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldAlert,
  ShieldCheck,
  Cpu,
  FileCheck,
  Server,
  Terminal,
  Activity,
  Zap,
} from "lucide-react";
import Card from "./Card";
import Badge from "./Badge";
import AnimatedCounter from "./AnimatedCounter";

function DashboardHero({ alertsCount = 0 }) {
  const fullName = localStorage.getItem("full_name") || "Security Operator";
  const role = localStorage.getItem("role") || "Administrator";
  const username = localStorage.getItem("username") || "operator";

  // Counters state
  const [securityScore, setSecurityScore] = useState(0);
  const [totalThreats, setTotalThreats] = useState(0);
  const [filesScanned, setFilesScanned] = useState(0);
  const [aiAccuracy, setAiAccuracy] = useState(0);
  const [devices, setDevices] = useState(0);
  const [sessions, setSessions] = useState(0);

  useEffect(() => {
    // Animating values on mount
    const animateValue = (setter, target, duration) => {
      let start = 0;
      const step = target / (duration / 16); // ~60fps
      const timer = setInterval(() => {
        start += step;
        if (start >= target) {
          setter(target);
          clearInterval(timer);
        } else {
          setter(Math.floor(start));
        }
      }, 16);
    };

    animateValue(setSecurityScore, 94, 1000);
    animateValue(setTotalThreats, 1428, 1200);
    animateValue(setFilesScanned, 12840, 1400);
    animateValue(setDevices, 84, 800);
    animateValue(setSessions, 12, 600);

    // AI Accuracy precise decimal animate
    let aiStart = 0;
    const aiTarget = 99.98;
    const aiTimer = setInterval(() => {
      aiStart += 1.83;
      if (aiStart >= aiTarget) {
        setAiAccuracy(aiTarget);
        clearInterval(aiTimer);
      } else {
        setAiAccuracy(+aiStart.toFixed(2));
      }
    }, 20);

    return () => {
      clearInterval(aiTimer);
    };
  }, []);

  return (
    <Card
      glow="primary"
      hoverLift={false}
      style={{
        padding: "2.25rem",
        marginBottom: "2.5rem",
        background: "linear-gradient(135deg, rgba(8, 12, 32, 0.8) 0%, rgba(15, 23, 42, 0.5) 100%)",
        border: "1px solid rgba(0, 229, 255, 0.15)",
        boxShadow: "0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(0, 229, 255, 0.05)",
      }}
    >
      {/* Visual background element lights */}
      <div
        style={{
          position: "absolute",
          top: "-60px",
          right: "-60px",
          width: "300px",
          height: "300px",
          background: "radial-gradient(circle, rgba(0, 229, 255, 0.08) 0%, rgba(0, 0, 0, 0) 70%)",
          borderRadius: "50%",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-60px",
          left: "-60px",
          width: "250px",
          height: "250px",
          background: "radial-gradient(circle, rgba(124, 58, 237, 0.08) 0%, rgba(0, 0, 0, 0) 70%)",
          borderRadius: "50%",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* TOP ROW: Welcome info, Gauge and Statuses */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "2.5rem",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Welcome Text */}
          <div style={{ flex: "1 1 350px", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <Badge variant="primary" showPulse>
                CORE SECURE
              </Badge>
              <span style={{ fontSize: "0.75rem", color: "#64748B", fontFamily: "'Orbitron', sans-serif" }}>
                AI ENGINE ACTIVE
              </span>
            </div>

            <h1
              style={{
                fontSize: "1.8rem",
                fontWeight: "900",
                color: "#F8FAFC",
                background: "linear-gradient(to right, #F8FAFC, #00E5FF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginTop: "0.25rem",
                fontFamily: "'Orbitron', sans-serif",
                letterSpacing: "0.03em",
              }}
            >
              Welcome back, {fullName}
            </h1>
            
            <p style={{ color: "#94A3B8", fontSize: "0.875rem", lineHeight: "1.6", maxWidth: "520px" }}>
              Nexora threat containment layers are checking server file structures. System telemetry registers zero breaches in current runtime.
            </p>

            <div style={{ display: "flex", gap: "1.25rem", marginTop: "0.5rem", flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#E2E8F0", fontSize: "0.75rem" }}>
                <Cpu size={14} style={{ color: "#00E5FF" }} />
                <span>Node: <strong style={{ color: "#00E5FF", fontFamily: "monospace" }}>{username}</strong></span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#E2E8F0", fontSize: "0.75rem" }}>
                <Activity size={14} style={{ color: "#7C3AED" }} />
                <span>Health Code: <strong style={{ color: "#7C3AED", fontFamily: "'Orbitron', sans-serif" }}>OPTIMIZED</strong></span>
              </div>
            </div>
          </div>

          {/* Circular Security Gauge & Protection Metrics */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.5rem",
              background: "rgba(0, 0, 0, 0.2)",
              border: "1px solid rgba(255, 255, 255, 0.05)",
              borderRadius: "24px",
              padding: "1.25rem 1.75rem",
              minWidth: "290px",
              backdropFilter: "blur(10px)",
            }}
          >
            {/* SVG Circular Gauge */}
            <div style={{ position: "relative", width: "75px", height: "75px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="75" height="75" viewBox="0 0 36 36">
                <path
                  stroke="rgba(255, 255, 255, 0.04)"
                  strokeWidth="3"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <motion.path
                  stroke="url(#heroCyanPurple)"
                  strokeWidth="3"
                  strokeDasharray={`${securityScore}, 100`}
                  strokeLinecap="round"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                />
                <defs>
                  <linearGradient id="heroCyanPurple" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00E5FF" />
                    <stop offset="100%" stopColor="#7C3AED" />
                  </linearGradient>
                </defs>
              </svg>
              <div
                style={{
                  position: "absolute",
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: "1.1rem",
                  fontWeight: "800",
                  color: "#00E5FF",
                  textShadow: "0 0 10px rgba(0, 229, 255, 0.5)",
                }}
              >
                <AnimatedCounter value={securityScore} type="percent" />
              </div>
            </div>

            {/* Health & Protection details */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              <span style={{ fontSize: "0.7rem", color: "#64748B", fontFamily: "'Orbitron', sans-serif", letterSpacing: "0.05em" }}>
                SECURITY SCORE
              </span>
              <span style={{ fontSize: "1.1rem", fontWeight: "800", color: "#F8FAFC", fontFamily: "'Orbitron', sans-serif" }}>
                OPTIMIZED
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    backgroundColor: "#22C55E",
                    boxShadow: "0 0 8px #22C55E",
                    display: "inline-block",
                  }}
                />
                <span style={{ fontSize: "0.75rem", color: "#22C55E", fontWeight: "600" }}>
                  AI Guard ACTIVE
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM ROW: 6 Animated KPI Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "1.25rem",
            marginTop: "0.5rem",
          }}
        >
          {/* 1. Total Threats */}
          <motion.div
            whileHover={{ scale: 1.03, y: -2 }}
            style={kpiCardStyle}
          >
            <ShieldAlert size={16} style={{ color: "#FF4D6D", marginBottom: "0.25rem" }} />
            <span style={kpiLabelStyle}>TOTAL THREATS</span>
            <span style={kpiValueStyle}><AnimatedCounter value={totalThreats} /></span>
            <span style={{ fontSize: "0.65rem", color: "#FF4D6D" }}>All mitigation channels</span>
          </motion.div>

          {/* 2. Critical Alerts */}
          <motion.div
            whileHover={{ scale: 1.03, y: -2 }}
            style={{
              ...kpiCardStyle,
              border: alertsCount > 0 ? "1px solid rgba(255, 77, 109, 0.25)" : kpiCardStyle.border,
              background: alertsCount > 0 ? "rgba(255, 77, 109, 0.05)" : kpiCardStyle.background,
            }}
          >
            <Zap size={16} style={{ color: "#FF4D6D", marginBottom: "0.25rem" }} className={alertsCount > 0 ? "threat-pulse-high" : ""} />
            <span style={kpiLabelStyle}>CRITICAL ALERTS</span>
            <span style={{ ...kpiValueStyle, color: alertsCount > 0 ? "#FF4D6D" : "#F8FAFC" }}><AnimatedCounter value={alertsCount} /></span>
            <span style={{ fontSize: "0.65rem", color: alertsCount > 0 ? "#FF4D6D" : "#64748B" }}>Requires action</span>
          </motion.div>

          {/* 3. Files Scanned */}
          <motion.div
            whileHover={{ scale: 1.03, y: -2 }}
            style={kpiCardStyle}
          >
            <FileCheck size={16} style={{ color: "#00E5FF", marginBottom: "0.25rem" }} />
            <span style={kpiLabelStyle}>FILES SCANNED</span>
            <span style={kpiValueStyle}><AnimatedCounter value={filesScanned} /></span>
            <span style={{ fontSize: "0.65rem", color: "#22C55E" }}>100% integrity score</span>
          </motion.div>

          {/* 4. AI Accuracy */}
          <motion.div
            whileHover={{ scale: 1.03, y: -2 }}
            style={kpiCardStyle}
          >
            <Cpu size={16} style={{ color: "#7C3AED", marginBottom: "0.25rem" }} />
            <span style={kpiLabelStyle}>AI ACCURACY</span>
            <span style={kpiValueStyle}><AnimatedCounter value={aiAccuracy} type="float" />%</span>
            <span style={{ fontSize: "0.65rem", color: "#7C3AED" }}>Cognitive heuristics</span>
          </motion.div>

          {/* 5. Protected Devices */}
          <motion.div
            whileHover={{ scale: 1.03, y: -2 }}
            style={kpiCardStyle}
          >
            <Server size={16} style={{ color: "#22C55E", marginBottom: "0.25rem" }} />
            <span style={kpiLabelStyle}>DEVICES PROTECTED</span>
            <span style={kpiValueStyle}><AnimatedCounter value={devices} /></span>
            <span style={{ fontSize: "0.65rem", color: "#64748B" }}>Active gateways</span>
          </motion.div>

          {/* 6. Active Sessions */}
          <motion.div
            whileHover={{ scale: 1.03, y: -2 }}
            style={kpiCardStyle}
          >
            <Terminal size={16} style={{ color: "#00E5FF", marginBottom: "0.25rem" }} />
            <span style={kpiLabelStyle}>ACTIVE SESSIONS</span>
            <span style={kpiValueStyle}><AnimatedCounter value={sessions} /></span>
            <span style={{ fontSize: "0.65rem", color: "#22C55E" }}>Secure terminals</span>
          </motion.div>
        </div>
      </div>
    </Card>
  );
}

// KPI Styles configuration helpers
const kpiCardStyle = {
  background: "rgba(0, 0, 0, 0.25)",
  border: "1px solid rgba(255, 255, 255, 0.05)",
  borderRadius: "16px",
  padding: "1rem",
  display: "flex",
  flexDirection: "column",
  gap: "0.25rem",
  transition: "all 0.3s ease",
  backdropFilter: "blur(5px)",
};

const kpiLabelStyle = {
  fontSize: "0.625rem",
  color: "#94A3B8",
  fontFamily: "'Orbitron', sans-serif",
  letterSpacing: "0.05em",
  fontWeight: "600",
};

const kpiValueStyle = {
  fontSize: "1.25rem",
  fontWeight: "800",
  color: "#F8FAFC",
  fontFamily: "'Orbitron', sans-serif",
  margin: "0.125rem 0",
};

export default DashboardHero;
