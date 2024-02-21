import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart } from "chart.js";
import {
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the elements, scales, and plugins
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Renewals = () => {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Data Points",
        data: [205, 423, 780, 600, 190, 700, 542], // example data
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(169,169,169,0.6)",
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "category",
      },
      y: {
        type: "linear",
        beginAtZero: true,
      },
    },
  };
  // @ts-ignore
  return <Bar data={data} options={options} />;
};

export default Renewals;
