import React, { useEffect, useState } from "react";
import "./Post.css";
import User from "../User/User";
import {
  MoreVert,
  Favorite,
  FavoriteBorder,
  ChatBubbleOutline,
  DeleteOutline,
} from "@mui/icons-material";
import { Avatar, Typography, Button, Dialog } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCommentOnPost, likePost, updateCaption, deletePost } from "../../Actions/Post";
import { useAlert } from "react-alert";
import { getFollowingPosts, getMyPosts, loadUser } from "../../Actions/User";
import CommentCard from "../CommentCard/CommentCard";
const Post = ({
  postId,
  caption,
  postImage,
  likes = [],
  comments = [],
  ownerImage,
  ownerName,
  ownerId,
  isAccount = false,
  isDelete = false,
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const alert = useAlert();
  const [liked, setLiked] = useState(false);
  const [likesUser, setLikesUser] = useState(false);

  const [commentValue, setCommentValue] = useState("");
  const [commentToggle, setCommentToggle] = useState(false);
  const [captionValue, setCaptionValue] = useState(caption);
  const [captionToggle, setCaptionToggle] = useState(false);
  const { error, message } = useSelector((state) => state.like);
  const handleLike = async () => {
    setLiked(!liked);
    await dispatch(likePost(postId));
    if (isAccount) {
      dispatch(getMyPosts());
    } else {
      dispatch(getFollowingPosts());
    }
  };
  useEffect(() => {
    likes.forEach((item) => {
      if (item._id === user._id) {
        setLiked(true);
      }
    });
  }, [likes, user._id]);

  const addCommentHandler = async (e) => {
    e.preventDefault();
    setCommentValue(null);
    await dispatch(addCommentOnPost(postId, commentValue));

    if (isAccount) {
      dispatch(getMyPosts());
    } else {
      dispatch(getFollowingPosts());
    }
  };
  const deletePostHandler = async () => {
    await dispatch(deletePost(postId));
    dispatch(getMyPosts());
    dispatch(loadUser());
  }

  const updateCaptionHandler = (e) => {
    e.preventDefault();
    dispatch(updateCaption(captionValue, postId));
    dispatch(getMyPosts());
  }

  return (
    <div className="post">
      <div className="postHeader">
        {isAccount ? (
          <Button onClick= {() => setCaptionToggle(!captionToggle)}>
            <MoreVert />
          </Button>
        ) : null}
      </div>
      <img src={postImage} alt="Post" />
      <div className="postDetails">
        <Avatar
          src={ownerImage}
          alt="User"
          sx={{
            height: "3vmax",
            width: "3vmax",
          }}
        />
        <Link to={`/user/${ownerId}`}>
          <Typography fontWeight={700}>{ownerName}</Typography>
        </Link>
        <Typography
          fontWeight={100}
          color="rgba(0, 0, 0, 0.582"
          style={{ alignSelf: "center" }}
        >
          {caption}
        </Typography>
      </div>
      <button
        onClick={() => setLikesUser(!likesUser)}
        disabled={likes.length === 0 ? true : false}
        style={{
          border: "none",
          backgroundColor: "white",
          cursor: "pointer",
          margin: "1vmax 2vmax",
        }}
      >
        <Typography>{likes.length} Likes </Typography>
      </button>
      <div className="postFooter">
        <Button onClick={handleLike}>
          {liked ? <Favorite style={{ color: "red" }} /> : <FavoriteBorder />}
        </Button>
        <Button onClick={() => setCommentToggle(!commentToggle)}>
          <ChatBubbleOutline />
        </Button>
        <Button onClick={() => deletePostHandler()}>{isDelete ? <DeleteOutline /> : null}</Button>
      </div>
      <Dialog open={likesUser} onClose={() => setLikesUser(!likes)}>
        <div className="DialogBox">
          <Typography variant="h4">Liked By</Typography>
          {likes.map((like) => {
            return (
              <User
                key={like._id}
                userId={like._id}
                name={like.name}
                avatar={like.avatar.url}
              />
            );
          })}
        </div>
      </Dialog>

      <Dialog
        open={commentToggle}
        onClose={() => setCommentToggle(!commentToggle)}
      >
        <div className="DialogBox">
          <Typography variant="h4">Comments</Typography>

          <form className="commentForm" onSubmit={addCommentHandler}>
            <input
              type="text"
              value={commentValue}
              onChange={(e) => setCommentValue(e.target.value)}
              placeholder="Comment Here..."
              required
            />
            <Button type="submit" variant="contained">
              Add
            </Button>
          </form>

          {comments.length > 0 ? (
            comments.map((item) => {
              return (
                <CommentCard
                  userId={item.user._id}
                  name={item.user.name}
                  avatar={item.user.avatar}
                  comment={item.comment}
                  commentId={item._id}
                  isAccount={isAccount}
                  postId={postId}
                />
              );
            })
          ) : (
            <Typography variant="h4">No comments yet</Typography>
          )}
        </div>
      </Dialog>
      <Dialog
        open={captionToggle}
        onClose={() => setCaptionToggle(!captionToggle)}
      >
        <div className="DialogBox">
          <Typography variant="h4">Update Caption</Typography>

          <form className="commentForm" onSubmit={(e) => updateCaptionHandler(e)}>
            <input
              type="text"
              value={captionValue}
              onChange={(e) => setCaptionValue(e.target.value)}
              required
            />
            <Button type="submit" variant="contained">
            Update
            </Button>
          </form>
        </div>
      </Dialog>
    </div>
  );
};
export default Post;
