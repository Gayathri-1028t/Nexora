import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import AlertChart from "../charts/AlertChart";
import ActivityTimeline from "../components/ActivityTimeline";

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
          const newAlerts = response.data;

          if (previousCount !== 0 && newAlerts.length > previousCount) {
            toast.success("🚨 New Security Alert Detected!");
          }

          setAlerts(newAlerts);
          setPreviousCount(newAlerts.length);

          setLastUpdated(new Date().toLocaleTimeString());
        })
        .catch((error) => console.log(error));
    };

    fetchAlerts();

    const interval = setInterval(fetchAlerts, 5000);

    return () => clearInterval(interval);
  }, [previousCount]);

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

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "alerts.json";
    a.click();
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
          <p style={{ color: "lime" }}>🟢 Monitoring</p>
        </div>

        <div className="card">
          <h2>Files Monitored</h2>
          <p>1</p>
        </div>
      </div>

      {/* Threat Cards */}

      <div className="cards">
        <div className="card">
          <h2 style={{ color: "#4ade80" }}>🟢 Low</h2>
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

      {/* Search & Filter */}

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <input
          type="text"
          placeholder="🔍 Search File..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
          }}
        />

        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option>All</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <button onClick={exportJSON}>⬇ Export JSON</button>
      </div>

      {/* Chart */}

      <h2>📊 Alert Statistics</h2>

      <div
        style={{
          background: "#1e293b",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "30px",
        }}
      >
        <AlertChart alerts={alerts} />
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
          {filteredAlerts.map((alert, index) => (
            <tr key={index}>
              <td>{alert.time}</td>

              <td>{alert.file}</td>

              <td>{alert.status}</td>

              <td>
                {alert.threat === "High" ? (
                  <span
                    style={{
                      color: "red",
                      fontWeight: "bold",
                    }}
                  >
                    🔴 High
                  </span>
                ) : alert.threat === "Medium" ? (
                  <span
                    style={{
                      color: "orange",
                      fontWeight: "bold",
                    }}
                  >
                    🟡 Medium
                  </span>
                ) : (
                  <span
                    style={{
                      color: "lime",
                      fontWeight: "bold",
                    }}
                  >
                    🟢 Low
                  </span>
                )}
              </td>
            </tr>
          ))}
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
          paddingBottom: "20px",
        }}
      >
        © 2026 Nexora AI
        <br />
        AI Powered File Integrity Monitoring System
      </footer>
    </div>
  );
}

export default Dashboard;
