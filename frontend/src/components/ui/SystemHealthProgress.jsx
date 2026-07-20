import { motion } from "framer-motion";
import { Cpu, HardDrive, ShieldCheck, Activity } from "lucide-react";
import Card from "./Card";

function SystemHealthProgress() {
  const metrics = [
    {
      name: "CPU Allocations",
      value: 42,
      max: 100,
      icon: Cpu,
      color: "#00E5FF",
      glowColor: "rgba(0, 229, 255, 0.4)",
    },
    {
      name: "Kernel Memory Load",
      value: 58,
      max: 100,
      icon: Activity,
      color: "#7C3AED",
      glowColor: "rgba(124, 58, 237, 0.4)",
    },
    {
      name: "Disk Signature Health",
      value: 99.9,
      max: 100,
      icon: HardDrive,
      color: "#22C55E",
      glowColor: "rgba(34, 197, 94, 0.4)",
    },
    {
      name: "Firewall Packets Passed",
      value: 98.7,
      max: 100,
      icon: ShieldCheck,
      color: "#00E5FF",
      glowColor: "rgba(0, 229, 255, 0.4)",
    },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "1.5rem",
        marginBottom: "2rem",
      }}
    >
      {metrics.map((m, idx) => {
        const Icon = m.icon;
        return (
          <Card
            key={idx}
            glow="none"
            hoverLift={true}
            style={{
              padding: "1.25rem",
              background: "rgba(8, 12, 32, 0.35)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
              <span
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: "0.75rem",
                  color: "#94A3B8",
                  letterSpacing: "0.03em",
                  fontWeight: "600",
                }}
              >
                {m.name}
              </span>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "28px",
                  height: "28px",
                  borderRadius: "6px",
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                  color: m.color,
                }}
              >
                <Icon size={14} />
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "0.5rem" }}>
              <span
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: "1.25rem",
                  fontWeight: "800",
                  color: "#F8FAFC",
                }}
              >
                {m.value}%
              </span>
              <span style={{ fontSize: "0.65rem", color: "#64748B" }}>
                Limit: {m.max}%
              </span>
            </div>

            {/* Glowing progress bar */}
            <div
              style={{
                width: "100%",
                height: "6px",
                borderRadius: "3px",
                background: "rgba(255, 255, 255, 0.05)",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${m.value}%` }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                style={{
                  height: "100%",
                  borderRadius: "3px",
                  background: m.color,
                  boxShadow: `0 0 8px ${m.glowColor}`,
                }}
              />
            </div>
          </Card>
        );
      })}
    </div>
  );
}

export default SystemHealthProgress;
