"use client";
import React from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const url = "http://192.168.1.121:9000";

  return <AppContext.Provider value={{ url }}>{children}</AppContext.Provider>;
};

export const useGlobalContext = () => {
  return React.useContext(AppContext);
};

export { AppContext, AppProvider };
