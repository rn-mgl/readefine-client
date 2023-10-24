"use client";
import "./globals.css";
import React from "react";
import { Mukta, Poppins, Lato } from "next/font/google";
import { AppProvider } from "@/base/context";
import { SessionProvider } from "next-auth/react";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "auto",
  subsets: ["latin"],
  variable: "--font-poppins",
});

const mukta = Mukta({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  display: "fallback",
  subsets: ["latin"],
  variable: "--font-mukta",
});

const lato = Lato({
  weight: ["100", "300", "400", "700", "900"],
  display: "fallback",
  subsets: ["latin"],
  variable: "--font-lato",
});

export default function RootLayout({ children, session }) {
  return (
    <AppProvider>
      <html
        lang="en"
        className={`${poppins.variable} ${mukta.variable} ${lato.variable} font-poppins transition-all cstm-scrollbar scroll-smooth`}
      >
        <SessionProvider session={session}>
          <body>{children}</body>
        </SessionProvider>
      </html>
    </AppProvider>
  );
}
