'use client';

import { useEffect, useState } from "react";
import { Transaction } from "@/types/Transaction";
import { fetchSummary } from "@/lib/api"; 

export default function TransactionTable() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    fetchSummary()
      .then((res) => {
        if (res?.recent_transactions) {
          setTransactions(res.recent_transactions);
        }
      })
      .catch((err) => console.error("Error fetching transactions:", err));
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-3">Recent Transactions</h2>
      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left px-3 py-2">Date</th>
            <th className="text-left px-3 py-2">Description</th>
            <th className="text-left px-3 py-2">Amount</th>
            <th className="text-left px-3 py-2">Category</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t, i) => (
            <tr key={i} className="border-t">
              <td className="px-3 py-2">{t.Date}</td>
              <td className="px-3 py-2">{t.Description}</td>
              <td className="px-3 py-2">{t.Amount}</td>
              <td className="px-3 py-2">{t.Category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}