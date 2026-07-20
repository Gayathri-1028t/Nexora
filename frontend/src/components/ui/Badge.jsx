function Badge({
  children,
  variant = "info", // primary, secondary, success, danger, warning, info
  showPulse = false,
  className = "",
  style = {},
  ...props
}) {
  const variants = {
    primary: {
      bg: "rgba(0, 229, 255, 0.1)",
      color: "#00E5FF",
      border: "1px solid rgba(0, 229, 255, 0.25)",
      glowColor: "rgba(0, 229, 255, 0.8)",
    },
    secondary: {
      bg: "rgba(124, 58, 237, 0.1)",
      color: "#D8B4FE",
      border: "1px solid rgba(124, 58, 237, 0.25)",
      glowColor: "rgba(124, 58, 237, 0.8)",
    },
    success: {
      bg: "rgba(34, 197, 94, 0.1)",
      color: "#4ADE80",
      border: "1px solid rgba(34, 197, 94, 0.25)",
      glowColor: "rgba(34, 197, 94, 0.8)",
    },
    danger: {
      bg: "rgba(255, 77, 109, 0.1)",
      color: "#FF4D6D",
      border: "1px solid rgba(255, 77, 109, 0.25)",
      glowColor: "rgba(255, 77, 109, 0.8)",
    },
    warning: {
      bg: "rgba(250, 204, 21, 0.1)",
      color: "#FACC15",
      border: "1px solid rgba(250, 204, 21, 0.25)",
      glowColor: "rgba(250, 204, 21, 0.8)",
    },
    info: {
      bg: "rgba(148, 163, 184, 0.1)",
      color: "#94A3B8",
      border: "1px solid rgba(148, 163, 184, 0.25)",
      glowColor: "rgba(148, 163, 184, 0.8)",
    },
  };

  const current = variants[variant] || variants.info;

  const badgeStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.375rem",
    padding: "0.25rem 0.625rem",
    borderRadius: "9999px",
    fontSize: "0.75rem",
    fontWeight: "600",
    fontFamily: "'Orbitron', sans-serif",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    backgroundColor: current.bg,
    color: current.color,
    border: current.border,
    boxShadow: `0 0 10px ${current.bg}`,
    ...style,
  };

  const pulseDotStyle = {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    backgroundColor: current.color,
    boxShadow: `0 0 8px ${current.glowColor}`,
    animation: showPulse ? "badgePulse 2s infinite" : "none",
  };

  return (
    <span style={badgeStyle} className={className} {...props}>
      <span style={pulseDotStyle} />
      <span>{children}</span>
      {showPulse && (
        <style>{`
          @keyframes badgePulse {
            0% { transform: scale(0.9); opacity: 0.6; }
            50% { transform: scale(1.2); opacity: 1; }
            100% { transform: scale(0.9); opacity: 0.6; }
          }
        `}</style>
      )}
    </span>
  );
}

export default Badge;
