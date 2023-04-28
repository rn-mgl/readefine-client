import React from "react";
import Nav from "../../src/components/global/Nav";

export const metadata = {
  title: "Readefine | Sign Up",
  description: "Readefine Sign Up",
};

const RootLayout = ({ children }) => {
  return (
    <main>
      <div className="text-accntColor">
        <Nav />
      </div>

      {children}
    </main>
  );
};

export default RootLayout;
