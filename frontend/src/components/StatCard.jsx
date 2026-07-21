import Card from "./ui/Card";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import AnimatedCounter from "./ui/AnimatedCounter";

function StatCard({
  title,
  value,
  icon: Icon,
  glow = "primary",
  trend,
  trendDirection = "up", // up, down
  description,
  className = "",
}) {
  const getGlowColor = () => {
    switch (glow) {
      case "primary":
        return "#00E5FF";
      case "secondary":
        return "#7C3AED";
      case "success":
        return "#22C55E";
      case "danger":
        return "#FF4D6D";
      default:
        return "#94A3B8";
    }
  };

  const renderValue = () => {
    if (typeof value === "number") {
      return <AnimatedCounter value={value} />;
    }
    if (typeof value === "string") {
      if (value.endsWith("%")) {
        const num = parseFloat(value.replace("%", ""));
        if (!isNaN(num)) {
          return <AnimatedCounter value={num} type="percent" />;
        }
      }
      const num = parseFloat(value);
      if (!isNaN(num) && isFinite(Number(value))) {
        return <AnimatedCounter value={num} />;
      }
    }
    return value;
  };

  return (
    <Card
      glow={glow}
      hoverLift={true}
      className={`stat-card ${className}`}
      style={{
        flex: "1 1 220px",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        minHeight: "140px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: "0.75rem",
            fontWeight: "600",
            color: "#94A3B8",
            letterSpacing: "0.05em",
          }}
        >
          {title}
        </span>
        {Icon && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              background: `rgba(255, 255, 255, 0.03)`,
              border: "1px solid rgba(255, 255, 255, 0.05)",
              color: getGlowColor(),
            }}
          >
            <Icon size={16} />
          </div>
        )}
      </div>

      <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem" }}>
        <span
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: "1.75rem",
            fontWeight: "800",
            color: "#F8FAFC",
            textShadow: `0 0 10px rgba(0,0,0,0.5)`,
          }}
        >
          {renderValue()}
        </span>

        {trend && (
          <span
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: "0.75rem",
              fontWeight: "600",
              color: trendDirection === "up" ? "#22C55E" : "#FF4D6D",
            }}
          >
            {trendDirection === "up" ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
            {trend}
          </span>
        )}
      </div>

      {description && (
        <span
          style={{
            fontSize: "0.75rem",
            color: "#64748B",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {description}
        </span>
      )}
    </Card>
  );
}

export default StatCard;
