import axios from "axios";
import React, { useMemo, useState } from "react";
import { useQuery } from "react-query";
import { Transaction, TransactionType } from "../mock/types";
import { TransactionRow } from "../components/transactions/TransactionRow";
import { ScrollArea } from "../components/common/scroll-area";
import { MdSearch } from "react-icons/md";

type Filter = "all" | "deposit" | "withdraw";

const Transactions: React.FC = () => {
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");

  const { data, status } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => axios.get<Transaction[]>("/api/transactions"),
  });

  const transactions = data?.data ?? [];

  const filtered = useMemo(() => {
    let list = transactions;
    if (filter === "deposit") {
      list = list.filter((t) => t.type === TransactionType.Deposit);
    } else if (filter === "withdraw") {
      list = list.filter((t) => t.type === TransactionType.Withdraw);
    }
    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter((t) => t.title.toLowerCase().includes(q));
    }
    return list;
  }, [transactions, filter, search]);

  const totals = useMemo(() => {
    let deposits = 0;
    let withdrawals = 0;
    for (const t of transactions) {
      if (t.type === TransactionType.Deposit) deposits += t.amount;
      else withdrawals += t.amount;
    }
    return { deposits, withdrawals };
  }, [transactions]);

  const filterButton = (key: Filter, label: string) => (
    <button
      type="button"
      key={key}
      onClick={() => setFilter(key)}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
        filter === key
          ? "bg-label-title text-white"
          : "bg-label-icon text-label-secondary hover:text-label-primary"
      }`}
    >
      {label}
    </button>
  );

  if (status === "loading") {
    return (
      <div className="max-w-7xl space-y-6 animate-pulse">
        <div className="h-9 w-48 rounded-lg bg-gray-200" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="h-24 rounded-3xl bg-gray-200" />
          <div className="h-24 rounded-3xl bg-gray-200" />
        </div>
        <div className="bg-white rounded-3xl p-6 h-96">
          <div className="space-y-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-14 h-14 rounded-full bg-gray-200" />
                <div className="flex-1 h-14 rounded-lg bg-gray-200" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="max-w-7xl">
        <h1 className="text-2xl font-semibold text-label-title mb-2">Transactions</h1>
        <p className="text-label-secondary">Could not load transactions. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-label-title">Transactions</h1>
        <p className="text-label-secondary mt-1">
          View deposits and withdrawals across your payment methods.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-3xl p-6 border border-input-border/60">
          <p className="text-sm text-label-secondary mb-1">Total deposits</p>
          <p className="text-2xl font-semibold text-[#41D4A8] tabular-nums">
            +${totals.deposits.toLocaleString()}
          </p>
        </div>
        <div className="bg-white rounded-3xl p-6 border border-input-border/60">
          <p className="text-sm text-label-secondary mb-1">Total withdrawals</p>
          <p className="text-2xl font-semibold text-[#F24E1E] tabular-nums">
            -${totals.withdrawals.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-input-border/60">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {filterButton("all", "All")}
            {filterButton("deposit", "Deposits")}
            {filterButton("withdraw", "Withdrawals")}
          </div>
          <div className="relative w-full lg:w-72">
            <MdSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-input-secondary"
              size={20}
            />
            <input
              type="search"
              placeholder="Search by description"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-input-border bg-label-icon placeholder-input-placeholder focus:outline-none focus:ring-2 focus:ring-input-focus focus:border-transparent text-sm"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-label-secondary py-12">No transactions match your filters.</p>
        ) : (
          <ScrollArea className="h-[min(28rem,calc(100vh-22rem))]">
            <div className="pr-4">
              {filtered.map((transaction) => (
                <TransactionRow key={transaction.id} {...transaction} />
              ))}
            </div>
          </ScrollArea>
        )}
      </div>
    </div>
  );
};

export default Transactions;
