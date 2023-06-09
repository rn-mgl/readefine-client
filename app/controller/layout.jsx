import React from "react";
import AdminNav from "../../src/admin/global/AdminNav";

export const metadata = {
  title: "Readefine | Admin",
};

const RootLayout = ({ children }) => {
  return (
    <main className="l-s:cstm-flex-row w-full">
      <AdminNav />
      {children}
    </main>
  );
};

export default RootLayout;
