'use client';

import ProtectedRoute from "@/components/ProtectedRoute";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";


export default function InsightsPage() {
  const [markdown, setMarkdown] = useState('Fetching AI Insights...');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const token - localStorage.getItem("id_token");
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
      }
      finally {
        setLoading(false);
      }
    };
    fetchInsights();
  }, []);

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex flex-col flex-1 p-6 bg-white text-gray-900">
          <TopBar />
          <h1 className="text-3xl font-bold mb-4">💡 AI Insights</h1>

          <div className="prose max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {loading ? 'Loading...' : markdown}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}