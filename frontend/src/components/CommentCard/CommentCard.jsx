import { Delete } from "@mui/icons-material";
import { Typography, Button } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteCommentOnPost } from "../../Actions/Post";
import { getFollowingPosts } from "../../Actions/User";
import "./CommentCard.css";

const CommentCard = ({
  userId,
  name,
  avatar,
  comment,
  commentId,
  postId,
  isAccount,
}) => {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const deleteCommentHandler = (e) => {
    e.preventDefault();
    dispatch(deleteCommentOnPost(postId, commentId));

    if (isAccount) {

    } else {
        dispatch(getFollowingPosts());
    }
  };

  return (
    <div className="commentUser" key={commentId}
    commentId = {commentId} >
      <Link to={`/user/${userId}`}>
        <img src={avatar.url} alt={name} />
        <Typography>{comment}</Typography>
        {isAccount ? (
          <Button onClick={deleteCommentHandler}>
            <Delete />
          </Button>
        ) : userId === user._id ? (
          <Button onClick={deleteCommentHandler}>
            <Delete />
          </Button>
        ) : null}
      </Link>
    </div>
  );
};
export default CommentCard;
