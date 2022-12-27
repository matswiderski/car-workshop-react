import React from "react";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

function NoMatch() {
  return (
    <Container>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <ErrorOutlineRoundedIcon sx={{ fontSize: "100px" }} />
          <Typography variant="h5">404</Typography>
        </Box>
        <Typography variant="h4">Page not found</Typography>
      </Box>
    </Container>
  );
}

export default NoMatch;
