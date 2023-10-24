import React from "react";
import LandingLogo from "@/components/global/LandingLogo";

export const metadata = {
  title: "Readefine | Sign Up",
  description: "Readefine Sign Up",
};

const RootLayout = ({ children }) => {
  return (
    <main>
      <div className="text-accntColor">
        <LandingLogo />
      </div>

      {children}
    </main>
  );
};

export default RootLayout;
