'use client'

import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';
import SummaryCard from '@/components/SummaryCard';
import SpendingLineChart from '@/components/SpendingLineChart';
import CategoryPieChart from '@/components/CategoryPieChart';
import TransactionsTable from '@/components/TransactionTable';
import { useEffect, useState } from 'react';
import { fetchSummary } from '@/lib/api';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function DashboardPage() {

    const [summary, setSummary] = useState({
        total_spend: 0,
        monthly_spend: 0,
        category_count: 0,
    });

    useEffect(() => {
        fetchSummary().then(data => setSummary(data));
    }, []);

  return (
    <ProtectedRoute>
    <div className="flex min-h-screen">
      {/* Sidebar on the left */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex flex-col flex-1 p-6 bg-white text-gray-900">
        <TopBar />

        {/* Grid: Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <SummaryCard title="Total Spend" value={`₹${summary.total_spend}`} />
          <SummaryCard title="This Month" value={`₹${summary.monthly_spend}`} />
          <SummaryCard title="Categories" value={`${summary.category_count}`} />
        </div>

        {/* Grid: Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <SpendingLineChart />
          <CategoryPieChart />
        </div>

        {/* Table: Recent Transactions */}
        <div className="mt-6">
          <TransactionsTable />
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
}