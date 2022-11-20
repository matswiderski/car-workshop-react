import { useContext, useEffect } from "react";
import { PageContext } from "../Contexts";


function Dashboard(props) {
    const pageContext = useContext(PageContext);
    useEffect(() => {
        pageContext.setCurrentPageName(props.pageName)
      }, [pageContext.currentPageName]);
  return (
    <>
    </>
  );
}

export default Dashboard;
