import type { Metadata } from "next";
import {Manrope, Merriweather } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";


const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});



export const metadata: Metadata = {
  title: "FinGenius",
  description: "Your AI-powered personal finance assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={manrope.variable}>
      <body
        className="font-sans bg-gray-100 text-gray-900"
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
