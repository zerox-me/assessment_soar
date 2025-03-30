import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import {
  Transaction,
  TransactionMethod,
  TransactionType,
} from "../../mock/types";
import { ScrollArea } from "../common/scroll-area";

const iconBgColor: Record<TransactionMethod, string> = {
  [TransactionMethod.Card]: "bg-[#FFF5D9]",
  [TransactionMethod.Paypal]: "bg-[#E7EDFF]",
  [TransactionMethod.Cash]: "bg-[#DCFAF8]",
};

const iconName: Record<TransactionMethod, string> = {
  [TransactionMethod.Card]: "icon_payment_method_card",
  [TransactionMethod.Paypal]: "icon_payment_method_paypal",
  [TransactionMethod.Cash]: "icon_payment_method_cash",
};

const TransactionItem: React.FC<Transaction> = ({
  method,
  title,
  date,
  amount,
  type,
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div
          className={`w-14 h-14 rounded-full ${iconBgColor[method]} flex items-center justify-center text-xl`}
        >
          <img src={`/images/${iconName[method]}.svg`} alt={method} />
        </div>
        <div className="ml-3">
          <p className="text-label-primary font-medium cursor-pointer hover:text-label-primary/60 transition-colors duration-300">
            {title}
          </p>
          <p className="text-sm text-label-secondary">{date}</p>
        </div>
      </div>
      <div
        className={`font-medium ${
          type === TransactionType.Deposit ? "text-[#41D4A8]" : "text-[#F24E1E]"
        }`}
      >
        {type === TransactionType.Deposit ? "+" : "-"}${amount.toLocaleString()}
      </div>
    </div>
  );
};

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
        <div className="flex flex-col gap-y-2">
          {transactions?.data.map((transaction: Transaction) => (
            <TransactionItem key={transaction.id} {...transaction} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default RecentTransactions;
