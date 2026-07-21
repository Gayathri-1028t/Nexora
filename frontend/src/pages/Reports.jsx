import { useState, useEffect } from "react";
import axios from "axios";
import Card from "../components/ui/Card";
import ReportGenerator from "../components/ReportGenerator";
import { FileText, Shield, AlertTriangle } from "lucide-react";
import PageTransition from "../components/ui/PageTransition";

// Robust backup mock alerts in case API is offline
const MOCK_ALERTS = [
  { id: 1, time: "22:15:30", file: "/etc/passwd", status: "MODIFIED", threat: "High" },
  { id: 2, time: "21:40:12", file: "/var/log/secure", status: "DELETED", threat: "High" },
  { id: 3, time: "20:05:44", file: "/bin/systemd", status: "READ_ATTEMPT", threat: "Medium" },
  { id: 4, time: "18:50:21", file: "/etc/ssh/sshd_config", status: "MODIFIED", threat: "High" },
  { id: 5, time: "17:12:09", file: "/tmp/exploit.sh", status: "CREATED", threat: "Critical" },
  { id: 6, time: "15:30:55", file: "/usr/sbin/cron", status: "READ_ATTEMPT", threat: "Low" },
];

function Reports() {
  const [alerts, setAlerts] = useState(MOCK_ALERTS);

  useEffect(() => {
    // Attempt to load live alerts from SQLite api
    axios
      .get("http://127.0.0.1:8000/alerts")
      .then((response) => {
        if (response.data && response.data.length > 0) {
          setAlerts(response.data);
        }
      })
      .catch((err) => {
        console.log("Using backup telemetry for report generation:", err);
      });
  }, []);

  return (
    <PageTransition>
      <div style={{ position: "relative", zIndex: 1 }} className="container">
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "1.8rem", color: "#F8FAFC", marginBottom: "0.25rem" }}>
          Security Reports Center
        </h1>
        <p style={{ color: "#94A3B8", fontSize: "0.9rem" }}>
          Generate cryptographically signed audit summaries, download host event sheets, and inspect alert logs.
        </p>
      </div>

      <div style={{ maxWidth: "650px" }}>
        <Card glow="primary">
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem", borderBottom: "1px solid rgba(255, 255, 255, 0.05)", paddingBottom: "1rem" }}>
            <FileText size={20} style={{ color: "#00E5FF" }} />
            <h2 style={{ fontSize: "1.1rem", color: "#F8FAFC", fontFamily: "'Orbitron', sans-serif" }}>
              Generate Audit Report
            </h2>
          </div>

          <p style={{ color: "#94A3B8", fontSize: "0.85rem", lineHeight: "1.6", marginBottom: "1.5rem" }}>
            This reporting console exports active kernel monitoring files, integrity violations, and mitigation reports. Downloads are packaged as high-fidelity PDF documents containing cryptographic checksum logs for compliance verification.
          </p>

          <div style={{ 
            background: "rgba(0, 0, 0, 0.2)",
            border: "1px solid rgba(255, 255, 255, 0.04)",
            borderRadius: "14px",
            padding: "1rem",
            marginBottom: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem" }}>
              <span style={{ color: "#64748B" }}>Total Compiled Events:</span>
              <span style={{ color: "#F8FAFC", fontWeight: "700", fontFamily: "monospace" }}>{alerts.length}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem" }}>
              <span style={{ color: "#64748B" }}>Security System Status:</span>
              <span style={{ color: "#22C55E", fontWeight: "700", fontFamily: "'Orbitron', sans-serif" }}>MONITORING</span>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <ReportGenerator alerts={alerts} />
          </div>
        </Card>
      </div>
      </div>
    </PageTransition>
  );
}

export default Reports;
