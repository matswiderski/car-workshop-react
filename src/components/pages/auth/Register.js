import React from "react";
import { useState } from "react";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grow from "@mui/material/Grow";
function Register() {
  const [loading, setLoading] = useState(false);
  return (
    <Grow
      in={true}
      style={{ transformOrigin: "0 1 0" }}
      {...(true ? { timeout: 600 } : {})}
    >
      <Box component="form">
        <Avatar className="lock" sx={{ mx: "auto" }}>
          <HowToRegIcon />
        </Avatar>
        <Typography
          component="h1"
          variant="h5"
          sx={{ textAlign: "center", mb: 3, mt: 1 }}
        >
          Sign up
        </Typography>
        <TextField
          id="email"
          margin="normal"
          required
          fullWidth
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          variant="standard"
        />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <TextField
            id="password"
            margin="normal"
            required
            name="password"
            label="Password"
            type="password"
            variant="standard"
            autoComplete="current-password"
            sx={{ mr: 1 }}
          />
          <TextField
            id="confirm-password"
            margin="normal"
            required
            name="confirm-password"
            label="Confirm"
            type="password"
            variant="standard"
            autoComplete="current-password"
            sx={{ ml: 1 }}
          />
        </Box>
        <LoadingButton
          type="submit"
          fullWidth
          loading={loading}
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </LoadingButton>
        <Grid container>
          <Grid item>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Button
                sx={{ p: 0, color: "primary.main", textTransform: "none" }}
              >
                Already have an account? Sign in instead
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Grow>
  );
}

export default Register;
