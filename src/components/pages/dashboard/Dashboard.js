import { useContext, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  BarElement,
} from "chart.js";
import { Doughnut, Line, Bar } from "react-chartjs-2";

import { PageContext } from "../../Contexts";
import Summary from "./Summary";
import History from "./History";
import "./css/Styles.css"

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const dataDoughnut = {
  labels: [
    "Car body and main parts",
    "Low voltage/auxiliary electrical system and electronics",
    "Interior",
    "Power-train and chassis",
    "Miscellaneous auto parts",
  ],
  datasets: [
    {
      data: [12, 19, 3, 5, 2],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};
export const optionsLine = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: "Number of repairs per month",
    },
  },
};

export const optionsBar = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: "Money spent per month",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];
const dataLine = {
  labels,
  datasets: [
    {
      data: [12, 50, 3, 43, 2, 123, 65],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

const dataBar = {
  labels,
  datasets: [
    {
      data: [2100, 0, 13000, 0, 0, 1200, 150],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

function Dashboard(props) {
  const pageContext = useContext(PageContext);
  useEffect(() => {
    pageContext.setCurrentPageName(props.pageName);
  }, [pageContext.currentPageName]);
  return (
    <>
      <Summary />
      <Grid item xs={12} md={9}>
        <Grid
          container
          spacing={2}
          sx={{
            justifyContent: "space-around",
          }}
        >
          <Grid item>
            <Doughnut
              data={dataDoughnut}
              height={200}
              options={{ maintainAspectRatio: false }}
            />
          </Grid>
          <Grid item>
            <Bar options={optionsBar} data={dataBar} height={300} />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={true}>
            <Line options={optionsLine} data={dataLine} height={300} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={3} sx={{ borderRadius: "20px" }}>
        <Grid item>
          <Typography
            variant="h6"
            sx={{
              fontFamily: "monospace",
              fontWeight: 500,
              color: "inherit",
            }}
          >
            History:
          </Typography>
          <History />
        </Grid>
      </Grid>
    </>
  );
}

export default Dashboard;
