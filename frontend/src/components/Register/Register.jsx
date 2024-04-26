import { Avatar, Typography, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./Register.css";
import { registerUser } from "../../Actions/User";
import { useAlert } from "react-alert";
import { useSelector, useDispatch } from "react-redux";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(registerUser(name, email, password, avatar));
    navigate("/");
  };
  const { loading, error, message } = useSelector((state) => state.user);
  const handleImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAvatar(Reader.result);
      }
    };
    Reader.readAsDataURL(file);
  };
  const alert = useAlert();
  useEffect(() => {
    if (error) {
      alert.error(error);
      console.log({
        message: "error occurred in the register part",
      });
      dispatch({ type: "UserClearErrors" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "UserClearMessage" });
    }
  }, [dispatch, error, alert, message]);
  return (
    <div className="register">
      <form className="registerForm" onSubmit={(e) => submitHandler(e)}>
        <Avatar
          src={avatar}
          alit="User"
          sx={{ height: "100px", width: "100px" }}
        />
        <span for="avatar">Upload a profile picture</span>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
        />
        <input
          type="text"
          value={name}
          className="registerInputs"
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <input
          type="email"
          placeholder="Email"
          required
          className="registerInputs"
          value={email}
          title="Please enter a valid email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          className="registerInputs"
          value={password}
          pattern=".......*"
          title="Password must be at least 6 characters in length."
          onChange={(e) => setPassword(e.target.value)}
        />
        <Link to="/">
          <Typography>Already signed up! Login Now</Typography>
        </Link>
        <Button id="regBtn" disabled={loading ? true : false} type="submit">
          Register
        </Button>
      </form>
    </div>
  );
};
export default Register;
