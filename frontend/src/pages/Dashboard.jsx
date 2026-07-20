import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  ShieldAlert,
  ShieldCheck,
  HardDrive,
  Flame,
  AlertTriangle,
  Activity,
  Heart,
  Search,
  Download,
  Terminal,
} from "lucide-react";

import ReportGenerator from "../components/ReportGenerator";
import { connectWebSocket, closeWebSocket } from "../services/websocket";

import CyberAttackMap from "../components/ui/CyberAttackMap";
import NetworkActivityChart from "../components/ui/NetworkActivityChart";
import AICopilotPanel from "../components/ui/AICopilotPanel";

import SystemHealthProgress from "../components/ui/SystemHealthProgress";
import LiveThreatTimeline from "../components/ui/LiveThreatTimeline";
import RecentActivityFeed from "../components/ui/RecentActivityFeed";

import DashboardHero from "../components/ui/DashboardHero";
import StatCard from "../components/StatCard";
import Card from "../components/ui/Card";
import ChartCard from "../components/ui/ChartCard";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Badge from "../components/ui/Badge";

function Dashboard() {
  const [alerts, setAlerts] = useState([]);
  const [previousCount, setPreviousCount] = useState(0);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    const fetchAlerts = () => {
      axios
        .get("http://127.0.0.1:8000/alerts")
        .then((response) => {
          setAlerts(response.data);
          setPreviousCount(response.data.length);
          setLastUpdated(new Date().toLocaleTimeString());
        })
        .catch((err) => console.log(err));
    };

    // Initial Fetch
    fetchAlerts();

    // WebSocket
    connectWebSocket((newAlert) => {
      toast.success("🚨 New Security Alert Detected!");
      setAlerts((prev) => [newAlert, ...prev]);
      setPreviousCount((prev) => prev + 1);
      setLastUpdated(new Date().toLocaleTimeString());
    });

    // Backup Polling
    const interval = setInterval(fetchAlerts, 30000);

    return () => {
      clearInterval(interval);
      closeWebSocket();
    };
  }, []);

  const lowCount = alerts.filter((a) => a.threat === "Low").length;
  const mediumCount = alerts.filter((a) => a.threat === "Medium").length;
  const highCount = alerts.filter((a) => a.threat === "High").length;

  const riskScore =
    alerts.length === 0
      ? 0
      : Math.round(
          ((highCount * 3 + mediumCount * 2 + lowCount) / (alerts.length * 3)) *
            100,
        );

  const filteredAlerts = useMemo(() => {
    return alerts.filter((alert) => {
      const matchSearch = alert.file
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchFilter = filter === "All" ? true : alert.threat === filter;

      return matchSearch && matchFilter;
    });
  }, [alerts, search, filter]);

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(filteredAlerts, null, 2)], {
      type: "application/json",
    });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "alerts.json";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div style={{ position: "relative", zIndex: 1 }} className="container animate-fade-in">
      {/* Premium Dashboard Greeting & Gauge Hero */}
      <DashboardHero alertsCount={highCount} />

      {/* Core Integrity Statistics Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1.5rem",
          marginBottom: "2rem",
        }}
      >
        <StatCard
          title="Total Events Logged"
          value={alerts.length}
          icon={ShieldAlert}
          glow="primary"
          description="Monitored integrity alerts"
        />

        <StatCard
          title="Core Kernel Status"
          value="Monitoring"
          icon={ShieldCheck}
          glow="success"
          description={`Last synced: ${lastUpdated}`}
        />

        <StatCard
          title="Files Under Watch"
          value="1"
          icon={HardDrive}
          glow="secondary"
          description="Active tracking nodes"
        />
      </div>

      {/* Threat Metrics & Vulnerabilities */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1.5rem",
          marginBottom: "2rem",
        }}
      >
        <StatCard
          title="Low Severity"
          value={lowCount}
          icon={Heart}
          glow="success"
          description="Subtle parameter shifts"
        />

        <StatCard
          title="Medium Severity"
          value={mediumCount}
          icon={AlertTriangle}
          glow="warning"
          description="Suspicious activity"
        />

        <StatCard
          title="High Severity"
          value={highCount}
          icon={Flame}
          glow="danger"
          description="Immediate threats found"
        />

        <StatCard
          title="System Risk Index"
          value={`${riskScore}%`}
          icon={Activity}
          glow={riskScore > 50 ? "danger" : riskScore > 20 ? "warning" : "success"}
          description="Aggregate risk vectors"
        />
      </div>

      {/* Search Console & Filter Actions Bar */}
      <Card
        glow="none"
        hoverLift={false}
        style={{
          padding: "1.25rem",
          marginBottom: "2rem",
          background: "rgba(8, 12, 32, 0.4)",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {/* Custom Search Box */}
          <div style={{ flex: 1, minWidth: "260px" }}>
            <Input
              placeholder="Search compromised directory paths or file hashes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              startIcon={Search}
            />
          </div>

          {/* Glass Select Option Dropdown */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "0.75rem", color: "#64748B", fontFamily: "'Orbitron', sans-serif" }}>
              SEVERITY:
            </span>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              style={{
                background: "rgba(8, 12, 32, 0.6)",
                color: "#F8FAFC",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "12px",
                padding: "0.5rem 1rem",
                height: "2.75rem",
                fontSize: "0.85rem",
                cursor: "pointer",
                outline: "none",
                fontFamily: "'Orbitron', sans-serif",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#00E5FF")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(255, 255, 255, 0.08)")}
            >
              <option value="All">All Threat Levels</option>
              <option value="Low">Low Threat</option>
              <option value="Medium">Medium Threat</option>
              <option value="High">High Threat</option>
            </select>
          </div>

          {/* Export JSON Action */}
          <Button variant="secondary" onClick={exportJSON} icon={Download}>
            Export JSON
          </Button>

          {/* Report Generator Controls */}
          <div style={{ marginLeft: "auto" }}>
            <ReportGenerator alerts={filteredAlerts} />
          </div>
        </div>
      </Card>

      {/* Middle Section: Cyber Attack Map and AI Copilot */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "2rem",
          marginBottom: "2rem",
          alignItems: "stretch",
        }}
      >
        <CyberAttackMap />
        <AICopilotPanel />
      </div>

      {/* Network Activity Chart */}
      <div
        style={{
          marginBottom: "2rem",
        }}
      >
        <NetworkActivityChart />
      </div>

      {/* Lower Section: System Health Progress Cards */}
      <SystemHealthProgress />

      {/* Timeline & Activity Feed Side-by-Side */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "2rem",
          marginBottom: "2rem",
          alignItems: "stretch",
        }}
      >
        <LiveThreatTimeline alerts={alerts} />
        <RecentActivityFeed />
      </div>

      {/* Database Integrity Alert Table */}
      <Card
        glow="primary"
        hoverLift={false}
        style={{
          marginTop: "2rem",
          padding: "1.5rem",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
            paddingBottom: "1rem",
            marginBottom: "1rem",
          }}
        >
          <Terminal size={18} style={{ color: "#00E5FF" }} />
          <h2
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: "1rem",
              fontWeight: "700",
              color: "#F8FAFC",
              letterSpacing: "0.03em",
            }}
          >
            System Intrusion Alert Stream
          </h2>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              background: "transparent",
              color: "#F8FAFC",
            }}
          >
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}>
                <th style={{ padding: "12px", textAlign: "left", fontSize: "0.75rem", fontFamily: "'Orbitron', sans-serif", color: "#64748B" }}>Timestamp</th>
                <th style={{ padding: "12px", textAlign: "left", fontSize: "0.75rem", fontFamily: "'Orbitron', sans-serif", color: "#64748B" }}>File Path</th>
                <th style={{ padding: "12px", textAlign: "left", fontSize: "0.75rem", fontFamily: "'Orbitron', sans-serif", color: "#64748B" }}>Action Event</th>
                <th style={{ padding: "12px", textAlign: "right", fontSize: "0.75rem", fontFamily: "'Orbitron', sans-serif", color: "#64748B" }}>Threat Level</th>
              </tr>
            </thead>
            <tbody>
              {filteredAlerts.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    style={{
                      textAlign: "center",
                      padding: "2.5rem",
                      color: "#64748B",
                      fontSize: "0.85rem",
                    }}
                  >
                    No alerts currently logged in kernel stream
                  </td>
                </tr>
              ) : (
                filteredAlerts.map((alert, index) => (
                  <tr
                    key={alert.id || index}
                    style={{
                      borderBottom: "1px solid rgba(255, 255, 255, 0.03)",
                      transition: "background 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.02)")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                  >
                    <td style={{ padding: "12px", fontSize: "0.8125rem", color: "#94A3B8", fontFamily: "monospace" }}>
                      {alert.time}
                    </td>
                    <td style={{ padding: "12px", fontSize: "0.8125rem", fontWeight: "600", color: "#E2E8F0" }}>
                      {alert.file}
                    </td>
                    <td style={{ padding: "12px", fontSize: "0.8125rem" }}>
                      <span
                        style={{
                          background: "rgba(0, 0, 0, 0.2)",
                          border: "1px solid rgba(255,255,255,0.05)",
                          padding: "0.25rem 0.5rem",
                          borderRadius: "6px",
                          color: "#00E5FF",
                          fontFamily: "monospace",
                        }}
                      >
                        {alert.status}
                      </span>
                    </td>
                    <td style={{ padding: "12px", textAlign: "right" }}>
                      <Badge
                        variant={
                          alert.threat === "High" ? "danger" : alert.threat === "Medium" ? "warning" : "success"
                        }
                      >
                        {alert.threat}
                      </Badge>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Premium layout footer */}
      <footer
        style={{
          marginTop: "4rem",
          textAlign: "center",
          color: "#475569",
          padding: "2rem 0",
          borderTop: "1px solid rgba(255, 255, 255, 0.05)",
          fontSize: "0.75rem",
        }}
      >
        <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: "700", color: "#64748B", letterSpacing: "0.05em" }}>
          NEXORA AI SECURITY SUITE
        </span>
        <p style={{ marginTop: "0.25rem" }}>AI-Driven File Integrity & Kernel Call Monitoring System</p>
        <p style={{ marginTop: "0.5rem", color: "#334155" }}>
          © 2026 Nexora AI Inc. All telemetry encrypted in transit.
        </p>
      </footer>
    </div>
  );
}

export default Dashboard;
