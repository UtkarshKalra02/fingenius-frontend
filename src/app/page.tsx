"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "react-oidc-context";
import AuthButtons from "@/components/ui/AuthButtons";
import Image from "next/image";
import {
  LayoutDashboard,
  Bot,
  UploadCloud
} from "lucide-react"; // icons for nav
import img1 from '/Users/utkarshkalra/Desktop/WebDev/finance-mentor/frontend/public/img1.jpg';

interface StatCard {
  label: string;
  value: string;
  helpText: string;
}

export default function LandingPage() {
  const [stats, setStats] = useState<StatCard[]>([]);
  const auth = useAuth();

  useEffect(() => {
    setStats([
      { label: "Happy Users", value: "5K+", helpText: "tracking monthly budgets" },
      { label: "Months Active", value: "18", helpText: "of seamless insights" },
      { label: "Transactions", value: "120K+", helpText: "processed securely" },
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-[#0B1222] text-white">
      {/* Navbar */}
      <header className="flex items-center justify-between px-8 py-4">
        <h1 className="text-2xl font-bold text-blue-400">FinGenius</h1>

        <div className="flex items-center gap-4">
          {auth.isAuthenticated && (
            <>
              <Link
                href="/dashboard"
                className="flex items-center gap-1 text-sm text-gray-200 hover:text-blue-400 transition"
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>
              <Link
                href="/chat"
                className="flex items-center gap-1 text-sm text-gray-200 hover:text-blue-400 transition"
              >
                <Bot className="w-4 h-4" />
                Chat
              </Link>
              <Link
                href="/upload"
                className="flex items-center gap-1 text-sm text-gray-200 hover:text-blue-400 transition"
              >
                <UploadCloud className="w-4 h-4" />
                Upload
              </Link>
            </>
          )}
          <AuthButtons />
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center px-8 py-20 gap-10">
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-4xl font-extrabold text-white">
            Your Financial Goals, <span className="text-blue-400">Our Guidance</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-md">
            Finance Mentor empowers you with real-time spending insights, personalized budgeting,
            and AI-driven recommendations so you can build lasting wealth—no spreadsheets needed.
          </p>
        </div>

        <div className="md:w-1/2 flex justify-center">
          <div className="relative w-80 h-80">
            <Image src={img1} alt="Finance Mentor" className="rounded-2xl object-cover" fill />
            <div className="absolute -top-5 -left-5 w-24 h-24 bg-blue-500 opacity-20 rounded-full" />
            <div className="absolute -bottom-5 -right-5 w-32 h-32 bg-blue-400 opacity-20 rounded-full" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="features" className="px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-[#1A2238] p-6 rounded-2xl shadow-xl flex flex-col items-start"
            >
              <p className="text-sm text-gray-400">{s.helpText}</p>
              <h3 className="mt-2 text-3xl font-bold text-white">{s.value}</h3>
              <span className="mt-auto text-blue-400 font-medium">{s.label}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}