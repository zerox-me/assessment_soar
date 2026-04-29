import React from "react";
import {
  Transaction,
  TransactionMethod,
  TransactionType,
} from "../../mock/types";

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

export const TransactionRow: React.FC<Transaction> = ({
  method,
  title,
  date,
  amount,
  type,
}) => (
  <div className="flex items-center justify-between py-3 first:pt-0 last:pb-0 border-b border-input-border last:border-b-0">
    <div className="flex items-center min-w-0">
      <div
        className={`shrink-0 w-14 h-14 rounded-full ${iconBgColor[method]} flex items-center justify-center text-xl`}
      >
        <img src={`/images/${iconName[method]}.svg`} alt={method} />
      </div>
      <div className="ml-3 min-w-0">
        <p className="text-label-primary font-medium truncate">{title}</p>
        <p className="text-sm text-label-secondary">{date}</p>
      </div>
    </div>
    <div
      className={`shrink-0 ml-2 font-medium tabular-nums ${
        type === TransactionType.Deposit ? "text-[#41D4A8]" : "text-[#F24E1E]"
      }`}
    >
      {type === TransactionType.Deposit ? "+" : "-"}${amount.toLocaleString()}
    </div>
  </div>
);
