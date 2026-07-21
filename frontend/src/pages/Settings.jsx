import { useState } from "react";
import { toast } from "react-toastify";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import { Settings as SettingsIcon, Shield, Bell, Mail, RefreshCw } from "lucide-react";
import PageTransition from "../components/ui/PageTransition";

function Settings() {
  const [realtime, setRealtime] = useState(true);
  const [notify, setNotify] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(false);
  const [loading, setLoading] = useState(false);

  const saveSettings = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setLoading(false);
    toast.success("⚙ Settings saved successfully!");
  };

  return (
    <PageTransition>
      <div style={{ position: "relative", zIndex: 1 }} className="container">
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "1.8rem", color: "#F8FAFC", marginBottom: "0.25rem" }}>
          Settings Console
        </h1>
        <p style={{ color: "#94A3B8", fontSize: "0.9rem" }}>
          Configure security detection preferences, heuristic algorithms, and notifications.
        </p>
      </div>

      <div style={{ maxWidth: "600px" }}>
        <Card glow="primary">
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem", borderBottom: "1px solid rgba(255, 255, 255, 0.05)", paddingBottom: "1rem" }}>
            <SettingsIcon size={20} style={{ color: "#00E5FF" }} />
            <h2 style={{ fontSize: "1.1rem", color: "#F8FAFC", fontFamily: "'Orbitron', sans-serif" }}>
              Application Configuration
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            
            {/* Toggle 1 */}
            <div style={settingRowStyle}>
              <div style={{ display: "flex", gap: "0.75rem" }}>
                <Shield size={18} style={{ color: "#00E5FF", marginTop: "0.125rem" }} />
                <div>
                  <span style={labelStyle}>REAL-TIME KERNEL MONITORING</span>
                  <p style={descStyle}>Actively inspect system logs and audit database transactions.</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={realtime}
                onChange={(e) => setRealtime(e.target.checked)}
                style={checkboxStyle}
              />
            </div>

            {/* Toggle 2 */}
            <div style={settingRowStyle}>
              <div style={{ display: "flex", gap: "0.75rem" }}>
                <Bell size={18} style={{ color: "#7C3AED", marginTop: "0.125rem" }} />
                <div>
                  <span style={labelStyle}>INTRUSION ALERTS (TOASTS)</span>
                  <p style={descStyle}>Send immediate browser alerts when malicious signatures trip logs.</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={notify}
                onChange={(e) => setNotify(e.target.checked)}
                style={checkboxStyle}
              />
            </div>

            {/* Toggle 3 */}
            <div style={settingRowStyle}>
              <div style={{ display: "flex", gap: "0.75rem" }}>
                <Mail size={18} style={{ color: "#22C55E", marginTop: "0.125rem" }} />
                <div>
                  <span style={labelStyle}>EMAIL ALERTS DISPATCH</span>
                  <p style={descStyle}>Forward critical severity alerts to security telemetry address.</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                style={checkboxStyle}
              />
            </div>

            <div style={{ marginTop: "1rem" }}>
              <Button
                variant="primary"
                onClick={saveSettings}
                loading={loading}
                style={{ width: "100%" }}
              >
                Apply Configuration
              </Button>
            </div>

          </div>
        </Card>
      </div>
      </div>
    </PageTransition>
  );
}

const settingRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  background: "rgba(0, 0, 0, 0.2)",
  border: "1px solid rgba(255, 255, 255, 0.04)",
  borderRadius: "14px",
  padding: "1rem",
  gap: "1rem"
};

const labelStyle = {
  fontSize: "0.75rem",
  color: "#F8FAFC",
  fontWeight: "700",
  fontFamily: "'Orbitron', sans-serif",
  letterSpacing: "0.03em",
  display: "block"
};

const descStyle = {
  fontSize: "0.6875rem",
  color: "#94A3B8",
  marginTop: "0.25rem",
  lineHeight: "1.4"
};

const checkboxStyle = {
  width: "20px",
  height: "20px",
  accentColor: "#00E5FF",
  cursor: "pointer",
  flexShrink: 0,
  marginTop: "0.25rem"
};

export default Settings;
