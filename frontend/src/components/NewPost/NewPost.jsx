import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";

import "./NewPost.css";
import SpinningLoader from "../SpinningLoader/SpinningLoader";
import { useSelector, useDispatch } from "react-redux";
import { createNewPost } from "../../Actions/Post";
import { useAlert } from "react-alert";
import { Button } from "@mui/material";
const NewPost = () => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");

  const { loading, error, message } = useSelector((state) => state.like);
  const dispatch = useDispatch();
  const alert = useAlert();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setImage(Reader.result);
      }
    };
    Reader.readAsDataURL(file);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createNewPost(caption, image));
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
  }, [error, message, alert, dispatch]);
  return (
    <div className="newPost">
      <form className="newPostForm" onSubmit={submitHandler}>
        <Typography id="h1" variant="h4">
          Create Post
        </Typography>

        {image && <img src={image} alt="post" />}
        <input
          type="file"
          id="pimage"
          class="fileInput"
          accept="image/*"
          onChange={handleImageChange}
        />
        <label for="pimage">Choose an image</label>
        <input
          type="text"
          placeholder="Add a caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <Button id="addPostBtn" type="submit" disabled={loading ? true : false}>
          Post
        </Button>
        {loading && <SpinningLoader />}
      </form>
    </div>
  );
};
export default NewPost;
