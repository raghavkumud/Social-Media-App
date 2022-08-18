import React, { useState, useEffect } from "react";
import "./ResetPassword.css";
import { Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { Link, useParams } from "react-router-dom";
import { resetPassword } from "../../Actions/User";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const dispatch = useDispatch();
  const alert = useAlert();
  const params = useParams();
  const { loading, error, message } = useSelector((state) => state.like);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(resetPassword(params.token, newPassword));
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [alert, error, message, dispatch]);
  return (
    <div className="resetPassword">
      <form className="resetPasswordForm" onSubmit={(e) => submitHandler(e)}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Social App
        </Typography>
        <input
          className="resetPasswordInputs"
          type="password"
          placeholder="New Password"
          required
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Link to="/">
          <Typography>Login</Typography>
        </Link>

        <Link to="/forgot/password">
          <Typography>Request Another Token !</Typography>
        </Link>
        <Button id="resPassBtn" disabled={loading ? true : false} type="submit">
          Reset Password
        </Button>
      </form>
    </div>
  );
};
export default ResetPassword;
