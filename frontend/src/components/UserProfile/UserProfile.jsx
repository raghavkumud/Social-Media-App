import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getUserPosts,
  getUserProfile,
  loadUser,
  logOutUser,
  deleteMyProfile,
  followAndUnfollowUser,
} from "../../Actions/User";
import Loader from "../Loader/Loader";
import Post from "../Post/Post";
import { Avatar, Typography, Button, Dialog } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import User from "../User/User";
const UserProfile = () => {
  const dispatch = useDispatch();
  const {
    loading,
    error: postError,
    posts,
  } = useSelector((state) => state.userPosts);
  const {
    error: followError,
    message,
    loading: followLoading,
  } = useSelector((state) => state.like);
  const {
    user,
    loading: userLoading,
    error: userError,
  } = useSelector((state) => state.userProfile);
  const { user: me } = useSelector((state) => state.user);

  const [followersToggle, setFollowersToggle] = useState(false);
  const [followingToggle, setFollowingToggle] = useState(false);

  const [following, setFollowing] = useState(false);
  const [myProfile, setMyProfile] = useState(false);
  const alert = useAlert();
  const params = useParams();
  const navigate = useNavigate();
  const followHandler = async (e) => {
    e.preventDefault();

    setFollowing(!following);
    console.log(following);
    await dispatch(followAndUnfollowUser(user._id));
    await dispatch(getUserProfile(params.id));
  };
  useEffect(() => {
    dispatch(getUserPosts(params.id));
    dispatch(getUserProfile(params.id));
    if (me._id === params.id) {
      setMyProfile(true);
    }
  }, [dispatch, me._id, params.id]);

  useEffect(() => {
    if (postError) {
      alert.error(postError);
      dispatch({ type: "clearErrors" });
    }
    if (userError) {
      alert.error(userError);
      dispatch({ type: "clearErrors" });
    }
    if (followError) {
      alert.error(followError);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [alert, followError, message, userError, dispatch, postError]);
  const logOutHandler = async () => {
    await dispatch(logOutUser());
    alert.success("Logged Out Successfully");
  };
  useEffect(() => {
    if (user) {
      user.followers.forEach((item) => {
        if (item._id === me._id) {
          setFollowing(true);
        }
      });
    }
  }, [user, me._id, params.id]);

  const deleteProfileHandler = async (e) => {
    await dispatch(deleteMyProfile());
    alert.success("Profile Deleted Successfully");
    await dispatch(logOutUser());
    navigate('/');
  };
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
                ownerId={post.owner._id}
                ownerImage={post.owner.avatar.url}
                likes={post.likes}
                caption={post.caption}
                comments={post.comments}
                isAccount={myProfile ? true : false}
                isDelete={myProfile ? true : false}
              />
            );
          })
        ) : (
          <Typography variant="h6">
            {myProfile ? "You have not" : "User has not"} created any posts yet
          </Typography>
        )}
      </div>
      <div className="accountright">
        {user && (
          <>
            <Avatar
              src={user.avatar.url}
              sx={{ height: "8vmax", width: "8vmax" }}
            />
            <Typography variant="h5">{user.name}</Typography>
            <div>
              <button onClick={() => setFollowersToggle(!followersToggle)}>
                <Typography>Followers</Typography>
              </button>
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
          </>
        )}
        {myProfile ? null : (
          <Button
            variant="contained"
            style={{ background: following ? "red" : "blue" }}
            onClick={(e) => followHandler(e)}
            disabled={followLoading}
          >
            {following ? "Unfollow" : "Follow"}
          </Button>
        )}
        {myProfile && (
          <>
            <Button variant="contained" onClick={() => logOutHandler()}>
              LogOut
            </Button>
            <Link to="/update/profile">Edit Profile</Link>
            <Link to="/update/password">Change Password</Link>

            <Button
              disabled={followLoading ? true : false}
              onClick={(e) => deleteProfileHandler(e)}
              variant="text"
              style={{
                color: "red",
                margin: "2vmax",
              }}
            >
              Delete My Profile
            </Button>
          </>
        )}

        <Dialog
          open={followersToggle}
          onClose={() => setFollowersToggle(!followersToggle)}
        >
          <div className="DialogBox">
            <Typography variant="h4">Followers </Typography>
            {user && user.followers.length > 0 ? (
              user.followers.map((follower) => {
                return (
                  <User
                    key={follower._id}
                    userId={follower._id}
                    name={follower.name}
                    avatar={follower.avatar.url}
                  />
                );
              })
            ) : (
              <Typography>
                {myProfile ? "You don't have" : "User doesn't has"} any
                followers
              </Typography>
            )}
          </div>
        </Dialog>
        <Dialog
          open={followingToggle}
          onClose={() => setFollowingToggle(!followingToggle)}
        >
          <div className="DialogBox">
            <Typography variant="h4">Following </Typography>
            {user && user.following.length > 0 ? (
              user.following.map((follower) => {
                return (
                  <User
                    key={follower._id}
                    userId={follower._id}
                    name={follower.name}
                    avatar={follower.avatar.url}
                  />
                );
              })
            ) : (
              <Typography>
                {myProfile ? "You aren't " : "User is not "} following anyone
              </Typography>
            )}
          </div>
        </Dialog>
      </div>
    </div>
  );
};
export default UserProfile;
