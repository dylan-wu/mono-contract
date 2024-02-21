import { Doughnut } from 'react-chartjs-2';
import React from "react";
import { Chart, CategoryScale, LinearScale, ArcElement, Title, Tooltip, Legend } from 'chart.js';

// Register the elements, scales, and plugins
Chart.register(CategoryScale, LinearScale, ArcElement, Title, Tooltip, Legend);

export default function MostUsedApps() {
  const data = {
    labels: [
      "Operation",
      "Design",
      "Human Resource",
      "Developer Tools",
      "IT & Security",
      "Analytics & BI",
      "Sales & Marketing",
    ],
    datasets: [
      {
        label: "Department Utilization",
        data: [35, 20, 5, 15, 10, 10, 5],
        backgroundColor: [
          "rgba(255, 99, 132)",
          "rgba(54, 162, 235)",
          "rgba(255, 206, 86)",
          "rgba(75, 192, 192)",
          "rgba(153, 102, 255)",
          "rgba(255, 159, 64)",
          'rgb(183, 99, 142)',
        ],
        hoverOffset: 4
      },
    ],
  };
  // @ts-ignore
  return <Doughnut data={data} />;
}
