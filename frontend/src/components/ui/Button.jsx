import { motion } from "framer-motion";

function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  icon: Icon,
  className = "",
  ...props
}) {
  // Styles for different variants
  const baseStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    borderRadius: "12px",
    fontWeight: "600",
    fontSize: "0.875rem",
    fontFamily: "'Orbitron', sans-serif",
    letterSpacing: "0.05em",
    cursor: disabled || loading ? "not-allowed" : "pointer",
    opacity: disabled || loading ? 0.6 : 1,
    transition: "all 0.2s ease-in-out",
    border: "1px solid transparent",
  };

  const sizes = {
    sm: { padding: "0.5rem 1rem", fontSize: "0.75rem" },
    md: { padding: "0.75rem 1.5rem", fontSize: "0.875rem" },
    lg: { padding: "1rem 2rem", fontSize: "1rem" },
  };

  const variants = {
    primary: {
      background: "linear-gradient(135deg, #00E5FF 0%, #7C3AED 100%)",
      color: "#FFFFFF",
      boxShadow: "0 0 15px rgba(0, 229, 255, 0.3)",
      border: "1px solid rgba(0, 229, 255, 0.4)",
    },
    secondary: {
      background: "rgba(124, 58, 237, 0.15)",
      color: "#F8FAFC",
      border: "1px solid rgba(124, 58, 237, 0.3)",
      boxShadow: "0 0 10px rgba(124, 58, 237, 0.1)",
    },
    success: {
      background: "rgba(34, 197, 94, 0.15)",
      color: "#22C55E",
      border: "1px solid rgba(34, 197, 94, 0.3)",
      boxShadow: "0 0 10px rgba(34, 197, 94, 0.1)",
    },
    danger: {
      background: "rgba(255, 77, 109, 0.15)",
      color: "#FF4D6D",
      border: "1px solid rgba(255, 77, 109, 0.3)",
      boxShadow: "0 0 10px rgba(255, 77, 109, 0.1)",
    },
    outline: {
      background: "transparent",
      color: "#00E5FF",
      border: "1px solid rgba(0, 229, 255, 0.3)",
    },
    ghost: {
      background: "transparent",
      color: "#94A3B8",
      border: "1px solid transparent",
    },
  };

  const currentSize = sizes[size] || sizes.md;
  const currentVariant = variants[variant] || variants.primary;

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      style={{
        ...baseStyle,
        ...currentSize,
        ...currentVariant,
      }}
      whileHover={disabled || loading ? {} : { scale: 1.02, y: -1, boxShadow: variant === "primary" ? "0 0 20px rgba(0, 229, 255, 0.5)" : "0 0 15px rgba(255, 255, 255, 0.1)" }}
      whileTap={disabled || loading ? {} : { scale: 0.98 }}
      className={`nexora-btn ${className}`}
      {...props}
    >
      {loading ? (
        <svg
          style={{
            animation: "spin 1s linear infinite",
            width: "1.25rem",
            height: "1.25rem",
            marginRight: "0.25rem",
          }}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            style={{ opacity: 0.25 }}
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            style={{ opacity: 0.75 }}
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : Icon ? (
        <Icon size={16} />
      ) : null}
      <span>{children}</span>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </motion.button>
  );
}

export default Button;
