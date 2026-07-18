import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import AlertChart from "../charts/AlertChart";

function Dashboard() {
  const [alerts, setAlerts] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const fetchAlerts = () => {
      axios
        .get("http://127.0.0.1:8000/alerts")
        .then((response) => {
          setAlerts(response.data);
        })
        .catch((error) => console.log(error));
    };

    fetchAlerts();

    const interval = setInterval(fetchAlerts, 5000);

    return () => clearInterval(interval);
  }, []);

  const lowCount = alerts.filter((a) => a.threat === "Low").length;
  const mediumCount = alerts.filter((a) => a.threat === "Medium").length;
  const highCount = alerts.filter((a) => a.threat === "High").length;

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
      </div>

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
            padding: "12px",
            borderRadius: "8px",
            border: "none",
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

        <button
          onClick={exportJSON}
          style={{
            background: "#22c55e",
            color: "white",
            border: "none",
            padding: "12px 20px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          ⬇ Export JSON
        </button>
      </div>

      <h2>Alert Statistics</h2>

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

      <h2>Recent Alerts</h2>

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
                  <span style={{ color: "red", fontWeight: "bold" }}>
                    🔴 High
                  </span>
                ) : alert.threat === "Medium" ? (
                  <span style={{ color: "orange", fontWeight: "bold" }}>
                    🟡 Medium
                  </span>
                ) : (
                  <span style={{ color: "lime", fontWeight: "bold" }}>
                    🟢 Low
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
