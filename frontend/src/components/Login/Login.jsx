import { Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Actions/User";
import { useAlert } from "react-alert";
import SpinningLoader from "../SpinningLoader/SpinningLoader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, message, loading } = useSelector((state) => state.user);
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "UserClearErrors" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "UserClearMessage" });
    }
  }, [error, alert, dispatch, message]);
  const loginHandler = (e) => {
    e.preventDefault();
    console.log(email, password);
    dispatch(loginUser(email, password));
  };
  return (
    <div className="login">
    {loading && <SpinningLoader/>}
      {!loading && <form className="loginForm" onSubmit={loginHandler}>
        <h3>Sign In</h3>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Link to="/forgot/password">
          <Typography style={{ padding: "10px" }}>Forgot Password</Typography>
        </Link>
        <Button id="loginBtn" type="submit">
          Login
        </Button>
        <Link to="/register">
          <Typography style={{ color: "lightblue" }}>New User</Typography>
        </Link>
      </form>}
    </div>
  );
};
export default Login;
