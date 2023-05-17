import React from "react";
import LogoAdmin from "../../src/components/global/LogoAdmin";

export const metadata = {
  title: "Readefine | Log In",
  description: "Readefine Log In",
};

const RootLayout = ({ children }) => {
  return (
    <main>
      <div className="text-accntColor">
        <LogoAdmin />
      </div>
      {children}
    </main>
  );
};

export default RootLayout;
