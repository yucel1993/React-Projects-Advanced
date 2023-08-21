import React from "react";
import { Grid, Paper, Box, Button } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const BlogCard = ({
  id,
  image,
  title,
  content,
  publish_date,
  author,
  likes,
  comment_count,
  post_views,
}) => {
  const {token} =useSelector((state)=>state.auth)
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  // Function to limit the number of words in the content
  const limitContent = (content, limit) => {
    const contentArray = content.split(" ");
    const limitedContent = contentArray.slice(0, limit).join(" ");
    return limitedContent + (contentArray.length > limit ? "..." : "");
  };

  const limitedContent = limitContent(content, 15);
  const formattedDate = new Date(publish_date).toLocaleString("en-US", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  const handleLikeClick = async () => {
    console.log(likes,"likes that from component did upload")
    console.log(likeCount,"likes that likes")
    try {
      if (liked) {
        // Unlike the post
        await axios.post(
          `http://32272.fullstack.clarusway.com/api/likes/${id}/`
        );
        setLikeCount(likeCount - 1);
        setLiked(false);
      } else {
        // Like the post
        await axios.post(
          `http://32272.fullstack.clarusway.com/api/likes/${id}/`,
          {},
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        setLikeCount(likeCount + 1);
        setLiked(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Grid>
      <Paper
        elevation={3}
        sx={{
          width: "15rem",
          padding: "1rem",
          height: "30rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          marginLeft: "3rem",
          marginTop: "3rem",
        }}
        padding={10}
      >
        <Box sx={{ textAlign: "center" }}>
          <img width={"50%"} src={image} alt="" />
          <h2>{title}</h2>
        </Box>
        <p>{limitedContent}</p>
        <p>{formattedDate}</p>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <AccountCircleIcon />
          <p>{author}</p>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <FavoriteIcon
              color={liked ? "secondary" : "inherit"}
              onClick={handleLikeClick}
            />
            <p>{likeCount}</p>
            <ChatBubbleOutlineIcon />
            <p>{comment_count}</p>
            <VisibilityIcon />
            <p>{post_views}</p>
          </Box>
          <div>
            <Button
              variant="contained"
              onClick={() => navigate(`/detail/${id}`)}
            >
              Read More
            </Button>
          </div>
        </Box>
      </Paper>
    </Grid>
  );
};

export default BlogCard;