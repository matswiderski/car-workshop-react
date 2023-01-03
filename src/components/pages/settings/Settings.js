import React from "react";
import { useEffect } from "react";
import usePage from "../../hooks/usePage";
function Settings(props) {
  const page = usePage();
  useEffect(() => {
    page.setCurrentPageName(props.pageName);
  }, [page.currentPageName]);
  return <div>Settings</div>;
}

export default Settings;
