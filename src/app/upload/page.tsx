'use client'

import { useState } from 'react';
import Papa, { ParseResult } from 'papaparse';
import toast, { Toaster } from 'react-hot-toast';
import { UploadCloud, Table, Bot } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import ProtectedRoute from '@/components/ProtectedRoute';

// Required headers to validate the CSV file
const REQUIRED_HEADERS = ['Date', 'Description', 'Amount', 'Category'];

type Transaction = {
  [key: string]: string | number;
};

export default function UploadPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [useAi, setUseAi] = useState(true);

  // ✅ Sends parsed transactions to FastAPI backend
  const sendToBackend = async (data: Transaction[]) => {
    try {
      const token = localStorage.getItem("id_token");

      if (!token) {
        toast.error("❌ Not logged in! Please login first.");
        return;
      }

      const response = await fetch("https://finance-api-teo9.onrender.com/parse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // ✅ Send ID token to backend
        },
        body: JSON.stringify({ data, useAi }),
      });

      const resJson = await response.json();

      if (response.ok) {
        toast.success(`✅ Sent to backend successfully! (${resJson.count} entries)`);
      } else {
        toast.error(`❌ Backend error: ${resJson.detail || "Unknown error"}`);
      }
    } catch (err) {
      console.error(err);
      toast.error("❌ Network or server error");
    }
  };

  // ✅ Handles file input and parses CSV
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse<Transaction>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results: ParseResult<Transaction>) => {
        const headers = results.meta.fields || [];
        const isValid = REQUIRED_HEADERS.every((h) => headers.includes(h));

        if (!isValid) {
          toast.error('⚠️ Invalid CSV headers. Required: Date, Description, Amount, Category');
          setTransactions([]);
          return;
        }

        setTransactions(results.data);
        toast.success('✅ CSV uploaded and parsed successfully!');
        sendToBackend(results.data);
      },
      error: () => toast.error('❌ Failed to parse CSV file'),
    });
  };

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Upload Area */}
        <div className="flex-1 px-8 py-10 text-gray-900">
          <Toaster position="top-right" />

          <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <UploadCloud className="w-6 h-6 text-blue-600" /> Upload Transactions
          </h1>

          {/* AI Toggle */}
          <div className='flex items-center gap-3 mb-4'>
            <Bot className='w-5 h-5 text-blue-600' />
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type='checkbox'
                checked={useAi}
                onChange={(e) => setUseAi(e.target.checked)}
                className='sr-only peer' />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 transition-colors"></div>
              <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform peer-checked:translate-x-full"></div>
            </label>
            <span className="text-sm text-gray-700 select-none">Enable Smart Categorization</span>
          </div>

          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="mb-2 border p-2 rounded w-full max-w-sm text-sm file:py-2 file:px-4 file:border-0 file:bg-blue-100 file:text-blue-800 file:rounded-md file:font-semibold hover:file:bg-blue-200"
          />

          <p className="text-sm text-gray-500 mb-6">
            Upload a CSV with headers: <strong>Date, Description, Amount, Category</strong>
          </p>

          {/* Table Preview */}
          {transactions.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
                <Table className="w-5 h-5 text-gray-700" /> Preview
              </h2>
              <div className="overflow-x-auto rounded-md border border-gray-200 shadow-sm">
                <table className="min-w-full text-sm divide-y divide-gray-200">
                  <thead className="bg-gray-100 text-gray-800">
                    <tr>
                      {Object.keys(transactions[0]).map((key) => (
                        <th key={key} className="px-4 py-2 text-left font-medium">
                          {key}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {transactions.map((txn, i) => (
                      <tr key={i} className="hover:bg-gray-50">
                        {Object.values(txn).map((val, j) => (
                          <td key={j} className="px-4 py-2">
                            {val}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div >
    </ProtectedRoute>
  );
}