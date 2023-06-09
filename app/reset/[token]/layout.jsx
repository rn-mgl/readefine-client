import React from "react";
import Logo from "../../../src/components/global/Logo";

export const metadata = {
  title: "Readefine | Forgot Password",
  description: "Readefine Forgot Password",
};

const RootLayout = ({ children }) => {
  return (
    <main>
      <div className="text-prmColor">
        <Logo />
      </div>

      {children}
    </main>
  );
};

export default RootLayout;
