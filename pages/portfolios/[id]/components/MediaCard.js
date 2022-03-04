import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    // background: "linear-gradient(45deg, #2196F3 30%, #1FF4F1 90%)",
  },
}));

const card = {
  height: "100%",
};

function MediaCard({videoUrl}) {
  const classes = useStyles();
  return (
    <Card className={classes.container} sx={card}>
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
