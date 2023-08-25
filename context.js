"use client";
import React from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const url = "https://readefine-server.onrender.com";

  return <AppContext.Provider value={{ url }}>{children}</AppContext.Provider>;
};

export const useGlobalContext = () => {
  return React.useContext(AppContext);
};

export { AppContext, AppProvider };
