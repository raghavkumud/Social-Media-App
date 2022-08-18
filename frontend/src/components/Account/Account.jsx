import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteMyProfile, getMyPosts, logOutUser } from "../../Actions/User";
import Loader from "../Loader/Loader";
import Post from "../Post/Post";
import { Avatar, Typography , Button, Dialog} from "@mui/material";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import "./Account.css";
import User from "../User/User";
const Account = () => {
  const dispatch = useDispatch();
  const { loading, error, posts } = useSelector((state) => state.myPosts);
  const { error: likeError, message, loading: deleteLoading} = useSelector((state) => state.like);
  const { user, loading: userLoading,  } = useSelector((state) => state.user);

  const [followersToggle, setFollowersToggle] = useState(false);
  const [followingToggle, setFollowingToggle] = useState(false);
  const alert = useAlert();
  useEffect(() => {
    dispatch(getMyPosts());
  }, [dispatch]);
  useEffect(() => {
    if (likeError) {
      alert.error(likeError);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [alert, likeError, message, error, dispatch ]);
 

  const logOutHandler = async () => {
    await dispatch(logOutUser());
    alert.success("Logged Out Successfully");
  }

  const deleteProfileHandler = async (e) => {
    await dispatch(deleteMyProfile());
    dispatch(logOutUser());
  }
  return loading || userLoading ? (
    <Loader />
  ) : (
    <div className="account">
      <div className="accountleft">
        {posts && posts.length > 0 ? (
          posts.map((post) => {
            return (
              <Post
                key={post._id}
                postId={post._id}
                postImage={post.image.url}
               ownerName={post.owner.name}
                ownerId= {post.owner._id}
               ownerImage = {post.owner.avatar.url}
                likes={post.likes}
                caption={post.caption}
                comments={post.comments}
                isAccount={true}
                isDelete={true}
              />
            );
          })
        ) : (
          <Typography variant="h6">
            You have not created any posts yet
          </Typography>
        )}
      </div>
      <div className="accountright">
        <Avatar
          src={user.avatar.url}
          sx={{ height: "8vmax", width: "8vmax" }}
        />
        <Typography variant="h5">{user.name}</Typography>
        <div>
          <button onClick = {() => setFollowersToggle(!followersToggle)}>
            <Typography>Followers</Typography>
          </button >
          <Typography>{user.followers.length}</Typography>
        </div>
        <div>
          <button onClick={() => setFollowingToggle(!followingToggle)}>
            <Typography>Following</Typography>
          </button>
          <Typography>{user.following.length}</Typography>
        </div>
        <div>
          <Typography>Posts</Typography>
          <Typography>{user.posts.length}</Typography>
        </div>
        <Button variant="contained" onClick={() => logOutHandler()}>LogOut</Button>
        <Link className="linkBtn" to="/update/profile">Edit Profile</Link>
        <Link className="linkBtn" to="/update/password">Change Password</Link>

        <Button
        disabled = {deleteLoading ? true : false}
        onClick = {(e) => deleteProfileHandler(e)}
          variant="text"
          style={{
            color: "red",
            margin: "2vmax",
          }}
        >
          Delete My Profile
        </Button>
      <Dialog open={followersToggle} onClose={() => setFollowersToggle(!followersToggle)}>
        <div className="DialogBox">
          <Typography variant="h4">Followers </Typography>
          {
            user && user.followers.length > 0 ? (user.followers.map((follower) => {
              return <User
                key={follower._id}
                userId={follower._id}
                name={follower.name}
                avatar={follower.avatar.url}
              />
             })) : <Typography>You don't have any followers</Typography>
          }
        </div>
      </Dialog>
      <Dialog open={followingToggle} onClose={() => setFollowingToggle(!followingToggle)}>
        <div className="DialogBox">
          <Typography variant="h4">Following </Typography>
          {
            user && user.following.length > 0 ? (user.following.map((follower) => {
              return <User
                key={follower._id}
                userId={follower._id}
                name={follower.name}
                avatar={follower.avatar.url}
              />
             })) : <Typography>You aren't following anyone</Typography>
          }
        </div>
      </Dialog>

      </div>
    </div>
  );
};
export default Account;
