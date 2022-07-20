import React from "react";
import { Card, CardHeader, Button,CardActions,  Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";


export default function LessonHeader() {
 
  return (
  
    <>
   
      <Card sx={{ mb: "1em" }} style={{ boxShadow: "none" }}>
        <CardActions sx={{display:"flex", justifyContent:"space-between"}}>
          <Button
            varriant="text"
            startIcon={<ArrowBackIcon />}
            sx={{color:"black"}}
          >
            Previous Lesson
          </Button>
          <Button
            variant="text"
            endIcon={<ArrowForwardIcon />}
            sx={{color:"black"}}
          >
            Next Lesson
          </Button>
        </CardActions>

        <CardHeader
          // key={key}
          title="Title"
          titleTypographyProps={{
            variant: "h4",
            align: "center",
            color: "#FF5C35",
            fontSize: "54px",
            position: "relative",
            top: "8px",
           gutterBottom: true
          }}
        />
        <Typography variant="h6" sx={{textAlign:"center"}}>Week Date</Typography>
        <Typography variant="body1" sx={{textAlign:"center"}}> Date</Typography>
      </Card>
    </>
  );
}
