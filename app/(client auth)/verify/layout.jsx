import React from "react";
import LandingLogo from "@/components/global/LandingLogo";

export const metadata = {
  title: "Readefine | Verify",
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
