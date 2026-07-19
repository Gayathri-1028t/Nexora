import ThreatTrendChart from "../charts/ThreatTrendChart";

function Analytics() {
  return (
    <div className="container">
      <h1>📊 Security Analytics</h1>

      {/* Summary Cards */}
      <div className="cards">
        <div className="card">
          <h2>Total Threats</h2>
          <p>35</p>
        </div>

        <div className="card">
          <h2>High Threats</h2>
          <p style={{ color: "#ef4444" }}>8</p>
        </div>

        <div className="card">
          <h2>Medium Threats</h2>
          <p style={{ color: "#facc15" }}>12</p>
        </div>

        <div className="card">
          <h2>Low Threats</h2>
          <p style={{ color: "#22c55e" }}>15</p>
        </div>
      </div>

      {/* Weekly Chart */}
      <ThreatTrendChart alerts={[]} />

      {/* Analytics Insights */}
      <div
        className="card"
        style={{
          marginTop: "30px",
        }}
      >
        <h2>📈 Analytics Insights</h2>

        <ul
          style={{
            lineHeight: "2",
            marginTop: "15px",
          }}
        >
          <li>✅ Threat activity increased by 18% this week.</li>
          <li>✅ High-risk files were detected on Thursday.</li>
          <li>✅ Most alerts were classified as Low Threat.</li>
          <li>✅ System monitoring remained active 24/7.</li>
        </ul>
      </div>
    </div>
  );
}

export default Analytics;
