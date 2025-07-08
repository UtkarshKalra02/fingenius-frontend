'use client';

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Lightbulb } from "lucide-react";

export default function InsightsPage() {
  const [markdown, setMarkdown] = useState('Fetching AI Insights...');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const token = localStorage.getItem("id_token");
        const res = await fetch('https://finance-api-teo9.onrender.com/insights', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setMarkdown(data.insights || '> No insights returned.');
      } catch (error) {
        console.error('Error fetching insights:', error);
        setMarkdown('> Error fetching insights.');
      } finally {
        setLoading(false);
      }
    };
    fetchInsights();
  }, []);

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex flex-col flex-1 p-6">
          <TopBar />

          <div className="flex items-center gap-3 mt-6 mb-4">
            <Lightbulb className="w-7 h-7 text-yellow-500" />
            <h1 className="text-2xl font-semibold text-gray-800">AI Insights</h1>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 prose max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {loading ? 'Loading AI-powered insights...' : markdown}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}