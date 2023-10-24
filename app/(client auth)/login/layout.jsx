import React from "react";
import LandingLogo from "@/components/global/LandingLogo";

export const metadata = {
  title: "Readefine | Log In",
  description: "Readefine Log In",
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
