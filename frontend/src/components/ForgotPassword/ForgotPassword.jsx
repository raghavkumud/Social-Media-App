import React, { useEffect, useState } from "react";

import "./ForgotPassword.css";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../Actions/User";
import { useAlert } from "react-alert";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, loading, message } = useSelector((state) => state.like);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "likeClearErrors" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "likeClearMessage" });
    }
  }, [alert, error, message, dispatch]);
  return (
    <div className="forgotPassword">
      <form className="forgotPasswordForm" onSubmit={submitHandler}>
        <input
          type="email"
          placeholder="Email"
          required
          className="forgotPasswordInputs"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button id="tokenBtn" disabled={loading ? true : false} type="submit">
          Send Token
        </Button>
      </form>
    </div>
  );
};
export default ForgotPassword;
