import React from "react";
import AdminNav from "@/admin/global/AdminNav";

export const metadata = {
  title: "Readefine | Admin",
};

const RootLayout = ({ children }) => {
  return <AdminNav> {children}</AdminNav>;
};

export default RootLayout;
