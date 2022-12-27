import { useEffect } from "react";
import usePage from "../hooks/usePage";
function FindWorkshop(props){
    const page = usePage();
    useEffect(() => {
      page.setCurrentPageName(props.pageName);
    }, [page.currentPageName]);
    return(
        <>
        </>
    );
}

export default FindWorkshop;