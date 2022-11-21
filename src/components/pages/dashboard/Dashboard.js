import { useContext, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { PageContext } from "../../Contexts";

import Summary from "./Summary";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Dashboard(props) {
  const pageContext = useContext(PageContext);
  useEffect(() => {
    pageContext.setCurrentPageName(props.pageName);
  }, [pageContext.currentPageName]);
  return (
    <>
      <Summary />
    </>
  );
}

export default Dashboard;
