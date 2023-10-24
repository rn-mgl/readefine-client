import React from "react";
import LandingLogo from "@/components/global/LandingLogo";

export const metadata = {
  title: "Readefine | Forgot Password",
  description: "Readefine Forgot Password",
};

const RootLayout = ({ children }) => {
  return (
    <main>
      <div className="text-prmColor">
        <LandingLogo />
      </div>

      {children}
    </main>
  );
};

export default RootLayout;
