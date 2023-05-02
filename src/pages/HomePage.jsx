import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import AdvertWidget from "./AdvertWidget";
import FriendListWidget from "./FriendListWidget";
import MyPostWidget from "./MyPostWidget";
import Navbar from "./Navbar";
import PostsWidget from "./PostsWidget";
import UserWidget from "./UserWidget";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const user = useSelector((state) => state.user);
  if (!user) return null;
  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={user._id} picturePath={user.picturePath} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={user.picturePath} />
          <PostsWidget userId={user._id} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdvertWidget />
            <Box m="2rem 0" />
            <FriendListWidget userId={user._id} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
