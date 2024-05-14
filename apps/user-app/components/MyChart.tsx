"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Recent Balances",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const datas = {
  labels,
  datasets: [
    {
      label: "Account Balance",
      data: labels.map((label) => label.length),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

export const MyChart = ({ data }) => {
  const getChartData = () => {
    return {
      labels: data.map((d) => d.date),
      datasets: [
        {
          label: "Account Balance",
          data: data.map((d) => d.balance / 100),
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
    };
  };
  return <Line options={options} data={getChartData()} />;
};
