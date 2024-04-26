import { Button, Typography } from "@mui/material";
import React ,{useEffect, useState} from "react";
import "./UpdatePassword.css";
import { useSelector, useDispatch } from "react-redux";
import {  updatePassword } from "../../Actions/User";
import { useAlert } from "react-alert";

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const dispatch = useDispatch();
  const alert = useAlert();
  const {error, loading, message} = useSelector((state) => state.like);
  useEffect(() => {
    if (error) {
        alert.error(error);
        dispatch({type: "likeClearErrors"});
    }

    if (message) {
        alert.success(message);
        dispatch({type: "likeClearMessage"});
    }
  }, [dispatch, error,  alert, message ])

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updatePassword(oldPassword, newPassword));
  }
  return (
    <div className="updatePassword">
      <form className="updatePasswordForm" onSubmit={(e) => submitHandler(e)}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Social App
        </Typography>
        <input
         className="updatePasswordInputs"
          type="password"
          placeholder="Old Password"
          required
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <input
         className="updatePasswordInputs"
          type="password"
          placeholder="New Password"
          required
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Button disabled = {loading ? true : false } type="submit">Change Password</Button>
      </form>
    </div>
  );
};
export default UpdatePassword;
