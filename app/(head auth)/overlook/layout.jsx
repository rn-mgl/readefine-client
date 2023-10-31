import React from "react";
import LandingLogoHead from "@/components/global/LandingLogoHead";

export const metadata = {
  title: "Readefine | Forgot Password",
  description: "Readefine Forgot Password",
};

const RootLayout = ({ children }) => {
  return (
    <main>
      <div className="text-prmColor">
        <LandingLogoHead />
      </div>

      {children}
    </main>
  );
};

export default RootLayout;
