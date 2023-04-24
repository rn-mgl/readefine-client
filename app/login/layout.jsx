import React from "react";
import Nav from "../../src/components/global/Nav";

export const metadata = {
  title: "Readefine | Log In",
  description: "Readefine Log In",
};

const RootLayout = ({ children }) => {
  return (
    <main>
      <div className="text-prmColor">
        <Nav />
      </div>

      {children}
    </main>
  );
};

export default RootLayout;
