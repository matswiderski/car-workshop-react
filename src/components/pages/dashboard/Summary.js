import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import HardwareRoundedIcon from "@mui/icons-material/HardwareRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import CarRepairRoundedIcon from '@mui/icons-material/CarRepairRounded';
import Zoom from "@mui/material/Zoom";
import SummaryCard from "./SummaryCard";

function Summary() {
  return (
    <>
      <Zoom timeout={500} in={true}>
        <Grid item xs={12} sm={6} lg={3}>
          <Paper elevation={0} className="summary-card total-spent">
            <SummaryCard text="Total cost of repairs" value="341515">
              <AttachMoneyRoundedIcon className="icon" />
            </SummaryCard>
          </Paper>
        </Grid>
      </Zoom>
      <Zoom in={true} timeout={500} style={{ transitionDelay: '50ms' }}>
        <Grid item xs={12} sm={6} lg={3}>
          <Paper className="summary-card max-spent">
            <SummaryCard text="Registered cars" value="2">
              <CarRepairRoundedIcon className="icon" />
            </SummaryCard>
          </Paper>
        </Grid>
      </Zoom>
      <Zoom in={true} timeout={500} style={{ transitionDelay: '100ms' }}>
        <Grid item xs={12} sm={6} lg={3}>
          <Paper className="summary-card total-repairs">
            <SummaryCard text="Repairs in total" value="43">
              <HardwareRoundedIcon className="icon" />
            </SummaryCard>
          </Paper>
        </Grid>
      </Zoom>
      <Zoom in={true} timeout={500} style={{ transitionDelay: '150ms' }}>
        <Grid item xs={12} sm={6} lg={3}>
          <Paper className="summary-card last-repair">
            <SummaryCard text="Date of last repair" value="2022-02-29">
              <CalendarMonthRoundedIcon className="icon" />
            </SummaryCard>
          </Paper>
        </Grid>
      </Zoom>
    </>
  );
}

export default Summary;
