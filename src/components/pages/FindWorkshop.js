import { useContext, useEffect } from "react";
import { PageContext } from "../Contexts";
function FindWorkshop(props){
    const pageContext = useContext(PageContext);
    useEffect(() => {
        pageContext.setCurrentPageName(props.pageName)
      }, []);
    return(
        <>
        </>
    );
}

export default FindWorkshop;