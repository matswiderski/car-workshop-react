import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import HardwareRoundedIcon from "@mui/icons-material/HardwareRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";

import SummaryCard from "./SummaryCard";

function Summary() {
  return (
    <>
      <Grid item xs={12} sm={6} lg={3}>
        <Paper elevation={0} className="summary-card total-spent">
          <SummaryCard text="Total cost of repairs" value="341515">
            <AttachMoneyRoundedIcon className="icon" />
          </SummaryCard>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <Paper className="summary-card max-spent">
          <SummaryCard text="Most expensive repair" value="420">
            <AttachMoneyRoundedIcon className="icon" />
          </SummaryCard>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <Paper className="summary-card total-repairs">
          <SummaryCard text="Repairs in total" value="69">
            <HardwareRoundedIcon className="icon" />
          </SummaryCard>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <Paper className="summary-card last-repair">
          <SummaryCard text="Date of last repair" value="2022-02-29">
            <CalendarMonthRoundedIcon className="icon" />
          </SummaryCard>
        </Paper>
      </Grid>
    </>
  );
}

export default Summary;
