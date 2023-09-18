"use client";
import React from "react";

const AppContext = React.createContext();

const local = "http://192.168.1.121:9000";
const prod = "https://readefine-server.onrender.com";

const AppProvider = ({ children }) => {
  const url = prod;

  return <AppContext.Provider value={{ url }}>{children}</AppContext.Provider>;
};

export const useGlobalContext = () => {
  return React.useContext(AppContext);
};

export { AppContext, AppProvider };
