'use client';

import { useEffect, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { fetchSummary } from "@/lib/api";

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

interface CategoryData {
  name: string;
  value: number;
}

export default function CategoryPieChart() {
  const [data, setData] = useState<CategoryData[]>([]);

  useEffect(() => {
    fetchSummary().then((res) => {
      setData(res.category_breakdown || []);
    });
  }, []);

  return (
    <div className="w-full h-64 bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-2">Spending by Category</h2>
      {data.length === 0 ? (
        <p className="text-sm text-gray-500">No data available</p>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}