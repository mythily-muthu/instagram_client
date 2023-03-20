import { Box, useMediaQuery } from "@mui/material";
// import axios from "axios";
// import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import FriendListWidget from "./FriendListWidget";
import MyPostWidget from "./MyPostWidget";

import Navbar from "./Navbar";
import PostsWidget from "./PostsWidget";
import UserWidget from "./UserWidget";

const ProfilePage = ({ picturePath }) => {
  // const [user, setUser] = useState(null);
  const { userId } = useParams();
  // const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  // const getUser = async () => {
  //   const response = await axios.get(`${URL}/users/${userId}`, {
  //     headers: { Authorization: `Bearer ${token}` },
  //   });
  //   const data = response.data;
  //   setUser(data);
  // };

  // useEffect(() => {
  //   getUser();
  // }, []);

  // if (!user) return null;

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={userId} picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <FriendListWidget userId={userId} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <PostsWidget userId={userId} isProfile />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
