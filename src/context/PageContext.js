import { createContext, useState } from "react";

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
