import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import AlertChart from "../charts/AlertChart";
import ReportGenerator from "../components/ReportGenerator";
import ActivityTimeline from "../components/ActivityTimeline";
import { connectWebSocket, closeWebSocket } from "../services/websocket";

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
    <div className="container">
      <h1>🛡 Nexora Dashboard</h1>

      <p
        style={{
          color: "#94a3b8",
          marginBottom: "20px",
          fontSize: "14px",
        }}
      >
        🕒 Last Updated : {lastUpdated}
      </p>

      {/* Main Cards */}

      <div className="cards">
        <div className="card">
          <h2>Total Alerts</h2>
          <p>{alerts.length}</p>
        </div>

        <div className="card">
          <h2>System Status</h2>

          <p
            style={{
              color: "#22c55e",
              fontWeight: "bold",
            }}
          >
            🟢 Monitoring
          </p>
        </div>

        <div className="card">
          <h2>Files Monitored</h2>

          <p>1</p>
        </div>
      </div>

      {/* Threat Cards */}

      <div className="cards">
        <div className="card">
          <h2 style={{ color: "#22c55e" }}>🟢 Low</h2>

          <p>{lowCount}</p>
        </div>

        <div className="card">
          <h2 style={{ color: "#facc15" }}>🟡 Medium</h2>

          <p>{mediumCount}</p>
        </div>

        <div className="card">
          <h2 style={{ color: "#ef4444" }}>🔴 High</h2>

          <p>{highCount}</p>
        </div>

        <div className="card">
          <h2 style={{ color: "#38bdf8" }}>⚡ Risk Score</h2>

          <p>{riskScore}%</p>
        </div>
      </div>

      {/* Search + Filter */}

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "25px",
          flexWrap: "wrap",
        }}
      >
        <input
          type="text"
          placeholder="🔍 Search File..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            minWidth: "250px",
            padding: "12px",
            borderRadius: "8px",
          }}
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{
            padding: "12px",
            borderRadius: "8px",
          }}
        >
          <option>All</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <button onClick={exportJSON}>⬇ Export JSON</button>
      </div>

      {/* Report */}

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "20px",
        }}
      >
        <ReportGenerator alerts={filteredAlerts} />
      </div>

      {/* Alert Chart */}

      <h2>📊 Alert Statistics</h2>

      <div
        style={{
          background: "#1e293b",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "30px",
        }}
      >
        <AlertChart alerts={filteredAlerts} />
      </div>
      {/* Recent Alerts */}

      <h2>🚨 Recent Alerts</h2>

      <table>
        <thead>
          <tr>
            <th>Time</th>
            <th>File</th>
            <th>Status</th>
            <th>Threat</th>
          </tr>
        </thead>

        <tbody>
          {filteredAlerts.length === 0 ? (
            <tr>
              <td
                colSpan="4"
                style={{
                  textAlign: "center",
                  padding: "20px",
                  color: "#94a3b8",
                }}
              >
                No Alerts Found
              </td>
            </tr>
          ) : (
            filteredAlerts.map((alert, index) => (
              <tr key={alert.id || index}>
                <td>{alert.time}</td>

                <td>{alert.file}</td>

                <td>{alert.status}</td>

                <td>
                  {alert.threat === "High" ? (
                    <span
                      style={{
                        color: "#ef4444",
                        fontWeight: "bold",
                      }}
                    >
                      🔴 High
                    </span>
                  ) : alert.threat === "Medium" ? (
                    <span
                      style={{
                        color: "#facc15",
                        fontWeight: "bold",
                      }}
                    >
                      🟡 Medium
                    </span>
                  ) : (
                    <span
                      style={{
                        color: "#22c55e",
                        fontWeight: "bold",
                      }}
                    >
                      🟢 Low
                    </span>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Activity Timeline */}

      <ActivityTimeline alerts={alerts} />
      {/* Footer */}

      <footer
        style={{
          marginTop: "40px",
          textAlign: "center",
          color: "#94a3b8",
          padding: "25px",
          borderTop: "1px solid #334155",
        }}
      >
        <h3
          style={{
            marginBottom: "10px",
          }}
        >
          🛡 Nexora AI Security Platform
        </h3>

        <p>AI Powered File Integrity Monitoring System</p>

        <p
          style={{
            marginTop: "10px",
            fontSize: "13px",
          }}
        >
          🔄 Live Monitoring Enabled | 📡 FastAPI Connected | 🗄 SQLite Database
          | ⚡ WebSocket Enabled
        </p>

        <p
          style={{
            marginTop: "15px",
            fontSize: "12px",
            color: "#64748b",
          }}
        >
          © 2026 Nexora AI. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}

export default Dashboard;
