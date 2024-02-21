import { Bar } from "react-chartjs-2";
import React from "react";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ChartTitle,
  Tooltip,
  Legend,
  Filler
);

interface LeastUsedAppsData {
  icon: React.FC<any>;
  name: String;
  value: Number;
}

function SortMostUsedApps({ icon, name, value }: LeastUsedAppsData) {}

export default function LeastUsedApps() {
  const data = {
    labels: ["Atlassian", "Gsuite", "Figma", "Intercom", "Tableau"],
    datasets: [
      {
        label: "5 Least Used Apps",
        data: [672, 504, 372, 103, 98],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    scales: {
      x: {
        type: "linear",
        beginAtZero: true,
      },
      y: {
        type: "category",
      },
    },
  };
  // @ts-ignore
  return <Bar data={data} options={options} />;
}
