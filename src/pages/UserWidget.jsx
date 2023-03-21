import {
  EditOutlined,
  LocationOnOutlined,
  ManageAccountsOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import { Box, Divider, Typography, useTheme } from "@mui/material";

import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
// import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserWidget = ({ userId, picturePath }) => {
  // const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();

  let user = useSelector((state) => state.user);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  // calling api to grab the user
  // const getUser = async () => {
  //   let Url = `http://localhost:7000/users/${userId}`; //getting the user details with id
  //   let response = await axios.get(Url, {
  //     headers: { Authorization: `Bearer ${token}` },
  //   });

  //   setUser(response.data);
  // };
  // useEffect(() => {
  //   getUser();
  // }, []);

  // if (!user) {
  //   return null;
  // }

  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends,
  } = user;
  console.log("user:", user);
  return (
    <WidgetWrapper>
      {/* FIRST ROW */}
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>{friends.length} friends</Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined />
      </FlexBetween>
      <Divider />

      {/* SECOND ROW */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{occupation}</Typography>
        </Box>
      </Box>
      <Divider />
      {/* THIRD ROW */}
      <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color={medium}>Who's viewed your profile</Typography>
          <Typography color={main} fontWeight="500">
            {viewedProfile}
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color={medium}>Who's viewed your profile</Typography>
          <Typography color={main} fontWeight="500">
            {impressions}
          </Typography>
        </FlexBetween>
      </Box>
      <Divider />
      {/* FOURTH ROW */}
      <Box p="1rem 0">
        <Typography>Social Profiles</Typography>
        {/* twitter */}
        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg4UyCGJ84IQdidIDvyaDHHxjML2kyxT-oDg&usqp=CAU"
              alt="twitter"
              width="20px"
              sx={{ color: main }}
              height="20px"
            />
            <Box>
              <Typography color={main}>Twitter</Typography>
              <Typography color={medium}>Social NetWork</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined />
        </FlexBetween>
        {/* linkedin */}
        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <img
              src="https://png.pngtree.com/element_our/md/20180509/md_5af2d4cb7fc9b.jpg"
              alt="linkedin"
              width="20px"
              sx={{ color: main }}
              height="20px"
            />
            <Box>
              <Typography color={main}>Linkedin</Typography>
              <Typography color={medium}>NetWork Platform</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined />
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
