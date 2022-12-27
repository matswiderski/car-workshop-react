import { useEffect } from "react";
import usePage from "../hooks/usePage";
import Grid from "@mui/system/Unstable_Grid/Grid";
import Fab from "@mui/material/Fab";
import AddIcon from '@mui/icons-material/Add';
function FindWorkshop(props) {
  const page = usePage();
  useEffect(() => {
    page.setCurrentPageName(props.pageName);
  }, [page.currentPageName]);
  return (
    <>
      <Grid item xs={12} md={9}>
        <Grid
          container
          spacing={2}
          sx={{
            justifyContent: "space-around",
          }}
        >
          <Grid item>
            <span>cars</span>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default FindWorkshop;
