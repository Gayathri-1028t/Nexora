import { useEffect, useState } from "react";
import axios from "axios";
import ThreatTrendChart from "../charts/ThreatTrendChart";

function Analytics() {
  const [alerts, setAlerts] = useState([]);

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

  const high = alerts.filter((a) => a.threat === "High").length;
  const medium = alerts.filter((a) => a.threat === "Medium").length;
  const low = alerts.filter((a) => a.threat === "Low").length;

  return (
    <div className="container">
      <h1>📊 Security Analytics</h1>

      <div className="cards">
        <div className="card">
          <h2>Total Alerts</h2>
          <p>{alerts.length}</p>
        </div>

        <div className="card">
          <h2>High Threats</h2>
          <p style={{ color: "#ef4444" }}>{high}</p>
        </div>

        <div className="card">
          <h2>Medium Threats</h2>
          <p style={{ color: "#facc15" }}>{medium}</p>
        </div>

        <div className="card">
          <h2>Low Threats</h2>
          <p style={{ color: "#22c55e" }}>{low}</p>
        </div>
      </div>

      <ThreatTrendChart alerts={alerts} />

      <div
        className="card"
        style={{
          marginTop: "30px",
        }}
      >
        <h2>📈 Live Analytics</h2>

        <p>
          Analytics are updated automatically every 5 seconds from the FastAPI
          backend.
        </p>
      </div>
    </div>
  );
}

export default Analytics;
