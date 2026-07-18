import AlertChart from "./charts/AlertChart";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
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
        .catch((error) => {
          console.log(error);
        });
    };

    fetchAlerts();

    const interval = setInterval(fetchAlerts, 5000);

    return () => clearInterval(interval);
  }, []);

  const filteredAlerts = alerts.filter((alert) => {
    const matchSearch = alert.file.toLowerCase().includes(search.toLowerCase());

    const matchThreat = filter === "All" || alert.threat === filter;

    return matchSearch && matchThreat;
  });

  const lowCount = alerts.filter((a) => a.threat === "Low").length;
  const mediumCount = alerts.filter((a) => a.threat === "Medium").length;
  const highCount = alerts.filter((a) => a.threat === "High").length;

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(alerts, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "alerts.json";
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="container">
      <h1>🛡 Nexora Dashboard</h1>

      {/* Dashboard Cards */}

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

      {/* Threat Summary */}

      <div className="cards">
        <div className="card">
          <h2>🟢 Low</h2>
          <p>{lowCount}</p>
        </div>

        <div className="card">
          <h2>🟡 Medium</h2>
          <p>{mediumCount}</p>
        </div>

        <div className="card">
          <h2>🔴 High</h2>
          <p>{highCount}</p>
        </div>
      </div>

      {/* Search + Filter */}

      <div
        style={{
          display: "flex",
          gap: "15px",
          marginBottom: "25px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <input
          type="text"
          placeholder="🔍 Search File..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px",
            width: "250px",
            borderRadius: "8px",
            border: "none",
          }}
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "none",
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
            padding: "10px 18px",
            background: "#00c853",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          ⬇ Export JSON
        </button>
      </div>

      {/* Chart */}

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

      {/* Table */}

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
    </div>
  );
}

export default App;
