// import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import ExpenseStatistics from "../components/home/ExpenseStatistics";
import MyCards from "../components/home/MyCards";
import RecentTransactions from "../components/home/RecentTransactions";
import WeeklyActivity from "../components/home/WeeklyActivity";
import BalanceHistory from "../components/home/BalanceHistory";
import QuickTransfer from "../components/home/QuickTransfer";
// import { UserContext } from "../context/context";
// import { useQuery } from "react-query";

const Home: React.FC = () => {
  // const { updateUser } = useContext(UserContext);

  // useQuery({
  //   queryKey: ["user"],
  //   queryFn: () => axios.get("/api/user"),
  //   onSuccess: (fetchedData) => {
  //     updateUser(fetchedData.data); // Assuming fetchedData.data is the user info
  //   },
  // });

  return (
    <div className="max-w-7xl grid grid-cols-1 gap-y-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-x-8 gap-y-6">
        <div className="xl:col-span-2">
          <div className="flex justify-between items-end mb-4">
            <h2 className="text-2xl font-semibold text-label-title">My Cards</h2>
            <Link
              to="/credit-cards"
              className="text-base text-label-title font-medium hover:text-label-title/60 transition-colors duration-300"
            >
              See All
            </Link>
          </div>
          <MyCards />
        </div>
        <div>
          <div className="flex justify-between items-end mb-4">
            <h2 className="text-2xl font-semibold text-label-title">Recent Transaction</h2>
          </div>
          <RecentTransactions />
        </div>
        <div className="xl:col-span-2">
          <h2 className="text-2xl font-semibold mb-4 text-label-title text-label-title">Weekly Activity</h2>
          <WeeklyActivity />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-label-title">
            Expense Statistics
          </h2>
          <ExpenseStatistics />
        </div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-x-8 gap-y-6">
        <div className="xl:col-span-2">
          <h2 className="text-2xl font-semibold mb-4 text-label-title">Quick Transfer</h2>
          <QuickTransfer />
        </div>
        <div className="xl:col-span-3">
          <h2 className="text-2xl font-semibold mb-4 text-label-title">Balance History</h2>
          <BalanceHistory />
        </div>
      </div>
    </div>
  );
};

export default Home;
