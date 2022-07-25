import { Avatar , Typography, Button} from "@mui/material";
import {Link} from 'react-router-dom';
import React, { useEffect, useState } from "react";
import "./Register.css";
import { registerUser } from "../../Actions/User";
import { useAlert } from "react-alert";
import {useSelector, useDispatch} from 'react-redux';
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(registerUser(name, email, password, avatar));
  }
  const {loading, error, message} = useSelector((state) => state.user);
    const handleImageChange = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        const Reader = new FileReader();
        Reader.onload = () => {
            if (Reader.readyState === 2) {
                setAvatar(Reader.result);
            }
        }
        Reader.readAsDataURL(file);

    }
    const alert = useAlert();
     useEffect(() => {
         if (error) {
         alert.error(error);
         dispatch({type: "clearErrors"});
         }
         if (message) {
          alert.success(message);
          dispatch({type: "clearMessage"});
         }
     }, [dispatch, error, alert, message]);
  return (
    <div className="register">
      <form  className="registerForm" onSubmit={(e) => submitHandler(e)}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Social App
        </Typography>
        <Avatar
          src={avatar}
          alit="User"
          sx={{ height: "10vmax", width: "10vmax" }}
        />
        <input type="file" accept="image/*" onChange={handleImageChange} />
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
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          className="registerInputs"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Link to="/">
            <Typography>Already signed up! Login Now</Typography>
        </Link>
        <Button disabled = {loading ? true : false} type="submit">Register</Button>
      </form>
    </div>
  );
};
export default Register;
