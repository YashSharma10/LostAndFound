import { createContext, useContext } from "react";

export const GlobalContext = createContext();

export default function GlobalContextProvider({ children }) {
  const globalBackendUrl = "https://lost-and-found-cyan.vercel.app";
  return (
    <GlobalContext.Provider value={{ globalBackendUrl }}>
      {children}
    </GlobalContext.Provider>
  );
}

export const useGlobalContext = () =>  useContext(GlobalContext);
