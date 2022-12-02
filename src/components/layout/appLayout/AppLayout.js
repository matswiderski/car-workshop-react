import React from "react";
import Nav from "./Nav";
import TopBar from "./TopBar";
import { Outlet } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
function AppLayout() {
  const theme = useTheme();
  return (
    <>
      <Nav />
      <Box
        id="content"
        sx={{
          ml: `calc(${theme.spacing(7)} + 30px)`,
          mr: "30px",
          [theme.breakpoints.up("sm")]: {
            ml: `calc(${theme.spacing(8)} + 30px)`,
          },
        }}
      >
        <TopBar />
        <Grid container spacing={2}>
          <Outlet />
        </Grid>
      </Box>
    </>
  );
}

export default AppLayout;
