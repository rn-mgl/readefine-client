import { Mukta, Poppins, Lato } from "next/font/google";
import "./globals.css";
import React from "react";

export const metadata = {
  title: "Readefine",
  description:
    "An approach to developing the reading comprehension skills of elementary students in the contemporary world.",
};

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

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${mukta.variable} ${lato.variable} font-poppins transition-all cstm-scrollbar`}
    >
      <body>{children}</body>
    </html>
  );
}
