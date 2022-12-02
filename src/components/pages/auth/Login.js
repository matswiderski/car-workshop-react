import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import axios from "../../../api/axios";
import useAuth from "../../hooks/useAuth";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import Typography from "@mui/material/Typography";
import Info from "./Info";
import Grow from "@mui/material/Grow";
import ForgotPassword from "./ForgotPassword";
function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const loginFormData = {
      emailAddress: email,
      password: password,
    };
    try {
      const response = await axios({
        method: "post",
        url: "auth/login",
        data: loginFormData,
        headers: { "Content-Type": "application/json" },
      });

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;
      setUser(
        JSON.stringify({
          token: response.data.token,
          email,
        })
      );
      localStorage.setItem(
        "user-data",
        JSON.stringify({ token: response.data.token, email })
      );
      setLoading(false);
      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grow
      in={true}
      style={{ transformOrigin: "0 1 0" }}
      {...(true ? { timeout: 400 } : {})}
    >
      <Box component="form" onSubmit={handleSubmit}>
        <Avatar className="lock" sx={{ mx: "auto" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography
          component="h1"
          variant="h5"
          sx={{ textAlign: "center", mb: 3, mt: 1 }}
        >
          Sign in
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
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          id="password"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          variant="standard"
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <FormControlLabel
            control={<Info />}
            label="Testing"
            labelPlacement="start"
          />
        </Box>
        <LoadingButton
          type="submit"
          fullWidth
          loading={loading}
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </LoadingButton>
        <Grid container>
          <Grid item>
            <Link to="/signup" style={{ textDecoration: "none" }}>
              <Button
                sx={{ p: 0, color: "primary.main", textTransform: "none" }}
              >
                Don't have an account? Sign Up
              </Button>
            </Link>
          </Grid>
          <Grid item xs sx={{textAlign: "end"}}>
            <ForgotPassword />
          </Grid>
        </Grid>
      </Box>
    </Grow>
  );
}

export default Login;
