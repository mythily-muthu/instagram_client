import axios from "axios";
import { URL } from "helper";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  // ALL USERS POSTS
  const getPosts = async () => {
    const response = await axios.get(`${URL}/posts`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const posts = response.data;
    console.log("posts:", posts);
    dispatch(setPosts({ posts }));
  };

  const getUserPosts = async () => {
    const response = await axios.get(`${URL}/posts/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    let posts = response.data;

    dispatch(setPosts({ posts }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
    // eslint-disable-next-line
  }, [userId, isProfile, token]);
  return (
    <>
      {posts.map((post) => (
        <PostWidget
          key={post._id}
          postId={post._id}
          postUserId={post.userId}
          name={`${post.firstName} ${post.lastName}`}
          description={post.description}
          location={post.location}
          picturePath={post.picturePath}
          userPicturePath={post.userPicturePath}
          likes={post.likes}
          comments={post.comments}
        />
      ))}
    </>
  );
};

export default PostsWidget;
