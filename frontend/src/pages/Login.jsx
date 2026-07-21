import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { Shield, User, Lock, Eye, EyeOff, KeyRound, Cpu, Terminal } from "lucide-react";
import { toast } from "react-toastify";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import CyberWorldBackground from "../components/ui/CyberWorldBackground";
import PageTransition from "../components/ui/PageTransition";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // UI state variables
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      toast.error("Please enter Username and Password");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:8000/login", {
        username,
        password,
      });

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("role", response.data.role);
      localStorage.setItem("full_name", response.data.full_name);

      toast.success("Login Successful ✅");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error("Invalid Username or Password ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <div
        style={{
          position: "relative",
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#050816",
        overflow: "hidden",
        padding: "1.5rem",
      }}
    >
      {/* Cyber Canvas Background */}
      <CyberWorldBackground />

      {/* Outer mesh lights */}
      <div className="floating-lights">
        <div className="light-bulb-1" style={{ top: "-10%", left: "20%" }} />
        <div className="light-bulb-2" style={{ bottom: "-10%", right: "15%" }} />
      </div>

      {/* Glass card container */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        style={{
          width: "100%",
          maxWidth: "460px",
          background: "rgba(8, 12, 32, 0.65)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderRadius: "24px",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(0, 229, 255, 0.03)",
          padding: "2.5rem",
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
        }}
      >
        {/* Brand Banner */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "16px",
              background: "linear-gradient(135deg, #00E5FF 0%, #7C3AED 100%)",
              boxShadow: "0 0 25px rgba(0, 229, 255, 0.4)",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Shield size={32} />
          </div>
          <div style={{ textAlign: "center", marginTop: "0.5rem" }}>
            <h1
              style={{
                fontSize: "1.6rem",
                fontWeight: "950",
                background: "linear-gradient(to right, #00E5FF, #7C3AED)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: "0.1em",
                fontFamily: "'Orbitron', sans-serif",
              }}
            >
              NEXORA
            </h1>
            <span
              style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: "0.75rem",
                color: "#94A3B8",
                fontWeight: "600",
                letterSpacing: "0.08em",
              }}
            >
              AI CYBERSECURITY PLATFORM
            </span>
          </div>
        </div>

        {/* Input Fields */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <Input
            label="Operator Identity"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            startIcon={User}
          />

          <Input
            label="Secure Access Key"
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            startIcon={Lock}
            endIcon={showPassword ? EyeOff : Eye}
            onEndIconClick={() => setShowPassword(!showPassword)}
          />
        </div>

        {/* Options Row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "0.75rem",
          }}
        >
          <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#94A3B8", cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              style={{
                accentColor: "#00E5FF",
                cursor: "pointer",
                width: "14px",
                height: "14px",
                borderRadius: "4px",
                background: "rgba(0,0,0,0.4)",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            />
            <span>Remember Node</span>
          </label>

          <span
            onClick={() => setIsForgotModalOpen(true)}
            style={{
              color: "#00E5FF",
              cursor: "pointer",
              fontWeight: "600",
              fontFamily: "'Orbitron', sans-serif",
              letterSpacing: "0.03em",
            }}
          >
            Forgot Access Key?
          </span>
        </div>

        {/* Action Button */}
        <Button
          variant="primary"
          onClick={handleLogin}
          disabled={loading}
          loading={loading}
          style={{ width: "100%", height: "2.75rem", marginTop: "0.5rem" }}
        >
          Initialize Console
        </Button>

        {/* Demo Credentials Alert panel */}
        <div
          style={{
            background: "rgba(0, 0, 0, 0.2)",
            border: "1px solid rgba(255, 255, 255, 0.05)",
            borderRadius: "12px",
            padding: "0.75rem 1rem",
            fontSize: "0.75rem",
            color: "#64748B",
            lineHeight: "1.4",
          }}
        >
          <div style={{ fontWeight: "700", color: "#94A3B8", marginBottom: "0.25rem", display: "flex", alignItems: "center", gap: "0.375rem" }}>
            <Terminal size={12} style={{ color: "#00E5FF" }} />
            <span>DEMO ENVIRONMENT ACCESS</span>
          </div>
          <span>Username: <strong style={{ color: "#F8FAFC" }}>admin</strong></span>
          <span style={{ marginLeft: "1rem" }}>Password: <strong style={{ color: "#F8FAFC" }}>admin123</strong></span>
        </div>

        {/* Footer */}
        <div
          style={{
            textAlign: "center",
            fontSize: "0.7rem",
            color: "#64748B",
            marginTop: "0.5rem",
            borderTop: "1px solid rgba(255, 255, 255, 0.05)",
            paddingTop: "1rem",
          }}
        >
          <span>Live Node Connection: Secure SSL/TLS</span>
          <br />
          <span style={{ display: "inline-flex", gap: "0.375rem", alignItems: "center", marginTop: "0.25rem" }}>
            <Cpu size={10} /> FastAPI Gateway V1.0 | SQLite Engine
          </span>
        </div>
      </motion.div>

      {/* Forgot Password Modal */}
      <Modal
        isOpen={isForgotModalOpen}
        onClose={() => setIsForgotModalOpen(false)}
        title="Access Recovery Protocol"
        size="sm"
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", color: "#F8FAFC", textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center", color: "#7C3AED" }}>
            <KeyRound size={48} />
          </div>
          <p style={{ fontSize: "0.85rem", color: "#94A3B8", lineHeight: "1.5" }}>
            For enterprise integrity security protocols, credentials recovery must be initialized via the master offline console or by contacting your network supervisor.
          </p>
          <Button variant="secondary" onClick={() => setIsForgotModalOpen(false)}>
            Acknowledge
          </Button>
        </div>
      </Modal>
      </div>
    </PageTransition>
  );
}

export default Login;
