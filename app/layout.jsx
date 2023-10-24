"use client";
import "./globals.css";
import React from "react";
import { Poppins } from "next/font/google";
import { AppProvider } from "@/base/context";
import { SessionProvider } from "next-auth/react";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "auto",
  subsets: ["latin"],
  variable: "--font-poppins",
});

export default function RootLayout({ children, session }) {
  return (
    <AppProvider>
      <html lang="en" className={`${poppins.variable} font-poppins transition-all cstm-scrollbar scroll-smooth`}>
        <SessionProvider session={session}>
          <body>{children}</body>
        </SessionProvider>
      </html>
    </AppProvider>
  );
}
