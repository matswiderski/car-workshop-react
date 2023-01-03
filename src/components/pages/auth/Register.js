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
import ToggleButton from "@mui/material/ToggleButton";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import Person2Icon from "@mui/icons-material/Person2";
import styled from "@mui/material/styles/styled";
import axios from "../../../api/axios";
import { useNavigate } from "react-router-dom";
import useNotification from "../../hooks/useNotification";
import FormHelperText from "@mui/material/FormHelperText";

const CustomToggleButton = styled(ToggleButton)({
  "&.Mui-selected, &.Mui-selected:hover": {
    color: "white",
    backgroundColor: "rgba(255, 99, 132, 0.15)",
  },
});

function Register() {
  const [loading, setLoading] = useState(false);
  const [personal, setPersonal] = useState(true);
  const [business, setBusiness] = useState(false);
  const [accountType, setAccountType] = useState("personal");
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const notification = useNotification();
  const [emailErrors, setEmailErrors] = useState({ isOpen: false, errors: [] });
  const [passwordErrors, setPasswordErrors] = useState({
    isOpen: false,
    errors: [],
  });
  const [confirmErrors, setConfirmErrors] = useState({
    isOpen: false,
    errors: [],
  });
  const [accountTypeErrors, setaccountTypeErrors] = useState({
    isOpen: false,
    errors: [],
  });
  const clearErrors = () => {
    setEmailErrors({ isOpen: false, errors: [] });
    setPasswordErrors({ isOpen: false, errors: [] });
    setConfirmErrors({ isOpen: false, errors: [] });
    setaccountTypeErrors({ isOpen: false, errors: [] });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    clearErrors();
    setLoading(true);
    const signupFormData = {
      emailAddress: email,
      password: password,
      confirmPassword: confirmPassword,
      accountType: accountType,
    };
    try {
      setLoading(true);
      const response = await axios({
        method: "post",
        url: "auth/signup",
        data: signupFormData,
        headers: { "Content-Type": "application/json" },
      });
      notification.setNotification(
        "Please confirm your email address to complete registration process"
      );
      navigate("/", { replace: true });
    } catch (error) {
      const errors = error.response.data.errors;
      if (errors !== undefined) {
        if (errors.hasOwnProperty("EmailAddress")) {
          setEmailErrors({
            isOpen: true,
            errors: error.response.data.errors.EmailAddress,
          });
        }
        if (errors.hasOwnProperty("Password")) {
          setPasswordErrors({
            isOpen: true,
            errors: error.response.data.errors.Password,
          });
        }
        if (errors.hasOwnProperty("ConfirmPassword")) {
          setConfirmErrors({
            isOpen: true,
            errors: error.response.data.errors.ConfirmPassword,
          });
        }
        if (errors.hasOwnProperty("AccountType")) {
          setaccountTypeErrors({
            isOpen: true,
            errors: error.response.data.errors.AccountType,
          });
        }
      }
    }
    setLoading(false);
  };

  return (
    <Grow
      in={true}
      style={{ transformOrigin: "0 1 0" }}
      {...(true ? { timeout: 600 } : {})}
    >
      <Box component="form" onSubmit={handleSubmit}>
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
          error={emailErrors.isOpen}
          helperText={emailErrors.errors.map((msg, i) => {
            return <li key={i}>{msg}</li>;
          })}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          id="password"
          margin="normal"
          required
          name="password"
          label="Password"
          type="password"
          variant="standard"
          autoComplete="password"
          fullWidth
          error={passwordErrors.isOpen}
          helperText={passwordErrors.errors.map((msg, i) => {
            return <li key={i}>{msg}</li>;
          })}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          id="confirm-password"
          margin="normal"
          required
          name="confirm-password"
          label="Confirm password"
          type="password"
          variant="standard"
          autoComplete="confirm-password"
          fullWidth
          error={confirmErrors.isOpen}
          helperText={confirmErrors.errors.map((msg, i) => {
            return <li key={i}>{msg}</li>;
          })}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <CustomToggleButton
            value="personal"
            selected={personal}
            onChange={(e) => {
              setPersonal(true);
              setBusiness(false);
              setAccountType("personal");
            }}
            fullWidth
            sx={{ mr: 1 }}
          >
            <Person2Icon />
            <Typography sx={{ mx: 1 }} variant="caption">
              Personal account
            </Typography>
          </CustomToggleButton>
          <CustomToggleButton
            value="business"
            selected={business}
            onChange={(e) => {
              setBusiness(true);
              setPersonal(false);
              setAccountType("business");
            }}
            fullWidth
            sx={{ ml: 1 }}
          >
            <BusinessCenterIcon sx={{ mx: 1 }} />
            <Typography variant="caption">Business account</Typography>
          </CustomToggleButton>
        </Box>
        <FormHelperText error={accountTypeErrors.isOpen} variant="standard">
          {accountTypeErrors.errors.map((msg, i) => {
            return <li key={i}>{msg}</li>;
          })}
        </FormHelperText>

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
