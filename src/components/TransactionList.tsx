import { fetchSummary } from "@/lib/api";
import { useEffect, useState } from "react";
import { Transaction } from "@/types/Transaction";

export default function TransactionList() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(()=>{
    fetchSummary().then((res)=>setTransactions(res.recent_transactions || []));
  }, [])
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-sm text-gray-500 mb-4">Recent Transactions</h3>
        <ul className="space-y-4">
          {transactions.map((txn, i) => (
            <li key={i} className="flex justify-between items-center">
              <div>
                <p className="text-base text-gray-800 font-medium">{txn.Description}</p>
                <p className="text-xs text-gray-400">{txn.Date}</p>
              </div>
              <p className={`font-semibold ${txn.Amount < 0 ? 'text-red-500' : 'text-green-500'}`}>
                {txn.Amount}
              </p>
            </li>
          ))}
        </ul>
      </div>
    );
  }