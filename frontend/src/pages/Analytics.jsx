import { useEffect, useMemo, useState } from "react";
import axios from "axios";

import ThreatTrendChart from "../charts/ThreatTrendChart";
import ThreatPieChart from "../charts/ThreatPieChart";
import ThreatBarChart from "../charts/ThreatBarChart";

function Analytics() {
  const [alerts, setAlerts] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const fetchAlerts = () => {
      axios
        .get("http://127.0.0.1:8000/alerts")
        .then((res) => setAlerts(res.data))
        .catch((err) => console.log(err));
    };

    fetchAlerts();

    const interval = setInterval(fetchAlerts, 5000);

    return () => clearInterval(interval);
  }, []);

  // Search + Threat Filter
  const filteredAlerts = useMemo(() => {
    return alerts.filter((alert) => {
      const matchSearch = alert.file
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchFilter = filter === "All" ? true : alert.threat === filter;

      return matchSearch && matchFilter;
    });
  }, [alerts, search, filter]);

  const high = filteredAlerts.filter((a) => a.threat === "High").length;

  const medium = filteredAlerts.filter((a) => a.threat === "Medium").length;

  const low = filteredAlerts.filter((a) => a.threat === "Low").length;

  return (
    <div className="container">
      <h1>📊 Security Analytics</h1>

      {/* Search */}
      <div
        style={{
          marginTop: "20px",
          marginBottom: "15px",
        }}
      >
        <input
          type="text"
          placeholder="🔍 Search File..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
          }}
        />
      </div>

      {/* Threat Filter */}
      <div
        style={{
          marginBottom: "25px",
        }}
      >
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{
            width: "220px",
            padding: "12px",
            borderRadius: "8px",
          }}
        >
          <option value="All">All Threats</option>
          <option value="High">🔴 High</option>
          <option value="Medium">🟡 Medium</option>
          <option value="Low">🟢 Low</option>
        </select>
      </div>

      {/* Summary Cards */}
      <div className="cards">
        <div className="card">
          <h2>Total Alerts</h2>
          <p>{filteredAlerts.length}</p>
        </div>

        <div className="card">
          <h2 style={{ color: "#ef4444" }}>🔴 High</h2>
          <p>{high}</p>
        </div>

        <div className="card">
          <h2 style={{ color: "#facc15" }}>🟡 Medium</h2>
          <p>{medium}</p>
        </div>

        <div className="card">
          <h2 style={{ color: "#22c55e" }}>🟢 Low</h2>
          <p>{low}</p>
        </div>
      </div>

      {/* Charts */}
      <ThreatTrendChart alerts={filteredAlerts} />

      <ThreatPieChart alerts={filteredAlerts} />

      <ThreatBarChart alerts={filteredAlerts} />

      {/* Live Analytics */}
      <div
        className="card"
        style={{
          marginTop: "30px",
        }}
      >
        <h2>📈 Live Analytics Summary</h2>

        <p>
          <strong>Total Alerts:</strong> {filteredAlerts.length}
        </p>

        <p>
          <strong>High Threats:</strong> {high}
        </p>

        <p>
          <strong>Medium Threats:</strong> {medium}
        </p>

        <p>
          <strong>Low Threats:</strong> {low}
        </p>

        <hr style={{ margin: "20px 0" }} />

        <p>🔄 Auto Refresh: Every 5 seconds</p>

        <p>📡 Connected to FastAPI Backend</p>

        <p>🔍 Search and Threat Filter Enabled</p>
      </div>
    </div>
  );
}

export default Analytics;
