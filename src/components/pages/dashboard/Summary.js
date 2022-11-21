import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import HardwareRoundedIcon from "@mui/icons-material/HardwareRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";

import "./css/Styles.css";
import { Typography } from "@mui/material";

function Summary() {
  return (
    <>
      <Grid item xs={12} sm={6} md={3}>
        <Paper className="summary-card total-spent">
          <AttachMoneyRoundedIcon sx={{fontSize: 40}} />
          <div className="card-content">
            <Typography variant="h5">37215</Typography>
            <span>Total cost of repairs</span>
          </div>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Paper className="summary-card max-spent">
          <AttachMoneyRoundedIcon sx={{fontSize: 40}} />
          <div className="card-content">
            <Typography variant="h5">420</Typography>
            <span>Most expensive repair</span>
          </div>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Paper className="summary-card total-repairs">
          <HardwareRoundedIcon sx={{fontSize: 40}} />
          <div className="card-content">
            <Typography variant="h5">69</Typography>
            <span>Repairs in total</span>
          </div>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Paper className="summary-card last-repair">
          <CalendarMonthRoundedIcon sx={{fontSize: 40}} />
          <div className="card-content">
            <Typography variant="h5">2022-02-29</Typography>
            <span>Date of last repair</span>
          </div>
        </Paper>
      </Grid>
    </>
  );
}

export default Summary;
