import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function ThreatPieChart({ alerts }) {
  const high = alerts.filter((a) => a.threat === "High").length;
  const medium = alerts.filter((a) => a.threat === "Medium").length;
  const low = alerts.filter((a) => a.threat === "Low").length;

  const data = [
    { name: "High", value: high },
    { name: "Medium", value: medium },
    { name: "Low", value: low },
  ];

  const COLORS = ["#ef4444", "#facc15", "#22c55e"];

  return (
    <div
      style={{
        background: "#1e293b",
        padding: "20px",
        borderRadius: "12px",
        marginTop: "30px",
      }}
    >
      <h2>🥧 Threat Distribution</h2>

      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={120}
            label
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ThreatPieChart;
