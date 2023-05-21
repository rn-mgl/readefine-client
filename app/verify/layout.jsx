import React from "react";
import Logo from "../../src/components/global/Logo";

export const metadata = {
  title: "Readefine | Verify",
};

export default function RootLayout({ children }) {
  return (
    <main>
      <div className="text-prmColor">
        <Logo />
      </div>

      {children}
    </main>
  );
}
