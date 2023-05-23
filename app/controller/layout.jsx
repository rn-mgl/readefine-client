"use client";
import React from "react";
import AdminNav from "../../src/admin/global/AdminNav";
import { SessionProvider } from "next-auth/react";

const RootLayout = ({ children, session }) => {
  return (
    <main className="l-s:cstm-flex-row w-full">
      <SessionProvider session={session}>
        <AdminNav />
        {children}
      </SessionProvider>
    </main>
  );
};

export default RootLayout;
