'use client';

import { useEffect, useState } from "react";
import { fetchSummary } from "@/lib/api";

export default function BalanceCard() {
  const [balance, setBalance] = useState(0);
  const [monthly, setMonthly] = useState(0);

  useEffect(() => {
    fetchSummary().then((res) => {
      setBalance(res.total_spend || 0);
      setMonthly(res.monthly_spend || 0);
    });
  }, []);

  const previousMonth = balance - monthly;
  const percentageChange =
    previousMonth > 0 ? ((monthly / previousMonth) * 100 - 100).toFixed(2) : "0";

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm col-span-2">
      <h3 className="text-sm text-gray-500">My Balance</h3>
      <p className="text-4xl font-bold text-gray-800 mt-2">₹{balance.toLocaleString()}</p>
      <p className={`text-sm mt-1 ${monthly >= previousMonth ? 'text-green-500' : 'text-red-500'}`}>
        {monthly >= previousMonth ? '+' : '-'}
        {percentageChange}% from last month
      </p>
    </div>
  );
}