import React from "react";
import ClientNav from "@/client/global/ClientNav";

export const metadata = {
  title: "Readefine | Archives",
  definition: "Readefine's archives.",
};

export default function RootLayout({ children }) {
  return (
    <main>
      <ClientNav />
      {children}
    </main>
  );
}
