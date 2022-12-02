import { createContext, useEffect, useState } from "react";
import { ThemeMode } from "../components/layout/appLayout/Theme";

export const PageContext = createContext({
  currentPageName: "",
  setCurrentPageName: () => {},
});

export const PageContextProvider = ({ children }) => {
  const [currentPageName, setCurrentPageName] = useState(null);
  const context = {
    currentPageName,
    setCurrentPageName,
  };
  return (
    <PageContext.Provider value={context}>{children}</PageContext.Provider>
  );
};
