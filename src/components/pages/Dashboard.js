import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';

import { useContext, useEffect } from "react";
import { PageContext } from "../Contexts";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

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
