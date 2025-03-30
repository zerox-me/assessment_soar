import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useQuery } from "react-query";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const WeeklyActivity: React.FC = () => {
  const { data: weeklyActivity, status } = useQuery("weekly-activity", () => {
    return axios.get("/api/weekly-activity");
  });

  if (status === "loading") {
    return (
      <div className="bg-white p-6 rounded-2xl h-80 animate-pulse flex items-center justify-center">
        <div className="h-64 w-full bg-gray-200 rounded-3xl"></div>
      </div>
    )
  };

  if (status === "error") return <div>Error...</div>;
  
  const weeklyActivityData = {
    labels: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        label: "Withdraw",
        data: weeklyActivity?.data.withdraw,
        backgroundColor: "#232323",
        borderRadius: {
          topLeft: 15,
          topRight: 15,
          bottomLeft: 15,
          bottomRight: 15,
        },
        borderSkipped: false,
        barPercentage: 0.5,
      },
      {
        label: "Deposit",
        data: weeklyActivity?.data.deposit,
        backgroundColor: "#396AFF",
        borderRadius: {
          topLeft: 15,
          topRight: 15,
          bottomLeft: 15,
          bottomRight: 15,
        },
        borderSkipped: false,
        barPercentage: 0.5,
      },
    ],
  };

  const weeklyActivityOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 500,
        ticks: {
          stepSize: 100,
          color: "#718EBF",
        },
        grid: {
          display: true,
          drawBorder: false,
          color: "#F3F3F5",
        },
        border: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: "#718EBF",
        },
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
        align: "end" as const,
        reverse: true,
        labels: {
          boxWidth: 20,
          usePointStyle: true,
          pointStyle: "circle",
          padding: 30,
          color: "#718EBF",
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-2xl h-80">
      <div className="h-full">
        <Bar data={weeklyActivityData} options={weeklyActivityOptions} />
      </div>
    </div>
  );
};

export default WeeklyActivity;
