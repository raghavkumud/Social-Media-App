import { CommentOutlined } from "@mui/icons-material";
import axios from "axios";

export const likePost = (id) => async(dispatch) => {
    try {
        dispatch({
            type: "likeRequest",
        })
        const {data} = await axios.get(`post/${id}`);
        dispatch({
            type: "likeSuccess",
            payload: data.message,
        })
    } catch (error) {
        dispatch({
            type: "likeFailure",
            payload: error.response.data.message,
        })
    }
}
export const addCommentOnPost = (id, comment) => async(dispatch) => {
    try {
        dispatch({
            type: "addCommentRequest",
        })
        const {data} = await axios.put(`posts/comment/${id}`, {
            comment,
        },
            {
                headers: {
                    "Content-Type": "application/json",
                }
            }
        );
        dispatch({
            type: "addCommentSuccess",
            payload: data.message,
        })
    } catch (error) {
        dispatch({
            type: "addCommentFailure",
            payload: error.response.data.message,
        })
    }
}
export const deleteCommentOnPost = (id, commentId) => async(dispatch) => {
    try {
        dispatch({
            type: "deleteCommentRequest",
        })
        const {data} = await axios.delete(`posts/comment/${id}`, {
            data: commentId,
        }
        );
        dispatch({
            type: "deleteCommentSuccess",
            payload: data.message,
        })
    } catch (error) {
        dispatch({
            type: "deleteCommentFailure",
            payload: error.response.data.message,
        })
    }
}
export const createNewPost = (caption, image) => async(dispatch) => {
    try {
        dispatch({
            type: "newPostRequest",
        })
        const {data} = await axios.post('post/upload', {
            caption,
            image
        }, {
            headers: {
                "Content-Type" : "application/json",
            }
        }
        );
        dispatch({
            type: "newPostSuccess",
            payload: data.message,
        })
    } catch (error) {
        dispatch({
            type: "newPostFailure",
            payload: error.response.data.message,
        })
    }
}
export const updateCaption = (caption, id) => async(dispatch) => {
    try {
        dispatch({
            type: "updateCaptionRequest",
        })
        const {data} = await axios.put(`post/${id}`, {
            caption,
        }, {
            headers: {
                "Content-Type" : "application/json",
            }
        }
        );
        dispatch({
            type: "updateCaptionSuccess",
            payload: data.message,
        })
    } catch (error) {
        dispatch({
            type: "updateCaptionFailure",
            payload: error.response.data.message,
        })
    }
}
export const deletePost = (id) => async(dispatch) => {
    try {
        dispatch({
            type: "deletePostRequest",
        })
        const {data} = await axios.delete(`post/${id}`);
        
        dispatch({
            type: "deletePostSuccess",
            payload: data.message,
        })
    } catch (error) {
        dispatch({
            type: "deletePostFailure",
            payload: error.response.data.message,
        })
    }
}