import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [alerts, setAlerts] = useState([]);

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

    // Load immediately
    fetchAlerts();

    // Refresh every 5 seconds
    const interval = setInterval(fetchAlerts, 5000);

    return () => clearInterval(interval);
  }, []);

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

      <h2>Recent Alerts</h2>

      <table>
        <thead>
          <tr>
            <th>Time</th>
            <th>File</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {alerts.map((alert, index) => (
            <tr key={index}>
              <td>{alert.time}</td>
              <td>{alert.file}</td>
              <td>{alert.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
