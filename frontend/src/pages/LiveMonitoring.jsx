import { useEffect, useState } from "react";
import { Activity, Radio, ShieldAlert, Cpu } from "lucide-react";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import PageTransition from "../components/ui/PageTransition";

function LiveMonitoring() {
  const [trafficRate, setTrafficRate] = useState(1.4);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    // Randomize traffic slightly
    const interval = setInterval(() => {
      setTrafficRate((prev) => +(prev + (Math.random() - 0.5) * 0.1).toFixed(2));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Generate mock firewall packet logs
    const mockLogs = [
      { id: 1, time: "13:10:02", ip: "192.168.1.104", action: "PACKET_PASS", port: "443", size: "1.2KB" },
      { id: 2, time: "13:10:05", ip: "45.221.12.8", action: "ALERT_WARN", port: "22", size: "0.4KB" },
      { id: 3, time: "13:10:09", ip: "185.190.140.23", action: "BLOCK_DROP", port: "8080", size: "4.8KB" },
      { id: 4, time: "13:10:12", ip: "10.0.0.12", action: "PACKET_PASS", port: "80", size: "0.8KB" },
    ];
    setLogs(mockLogs);

    const logGenerator = setInterval(() => {
      const ports = ["80", "443", "22", "8080", "3000", "5432"];
      const actions = ["PACKET_PASS", "PACKET_PASS", "ALERT_WARN", "BLOCK_DROP"];
      const ips = ["192.168.1.5", "8.8.8.8", "142.250.190.46", "203.0.113.12", "198.51.100.55"];
      
      const newLog = {
        id: Date.now(),
        time: new Date().toLocaleTimeString(),
        ip: ips[Math.floor(Math.random() * ips.length)],
        action: actions[Math.floor(Math.random() * actions.length)],
        port: ports[Math.floor(Math.random() * ports.length)],
        size: `${(Math.random() * 5).toFixed(1)}KB`,
      };

      setLogs((prev) => [newLog, ...prev.slice(0, 9)]);
    }, 3000);

    return () => clearInterval(logGenerator);
  }, []);

  return (
    <PageTransition>
      <div style={{ padding: "2.5rem", position: "relative", zIndex: 1 }} className="container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontSize: "1.8rem", color: "#F8FAFC", marginBottom: "0.25rem" }}>
            Live Security Monitoring
          </h1>
          <p style={{ color: "#94A3B8", fontSize: "0.9rem" }}>
            Real-time server network activity, gateway packets check, and firewall control log.
          </p>
        </div>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <Badge variant="success" showPulse>
            GATEWAY ONLINE
          </Badge>
        </div>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", marginBottom: "2.5rem" }}>
        {/* Network Metrics */}
        <Card glow="primary" style={{ flex: "1 1 250px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <span style={{ fontSize: "0.75rem", color: "#94A3B8", fontFamily: "'Orbitron', sans-serif" }}>BANDWIDTH UTILIZATION</span>
            <Radio size={16} style={{ color: "#00E5FF" }} />
          </div>
          <h2 style={{ fontSize: "1.75rem", color: "#00E5FF", fontFamily: "'Orbitron', sans-serif", marginBottom: "0.25rem" }}>
            {trafficRate} Gb/s
          </h2>
          <span style={{ fontSize: "0.75rem", color: "#64748B" }}>Average Load: 38.2%</span>
        </Card>

        {/* Packet Stats */}
        <Card glow="secondary" style={{ flex: "1 1 250px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <span style={{ fontSize: "0.75rem", color: "#94A3B8", fontFamily: "'Orbitron', sans-serif" }}>PACKETS ANALYZED (1M)</span>
            <Activity size={16} style={{ color: "#7C3AED" }} />
          </div>
          <h2 style={{ fontSize: "1.75rem", color: "#F8FAFC", fontFamily: "'Orbitron', sans-serif", marginBottom: "0.25rem" }}>
            452,192
          </h2>
          <span style={{ fontSize: "0.75rem", color: "#22C55E" }}>+124 packets/sec</span>
        </Card>

        {/* Threat Drops */}
        <Card glow="danger" style={{ flex: "1 1 250px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <span style={{ fontSize: "0.75rem", color: "#94A3B8", fontFamily: "'Orbitron', sans-serif" }}>ATTACKS BLOCK-DROPPED</span>
            <ShieldAlert size={16} style={{ color: "#FF4D6D" }} />
          </div>
          <h2 style={{ fontSize: "1.75rem", color: "#FF4D6D", fontFamily: "'Orbitron', sans-serif", marginBottom: "0.25rem" }}>
            184
          </h2>
          <span style={{ fontSize: "0.75rem", color: "#FF4D6D" }}>4 Drops last 10m</span>
        </Card>
      </div>

      {/* Packet Stream Console */}
      <h2 style={{ fontSize: "1.2rem", color: "#F8FAFC", marginBottom: "1.25rem" }}>Gateway Firewall Packet Stream</h2>
      <Card glow="primary">
        <div
          style={{
            background: "rgba(0, 0, 0, 0.3)",
            borderRadius: "14px",
            border: "1px solid rgba(255, 255, 255, 0.05)",
            fontFamily: "monospace",
            fontSize: "0.8rem",
            padding: "1rem",
            maxHeight: "350px",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          {logs.map((log) => (
            <div
              key={log.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0.375rem 0.5rem",
                borderBottom: "1px solid rgba(255, 255, 255, 0.03)",
                color: log.action === "BLOCK_DROP" ? "#FF4D6D" : log.action === "ALERT_WARN" ? "#FACC15" : "#E2E8F0",
              }}
            >
              <div style={{ display: "flex", gap: "1rem" }}>
                <span style={{ color: "#64748B" }}>[{log.time}]</span>
                <span style={{ fontWeight: "700" }}>{log.action}</span>
                <span>SRC: {log.ip}</span>
              </div>
              <div>
                <span>PORT: {log.port}</span>
                <span style={{ color: "#64748B", marginLeft: "1rem" }}>{log.size}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
      </div>
    </PageTransition>
  );
}

export default LiveMonitoring;
