import { useState } from "react";

function Input({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  startIcon: StartIcon,
  endIcon: EndIcon,
  onEndIconClick,
  className = "",
  containerStyle = {},
  ...props
}) {
  const [isFocused, setIsFocused] = useState(false);

  const wrapperStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "0.375rem",
    width: "100%",
    position: "relative",
    ...containerStyle,
  };

  const labelStyle = {
    fontFamily: "'Orbitron', sans-serif",
    fontSize: "0.75rem",
    fontWeight: "600",
    color: error ? "#FF4D6D" : isFocused ? "#00E5FF" : "#94A3B8",
    letterSpacing: "0.05em",
    transition: "color 0.2s ease-in-out",
  };

  const inputContainerStyle = {
    display: "flex",
    alignItems: "center",
    background: "rgba(8, 12, 32, 0.4)",
    border: `1px solid ${
      error
        ? "rgba(255, 77, 109, 0.5)"
        : isFocused
        ? "rgba(0, 229, 255, 0.6)"
        : "rgba(255, 255, 255, 0.08)"
    }`,
    borderRadius: "12px",
    padding: "0 0.875rem",
    height: "2.75rem",
    boxShadow: isFocused
      ? `0 0 10px rgba(0, 229, 255, 0.15), inset 0 0 0 1px rgba(0, 229, 255, 0.1)`
      : error
      ? "0 0 10px rgba(255, 77, 109, 0.1)"
      : "none",
    transition: "all 0.2s ease-in-out",
  };

  const inputStyle = {
    flex: 1,
    height: "100%",
    background: "transparent",
    border: "none",
    outline: "none",
    color: "#F8FAFC",
    fontFamily: "'Inter', sans-serif",
    fontSize: "0.875rem",
    width: "100%",
  };

  const iconStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: error ? "#FF4D6D" : isFocused ? "#00E5FF" : "#64748B",
    transition: "color 0.2s ease-in-out",
  };

  return (
    <div style={wrapperStyle} className={className}>
      {label && <label style={labelStyle}>{label}</label>}

      <div style={inputContainerStyle}>
        {StartIcon && (
          <div style={{ ...iconStyle, marginRight: "0.75rem" }}>
            <StartIcon size={16} />
          </div>
        )}

        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={inputStyle}
          {...props}
        />

        {EndIcon && (
          <div
            onClick={onEndIconClick}
            style={{
              ...iconStyle,
              marginLeft: "0.75rem",
              cursor: onEndIconClick ? "pointer" : "default",
            }}
          >
            <EndIcon size={16} />
          </div>
        )}
      </div>

      {error && (
        <span
          style={{
            color: "#FF4D6D",
            fontSize: "0.75rem",
            marginTop: "0.125rem",
          }}
        >
          {error}
        </span>
      )}
    </div>
  );
}

export default Input;
