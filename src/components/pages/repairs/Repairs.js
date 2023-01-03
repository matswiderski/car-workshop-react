import { useEffect } from "react";
import usePage from "../../hooks/usePage";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import RepairSteps from "./RepairSteps";
function Repair(props) {
  const page = usePage();
  useEffect(() => {
    page.setCurrentPageName(props.pageName);
  }, [page.currentPageName]);
  return (
    <Grid container item spacing={2} sx={{ display: "flex" }}>
      <Grid item xs={12}>
        <Box
          sx={{
            border: 0,
            borderColor: "common",
            p: 3,
            borderRadius: "4px",
          }}
        >
          <RepairSteps />
        </Box>
      </Grid>
      <Grid item xs={12}></Grid>
      <Grid item xs={12}></Grid>
      <Grid item xs={12}></Grid>
    </Grid>
  );
}

export default Repair;
