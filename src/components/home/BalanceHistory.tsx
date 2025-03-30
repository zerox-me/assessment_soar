import React from "react";
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
import { useQuery } from "react-query";
import axios from "axios";

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

const BalanceHistory: React.FC = () => {
  const { data: balanceHistory, status } = useQuery({
    queryKey: ["balance-history"],
    queryFn: () => axios.get("/api/balance-history"),
  });

  if (status === "loading") {
    return (
      <div className="bg-white p-6 rounded-2xl h-64 animate-pulse flex items-center justify-center">
        <div className="h-52 w-full bg-gray-200 rounded-3xl"></div>
      </div>
    )
  };

  if (status === "error") return <div>Error...</div>;

  const balanceHistoryData = {
    labels: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan"],
    datasets: [
      {
        label: "Balance",
        data: balanceHistory?.data,
        fill: true,
        borderColor: "#1814F3",
        backgroundColor: (context: any) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            return null;
          }
          const gradient = ctx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom
          );
          gradient.addColorStop(0, "rgba(45, 96, 255, 0.5)");
          gradient.addColorStop(1, "rgba(45, 96, 255, 0.0)");
          return gradient;
        },
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  };

  const balanceHistoryOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 800,
        ticks: {
          stepSize: 200,
          color: "#718EBF",
        },
        border: {
          display: false,
          dash: [6, 6],
          dashOffset: 6,
          color: "#DFE5EE",
        },
        grid: {
          color: "#DFE5EE",
          tickBorderDash: [5, 5],
        },
      },
      x: {
        border: {
          display: false,
          dash: [6, 6],
          dashOffset: 6,
        },
        grid: {
          color: "#DFE5EE",
          tickBorderDash: [5, 5],
        },
        ticks: {
          color: "#718EBF",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-2xl lg:col-span-2 h-64">
      <div className="h-full">
        <Line data={balanceHistoryData} options={balanceHistoryOptions} />
      </div>
    </div>
  );
};

export default BalanceHistory;
