import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import DataLabelsPlugin from "chartjs-plugin-datalabels";
import { Pie } from "react-chartjs-2";
import { useQuery } from "react-query";
import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseStatistics: React.FC = () => {
  const { data: expenseStatistics, status } = useQuery("expense-statistics", () => {
    return axios.get("/api/expense-statistics");
  });

  if (status === "loading") {
    return (
      <div className="bg-white p-6 rounded-2xl h-80 animate-pulse flex items-center justify-center">
        <div className="h-64 w-64 bg-gray-200 rounded-full"></div>
      </div>
    )
  }

  if (status === "error") return <div>Error...</div>;

  const expenseData = {
    labels: ["Investment", "Entertainment", "Bill Expense", "Others"],
    datasets: [
      {
        data: expenseStatistics?.data,
        backgroundColor: [
          "#396AFF", // Investment
          "#343C6A", // Entertainment
          "#FC7900", // Bill Expense
          "#232323", // Others
        ],
        borderWidth: 0,
        offset: [0, 20, 40, 20],
        radius: 110,
        hoverOffset: 60,
      },
    ],
  };

  const expenseOptions = {
    responsive: true,
    maintainAspectRatio: false,
    rotation: 180,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
      datalabels: {
        color: "#FFFFFF",
        font: {
          size: 12,
          weight: "bold" as const,
        },
        formatter: (value: number, ctx: any) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return `${value}%\n${label}`;
        },
        align: "end" as const,
        anchor: "center" as const,
        textAlign: "center" as const,
      },
    },
    layout: {
      padding: 20,
    },
  };

  return (
    <div className="bg-white p-6 rounded-2xl h-80">
      <div className="h-full">
        <Pie
          data={expenseData}
          options={expenseOptions}
          plugins={[DataLabelsPlugin]}
        />
      </div>
    </div>
  );
};

export default ExpenseStatistics;
