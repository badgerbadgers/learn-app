import React from "react";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function LessonHeader({ title }) {
  return (
    // To Do: create functionality for buttons
    
    <Card sx={{ mb: "1em", boxShadow: "none" }}>
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          varriant="text"
          startIcon={<ArrowBackIcon />}
          sx={{ color: "black" }}
        >
          Previous Lesson
        </Button>
        <Button
          variant="text"
          endIcon={<ArrowForwardIcon />}
          sx={{ color: "black" }}
        >
          Next Lesson
        </Button>
      </CardActions>

      <CardHeader
        title={title}
        titleTypographyProps={{
          variant: "h4",
          align: "center",
          color: "#FF5C35",
          fontSize: "54px",
          position: "relative",
          top: "8px",
          gutterBottom: true,
        }}
      />
      <Typography variant="h6" sx={{ textAlign: "center" }}>
        Week Date
      </Typography>
      <Typography variant="body1" sx={{ textAlign: "center" }}>
        Date
      </Typography>
    </Card>
  );
}
