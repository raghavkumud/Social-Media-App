import { Avatar, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./UpdateProfile.css";
import { loadUser, updateProfile } from "../../Actions/User";
import { useAlert } from "react-alert";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Loader/Loader";
const UpdateProfile = () => {
  const { loading, error, user } = useSelector((state) => state.user);
  const {
    loading: updateLoading,
    error: updateError,
    message,
  } = useSelector((state) => state.like);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [avatar, setAvatar] = useState(null);
  const [avatarPrev, setAvatarPrev] = useState(user.avatar.url);
  const dispatch = useDispatch();
  const alert = useAlert();
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "UserClearErrors" });
    }

    if (updateError) {
      alert.error(updateError);
      dispatch({ type: "likeClearErrors" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "likeClearMessage" });
    }
  }, [dispatch, error, updateError, alert, message]);
  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(updateProfile(name, email, avatar));
    dispatch(loadUser());
  };
  const handleImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAvatarPrev(Reader.result);
        setAvatar(Reader.result);
      }
    };
    Reader.readAsDataURL(file);
  };
  return loading ? (
    <Loader />
  ) : (
    <div className="updateProfile">
      <form className="updateProfileForm" onSubmit={(e) => submitHandler(e)}>
        <Avatar
          src={avatarPrev}
          alt="User"
          sx={{ height: "10vmax", width: "10vmax" }}
        />
        <input
          type="file"
          id="profileImage"
          accept="image/*"
          className="imageInp"
          onChange={(e) => handleImageChange(e)}
        />
        <label for="profileImage">Choose a profile picture</label>
        <input
          type="text"
          value={name}
          className="updateProfileInputs"
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <input
          type="email"
          placeholder="Email"
          required
          className="updateProfileInputs"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          id="updateBtn"
          disabled={updateLoading ? true : false}
          type="submit"
        >
          Update
        </Button>
      </form>
    </div>
  );
};
export default UpdateProfile;
