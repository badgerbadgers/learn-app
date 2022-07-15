import React from "react";
import { Typography, Box, Button } from "@mui/material";
import VideocamIcon from "@mui/icons-material/Videocam";
import CommentIcon from "@mui/icons-material/Comment";

export default function MenuHeader() {
  return (
    <Box component="div" sx={{ p: "1em" }}>
      <Typography variant="h6">Mentor Sessions</Typography>
      <Typography variant="body1">
        During this course you will sign up for a minumum of one mentor session
        a week
      </Typography>
      <Button
        href=""
        aria-label="zoom link"
        variant="text"
        component="div"
        startIcon={<VideocamIcon />}
        sx={{ color: "#338AAF", textTransform: "lowercase" }}
      >
        zoom link
      </Button>

      <Button
        href=""
        aria-label="slack announcements"
        variant="text"
        component="div"
        startIcon={<CommentIcon />}
        sx={{ color: "#338AAF", textTransform: "lowercase" }}
      >
        slack announcements
      </Button>
    </Box>
  );
}
