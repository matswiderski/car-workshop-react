import { createContext, useState } from "react";

export const PageContext = createContext({currentPageName: "", setCurrentPageName: () => {}});

export const PageContextProvider = ({ children }) => {
  const [currentPageName, setCurrentPageName] = useState(null);
  return (
    <PageContext.Provider value={{ currentPageName, setCurrentPageName }}>
      {children}
    </PageContext.Provider>
  );
};
