import React from "react";
import AdminNav from "../../src/admin/global/AdminNav";

export const metadata = {
  title: "Admin | Dashboard",
};

const RootLayout = ({ children }) => {
  return (
    <main className="l-s:cstm-flex-row">
      <AdminNav /> {children}
    </main>
  );
};

export default RootLayout;
