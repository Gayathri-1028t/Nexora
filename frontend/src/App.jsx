import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/alerts")
      .then((response) => {
        setAlerts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>🛡 Nexora Dashboard</h1>

      <h2>Recent Alerts</h2>

      {alerts.length === 0 ? (
        <p>No alerts found.</p>
      ) : (
        <ul>
          {alerts.map((alert, index) => (
            <li key={index}>
              <strong>{alert.file}</strong> - {alert.status} ({alert.time})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
