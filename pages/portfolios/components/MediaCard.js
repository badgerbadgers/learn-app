import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const card = {
  height: "100%",
};

function MediaCard({videoUrl}) {
  return (
    <Card sx={card}>
      <CardContent>
        <CardMedia
          controls
          component="iframe"
          height="auto"
          src={videoUrl}
        />
        <Typography sx={{ fontSize: 12 }} color="text.secondary">
          Source: Youtube
        </Typography>
      </CardContent>
    </Card>
  );
}

export default MediaCard;
