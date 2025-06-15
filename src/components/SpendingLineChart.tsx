'use client'

import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { fetchSummary } from "@/lib/api";

interface MonthlyTrend {
  month: string;
  spending: number;
}

export default function SpendingLineChart() {
  const [data, setData] = useState<MonthlyTrend[]>([]);

  useEffect(() => {
    fetchSummary().then((res) => {
      setData(res.monthly_trend || []);
    });
  }, []);

  return (
    <div className="w-full h-64 bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-2">Cumulative Spend</h2>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="spending" stroke="#3b82f6" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}