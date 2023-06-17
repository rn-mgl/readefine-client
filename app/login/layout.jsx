import React, { Suspense } from "react";
import Logo from "../../src/components/global/Logo";

export const metadata = {
  title: "Readefine | Log In",
  description: "Readefine Log In",
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
