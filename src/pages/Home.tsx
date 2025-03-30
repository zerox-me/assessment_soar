import React from "react";
import ExpenseStatistics from "../components/home/ExpenseStatistics";
import MyCards from "../components/home/MyCards";
import { Link } from "react-router-dom";
import RecentTransactions from "../components/home/RecentTransactions";
import WeeklyActivity from "../components/home/WeeklyActivity";
import BalanceHistory from "../components/home/BalanceHistory";
import QuickTransfer from "../components/home/QuickTransfer";

const Home: React.FC = () => {
  return (
    <div className="max-w-7xl grid grid-cols-1 gap-y-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-x-[30px] gap-y-6">
        <div className="xl:col-span-2">
          <div className="flex justify-between items-end mb-[18px]">
            <h2 className="text-[22px] font-semibold">My Cards</h2>
            <Link
              to="/credit-cards"
              className="text-base text-[#343C6A] font-medium hover:text-[#343C6A]/60 transition-colors duration-300"
            >
              See All
            </Link>
          </div>
          <MyCards />
        </div>
        <div>
          <div className="flex justify-between items-end mb-[18px]">
            <h2 className="text-[22px] font-semibold">Recent Transaction</h2>
          </div>
          <RecentTransactions />
        </div>
        <div className="xl:col-span-2">
          <h2 className="text-2xl font-semibold mb-[18px]">Weekly Activity</h2>
          <WeeklyActivity />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-[18px]">
            Expense Statistics
          </h2>
          <ExpenseStatistics />
        </div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-x-[30px] gap-y-6">
        <div className="xl:col-span-2">
          <h2 className="text-2xl font-semibold mb-[18px]">Quick Transfer</h2>
          <QuickTransfer />
        </div>
        <div className="xl:col-span-3">
          <h2 className="text-2xl font-semibold mb-[18px]">Balance History</h2>
          <BalanceHistory />
        </div>
      </div>
    </div>
  );
};

export default Home;
