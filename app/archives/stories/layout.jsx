import React from "react";
import Logo from "@/src/src/components/global/Logo";
import ClientNav from "@/src/src/client/global/ClientNav";

export const metadata = {
  title: "Readefine | Stories",
  definition: "Readefine's stories.",
};

export default function RootLayout({ children }) {
  return (
    <main>
      <div className="text-prmColor">
        <Logo />
      </div>
      <ClientNav />
      {children}
    </main>
  );
}
