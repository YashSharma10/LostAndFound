import React from 'react';
import { createContext, useContext } from 'react';

export const GlobalContext = createContext();

export default function GlobalContextProvider({ children }) {
  const globalBackendUrl = "https://lostandfound-40ek.onrender.com";
  // const globalBackendUrl = "http://localhost:6005";
  
  return (
    <GlobalContext.Provider value={{ globalBackendUrl }}>
      {children}
    </GlobalContext.Provider>
  );
}

export const useGlobalContext = () => useContext(GlobalContext);
