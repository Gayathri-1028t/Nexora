import Card from "./Card";

function ChartCard({
  title,
  subtitle,
  children,
  icon: Icon,
  action,
  className = "",
  glow = "primary",
  ...props
}) {
  return (
    <Card
      glow={glow}
      hoverLift={false}
      className={`chart-card ${className}`}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem",
        height: "100%",
        padding: "1.5rem",
        borderRadius: "24px",
      }}
      {...props}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
          paddingBottom: "0.875rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          {Icon && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                background: "rgba(0, 229, 255, 0.1)",
                border: "1px solid rgba(0, 229, 255, 0.2)",
                color: "#00E5FF",
              }}
            >
              <Icon size={18} />
            </div>
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.125rem" }}>
            <h3
              style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: "0.95rem",
                color: "#F8FAFC",
                letterSpacing: "0.03em",
                fontWeight: "700",
              }}
            >
              {title}
            </h3>
            {subtitle && (
              <span
                style={{
                  fontSize: "0.75rem",
                  color: "#94A3B8",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {subtitle}
              </span>
            )}
          </div>
        </div>

        {action && <div style={{ display: "flex" }}>{action}</div>}
      </div>

      <div style={{ flex: 1, minHeight: "250px", position: "relative" }}>
        {children}
      </div>
    </Card>
  );
}

export default ChartCard;
