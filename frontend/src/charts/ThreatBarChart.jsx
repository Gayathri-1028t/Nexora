import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function ThreatBarChart({ alerts }) {
  const high = alerts.filter((a) => a.threat === "High").length;
  const medium = alerts.filter((a) => a.threat === "Medium").length;
  const low = alerts.filter((a) => a.threat === "Low").length;

  const data = [
    { threat: "High", count: high },
    { threat: "Medium", count: medium },
    { threat: "Low", count: low },
  ];

  return (
    <div
      style={{
        background: "#1e293b",
        padding: "20px",
        borderRadius: "12px",
        marginTop: "30px",
      }}
    >
      <h2>📊 Threat Comparison</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="threat" />

          <YAxis />

          <Tooltip />

          <Bar dataKey="count" fill="#38bdf8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ThreatBarChart;
