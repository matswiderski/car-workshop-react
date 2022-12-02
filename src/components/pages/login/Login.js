import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "../../../api/axios";
import useAuth from "../../hooks/useAuth";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("elo@elo.pl");
  const [password, setPassword] = useState("Password123!");
  const { setUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <p>Login Form</p>
        <input
          type="email"
          name="email"
          placeholder="enter an email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="enter a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
}

export default Login;
