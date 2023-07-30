import React from "react";
import LandingLogo from "@/src/src/components/global/LandingLogo";

export const metadata = {
  title: "Readefine | Sending",
};

export default function RootLayout({ children }) {
  return (
    <main>
      <div className="text-prmColor">
        <LandingLogo />
      </div>

      {children}
    </main>
  );
}
