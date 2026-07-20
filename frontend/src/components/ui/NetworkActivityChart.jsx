import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import ChartCard from "./ChartCard";
import { Activity } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function NetworkActivityChart() {
  const data = {
    labels: ["13:00", "13:10", "13:20", "13:30", "13:40", "13:50", "14:00"],
    datasets: [
      {
        label: "Ingress (Gb/s)",
        data: [1.2, 1.6, 1.3, 1.8, 1.4, 2.1, 1.9],
        borderColor: "#00E5FF",
        backgroundColor: "rgba(0, 229, 255, 0.08)",
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointBackgroundColor: "#00E5FF",
        pointBorderColor: "#050816",
        pointHoverRadius: 6,
      },
      {
        label: "Egress (Gb/s)",
        data: [0.8, 1.1, 0.9, 1.2, 1.0, 1.4, 1.2],
        borderColor: "#7C3AED",
        backgroundColor: "rgba(124, 58, 237, 0.05)",
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointBackgroundColor: "#7C3AED",
        pointBorderColor: "#050816",
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "#94A3B8",
          font: {
            family: "'Orbitron', sans-serif",
            size: 10,
          },
          boxWidth: 12,
        },
      },
      tooltip: {
        backgroundColor: "rgba(8, 12, 32, 0.9)",
        borderColor: "rgba(0, 229, 255, 0.2)",
        borderWidth: 1,
        titleColor: "#00E5FF",
        titleFont: {
          family: "'Orbitron', sans-serif",
        },
        bodyColor: "#F8FAFC",
        bodyFont: {
          family: "'Inter', sans-serif",
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.03)",
        },
        ticks: {
          color: "#64748B",
          font: {
            family: "'Orbitron', sans-serif",
            size: 9,
          },
        },
      },
      y: {
        grid: {
          color: "rgba(255, 255, 255, 0.03)",
        },
        ticks: {
          color: "#64748B",
          font: {
            family: "'Orbitron', sans-serif",
            size: 9,
          },
        },
      },
    },
  };

  return (
    <ChartCard
      title="NETWORK ACTIVITY STREAM"
      subtitle="Ingress & egress telemetry monitoring"
      icon={Activity}
      glow="secondary"
      style={{
        flex: "1 1 320px",
        height: "100%",
      }}
    >
      <div style={{ height: "280px", position: "relative" }}>
        <Line data={data} options={options} />
      </div>
    </ChartCard>
  );
}

export default NetworkActivityChart;
