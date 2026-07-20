import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, CheckCircle, Info, ShieldAlert, X } from "lucide-react";

function Alert({
  message,
  description,
  variant = "danger", // danger, warning, success, info
  onClose,
  showIcon = true,
  className = "",
}) {
  const configs = {
    danger: {
      bg: "rgba(255, 77, 109, 0.08)",
      border: "1px solid rgba(255, 77, 109, 0.25)",
      color: "#FF4D6D",
      icon: ShieldAlert,
    },
    warning: {
      bg: "rgba(250, 204, 21, 0.08)",
      border: "1px solid rgba(250, 204, 21, 0.25)",
      color: "#FACC15",
      icon: AlertCircle,
    },
    success: {
      bg: "rgba(34, 197, 94, 0.08)",
      border: "1px solid rgba(34, 197, 94, 0.25)",
      color: "#22C55E",
      icon: CheckCircle,
    },
    info: {
      bg: "rgba(0, 229, 255, 0.08)",
      border: "1px solid rgba(0, 229, 255, 0.25)",
      color: "#00E5FF",
      icon: Info,
    },
  };

  const current = configs[variant] || configs.info;
  const IconComponent = current.icon;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.95 }}
        style={{
          display: "flex",
          gap: "0.875rem",
          background: current.bg,
          border: current.border,
          borderRadius: "16px",
          padding: "1rem 1.25rem",
          position: "relative",
          boxShadow: `0 4px 20px rgba(0, 0, 0, 0.2)`,
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
        className={`nexora-alert ${className}`}
      >
        {showIcon && (
          <div style={{ color: current.color, marginTop: "0.125rem", display: "flex" }}>
            <IconComponent size={20} />
          </div>
        )}

        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.25rem" }}>
          <h4
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: "0.875rem",
              fontWeight: "700",
              color: current.color,
              letterSpacing: "0.03em",
            }}
          >
            {message}
          </h4>
          {description && (
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.8125rem",
                color: "#E2E8F0",
                lineHeight: "1.4",
              }}
            >
              {description}
            </p>
          )}
        </div>

        {onClose && (
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "#94A3B8",
              padding: "0.25rem",
              borderRadius: "6px",
              display: "flex",
              alignSelf: "flex-start",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = current.color;
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#94A3B8";
              e.currentTarget.style.background = "transparent";
            }}
          >
            <X size={16} />
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

export default Alert;
