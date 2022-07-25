import React, { useEffect, useSyncExternalStore } from 'react';
import './Home.css';
import User from '../User/User';
import Post from '../Post/Post';
import { useDispatch, useSelector } from 'react-redux';
import { getFollowingPosts, getAllUsers } from '../../Actions/User';
import Loader from '../Loader/Loader';
import { Typography } from '@mui/material';
import { useAlert } from 'react-alert';
export default function HomePage() {
    const dispatch = useDispatch();
    const {loading, posts, error} = useSelector(state => state.postOfFollowing);
    const {users, usersLoading} = useSelector((state) => state.allUsers)
    console.log("posts in Home.jsx", posts);
    const {error: likeError, message} = useSelector((state) => state.like);
    const alert = useAlert();
    useEffect(() => {
        dispatch(getFollowingPosts());
        dispatch(getAllUsers());
    },[dispatch])

    useEffect(() => {
        if (likeError) {
            alert.error(likeError);
            dispatch({type: "clearErrors"})
        }
        if (message) {
            alert.success(message);
            dispatch({type: "clearMessage"})
        }
    }, [alert, likeError, message, error, dispatch])

    return (
       loading || usersLoading ? <Loader/> :
        <div className='home'>
            <div className='homeleft'>
                {
                    posts && posts.length > 0 ? posts.map( (post) => {
                        return <Post 
                        key = {post._id}
                        postId= {post._id}
                        postImage={post.image.url}
                        ownerName={post.owner.name}
                        ownerId= {post.owner._id}
                        ownerImage = {post.owner.avatar.url}
                        likes = {post.likes}
                        caption={post.caption}
                        comments = {post.comments}
                        />
                    }) : <Typography variant="h6">No posts yet</Typography>
                }
            </div>
            <div className='homeright'>
                {
                    users && users.length > 0 ? users.map((user) => {return ( 
                        <User
                        key = {user._id}
                        userId={user._id}
                        name= {user.name}
                        avatar={user.avatar.url}
                        />
                    )}) : <Typography variant="h6">No users yet</Typography>
                }
            </div>
        </div>
    )
}
