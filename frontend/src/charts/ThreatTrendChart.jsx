import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function ThreatTrendChart({ alerts }) {
  const high = alerts.filter((a) => a.threat === "High").length;
  const medium = alerts.filter((a) => a.threat === "Medium").length;
  const low = alerts.filter((a) => a.threat === "Low").length;

  const data = [
    { threat: "Low", count: low },
    { threat: "Medium", count: medium },
    { threat: "High", count: high },
  ];

  return (
    <div
      style={{
        background: "#1e293b",
        padding: "20px",
        borderRadius: "12px",
        marginTop: "20px",
      }}
    >
      <h2>📈 Live Threat Statistics</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="threat" />
          <YAxis />
          <Tooltip />

          <Line
            type="monotone"
            dataKey="count"
            stroke="#38bdf8"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ThreatTrendChart;
