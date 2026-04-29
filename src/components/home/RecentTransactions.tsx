import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { Transaction } from "../../mock/types";
import { ScrollArea } from "../common/scroll-area";
import { TransactionRow } from "../transactions/TransactionRow";

const RecentTransactions: React.FC = () => {
  const { data: transactions, status } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => axios.get("/api/transactions"),
  });

  if (status === "loading") {
    return (
      <div className="bg-white rounded-3xl p-6 animate-pulse">
        <div className="flex flex-col gap-y-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <div className="flex items-center justify-between gap-2" key={index}>
              <div>
                <div
                  className={`w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center text-xl`}
                ></div>
              </div>
              <div
                className={`w-full h-14 rounded-lg bg-gray-200 flex items-center justify-center text-xl`}
              ></div>
              <div
                className={`w-20 h-14 rounded-lg bg-gray-200 flex items-center justify-center text-xl`}
              ></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (status === "error") return <div>Error...</div>;

  return (
    <div className="bg-white rounded-3xl p-6">
      <ScrollArea className="h-48">
        <div className="flex flex-col pr-4">
          {transactions?.data.map((transaction: Transaction) => (
            <TransactionRow key={transaction.id} {...transaction} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default RecentTransactions;
