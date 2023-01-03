import React from "react";
import { Outlet } from "react-router-dom";
import { Container, Box } from "@mui/material";
import "./css/Styles.css";

function AuthLayout() {
  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          className="auth-wrapper"
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Outlet />
        </Box>
      </Container>
    </>
  );
}

export default AuthLayout;
