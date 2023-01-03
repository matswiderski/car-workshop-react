import { useEffect, useState } from "react";
import axios from "../../../api/axios";
import usePage from "../../hooks/usePage";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import RepairSteps from "./RepairSteps";
import RecentRepairs from "./RecentRepairs";
import { Typography } from "@mui/material";
function Repair(props) {
  const page = usePage();
  const [repairs, setRepairs] = useState([]);

  useEffect(() => {
    page.setCurrentPageName(props.pageName);
  }, [page.currentPageName]);

  useEffect(() => {
    (async function () {
      try {
        const getRepairs = await axios({
          method: "get",
          url: "repair/get-all",
          headers: { "Content-Type": "application/json" },
        });
        setRepairs(getRepairs.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
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
          <RepairSteps repairs={repairs} setRepairs={setRepairs} />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Typography
          variant="h6"
          sx={{ my: 1, fontWeight: "500", letterSpacing: "1px" }}
        >
          Recent repairs
        </Typography>
        <RecentRepairs repairs={repairs}/>
      </Grid>
    </Grid>
  );
}

export default Repair;
