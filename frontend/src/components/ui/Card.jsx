import { motion } from "framer-motion";

function Card({
  children,
  className = "",
  glow = "primary", // primary, secondary, success, danger, none
  hoverLift = true,
  onClick,
  ...props
}) {
  const getGlowShadow = () => {
    switch (glow) {
      case "primary":
        return "rgba(0, 229, 255, 0.05)";
      case "secondary":
        return "rgba(124, 58, 237, 0.05)";
      case "success":
        return "rgba(34, 197, 94, 0.05)";
      case "danger":
        return "rgba(255, 77, 109, 0.05)";
      default:
        return "transparent";
    }
  };

  const getHoverBorder = () => {
    switch (glow) {
      case "primary":
        return "rgba(0, 229, 255, 0.25)";
      case "secondary":
        return "rgba(124, 58, 237, 0.25)";
      case "success":
        return "rgba(34, 197, 94, 0.25)";
      case "danger":
        return "rgba(255, 77, 109, 0.25)";
      default:
        return "rgba(255, 255, 255, 0.15)";
    }
  };

  const styles = {
    background: "rgba(8, 12, 32, 0.6)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "24px",
    boxShadow: `0 8px 32px 0 rgba(0, 0, 0, 0.4), inset 0 0 0 1px rgba(255, 255, 255, 0.05), 0 0 15px ${getGlowShadow()}`,
    padding: "1.5rem",
    position: "relative",
    overflow: "hidden",
    cursor: onClick ? "pointer" : "default",
  };

  const hoverAnimation = hoverLift
    ? {
        y: -6,
        borderColor: getHoverBorder(),
        boxShadow: `0 20px 45px -10px rgba(0, 0, 0, 0.75), inset 0 0 0 1.5px ${getHoverBorder()}, 0 0 30px ${
          glow === "primary" ? "rgba(0, 229, 255, 0.22)" : glow === "secondary" ? "rgba(124, 58, 237, 0.22)" : glow === "success" ? "rgba(34, 197, 94, 0.22)" : glow === "danger" ? "rgba(255, 77, 109, 0.22)" : "rgba(255, 255, 255, 0.08)"
        }`,
      }
    : {};

  return (
    <motion.div
      style={styles}
      whileHover={hoverAnimation}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={onClick}
      className={`glass-panel ${className}`}
      {...props}
    >
      {/* Glossy sweep overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "-100%",
          width: "50%",
          height: "100%",
          background: "linear-gradient(to right, transparent, rgba(255,255,255,0.03), transparent)",
          transform: "skewX(-25deg)",
          pointerEvents: "none",
          transition: "0.75s",
        }}
        className="glossy-sweep"
      />
      {children}
    </motion.div>
  );
}

export default Card;
