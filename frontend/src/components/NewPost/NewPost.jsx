
import React , {useEffect, useState} from "react";
import { Typography } from "@mui/material";

import "./NewPost.css";
import { useSelector, useDispatch } from "react-redux";
import { createNewPost } from "../../Actions/Post";
import { useAlert } from "react-alert";
import {Button } from '@mui/material';
const NewPost = () => {
    const [image, setImage] = useState(null);
    const [caption, setCaption] = useState("");

    const {loading, error, message} = useSelector((state) => state.like);
    const dispatch = useDispatch();
    const alert = useAlert();
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const Reader = new FileReader();
        Reader.onload = () => {
            if (Reader.readyState === 2) {
                setImage(Reader.result);
            }
        }
        Reader.readAsDataURL(file);

    }
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createNewPost(caption, image));
    }
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch({type: "clearErrors"});
        } 
        if (message) {
            alert.success(message);
            dispatch({type: "clearMessage"});
        }

    }, [error, message, alert, dispatch])
    return <div className="newPost">
        <form className="newPostForm" onSubmit={submitHandler}>
        <Typography variant="h3">New Post</Typography>

        {image && <img src={image} alt ="post" />}
        <input type="file" accept="image/*" onChange={handleImageChange}/>
        <input 
        type="text"
        placeholder="Caption..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}/>
        <Button type="submit" disabled = {loading ? true : false}>
            Post
        </Button>
        </form>
    </div>
}
export default NewPost;