import { createContext, useContext } from "react";

export const GlobalContext = createContext();

export default function GlobalContextProvider({ children }) {
  const globalBackendUrl = "https://test.com";
  return (
    <GlobalContext.Provider value={{ globalBackendUrl }}>
      {children}
    </GlobalContext.Provider>
  );
}

export const useGlobalContext = () =>  useContext(GlobalContext);
