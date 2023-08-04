import React from "react";
import LandingLogoAdmin from "@/src/src/components/global/LandingLogoAdmin";

export const metadata = {
  title: "Readefine | Forgot Password",
  description: "Readefine Forgot Password",
};

const RootLayout = ({ children }) => {
  return (
    <main>
      <div className="text-accntColor">
        <LandingLogoAdmin />
      </div>

      {children}
    </main>
  );
};

export default RootLayout;
