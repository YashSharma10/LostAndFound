// GlobalContextProvider.js
import React, { createContext, useContext } from 'react';

export const GlobalContext = createContext();

export default function GlobalContextProvider({ children }) {
  const globalBackendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:6005";

  return (
    <GlobalContext.Provider value={{ globalBackendUrl }}>
      {children}
    </GlobalContext.Provider>
  );
}

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error('useGlobalContext must be used within a GlobalContextProvider');
  }
  return context;
};
