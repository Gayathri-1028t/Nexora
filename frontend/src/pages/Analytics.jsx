import { useEffect, useMemo, useState } from "react";
import axios from "axios";

import ThreatTrendChart from "../charts/ThreatTrendChart";
import ThreatPieChart from "../charts/ThreatPieChart";
import ThreatBarChart from "../charts/ThreatBarChart";
import ExportCSV from "../components/ExportCSV";

function Analytics() {
  const [alerts, setAlerts] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

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

  // Search + Threat + Date Filter
  const filteredAlerts = useMemo(() => {
    return alerts.filter((alert) => {
      const matchSearch = alert.file
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchFilter = filter === "All" || alert.threat === filter;

      // Adjust this if backend sends a different date format
      const alertDate = alert.time ? alert.time.slice(0, 10) : "";

      const matchFrom = !fromDate || alertDate >= fromDate;

      const matchTo = !toDate || alertDate <= toDate;

      return matchSearch && matchFilter && matchFrom && matchTo;
    });
  }, [alerts, search, filter, fromDate, toDate]);

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
          marginBottom: "20px",
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

      {/* Date Filter */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          marginBottom: "20px",
        }}
      >
        <div>
          <label>📅 From Date</label>
          <br />
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "8px",
            }}
          />
        </div>

        <div>
          <label>📅 To Date</label>
          <br />
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "8px",
            }}
          />
        </div>
      </div>

      {/* Export CSV */}
      <div
        style={{
          marginBottom: "25px",
        }}
      >
        <ExportCSV alerts={filteredAlerts} />
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

        <p>🔍 Search, Threat Filter & Date Filter Enabled</p>
      </div>
    </div>
  );
}

export default Analytics;
