import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper"

const card = {
  height: "100%",
};

function BioCard({bio}) {
  return (
    <Card sx={card}>
      <CardContent>
        <Typography variant="h6" gutterBottom  >
          Summary
        </Typography>
        <Paper
          sx={{
            //display: "flex",
            //flexWrap: "wrap",
            
            p: 0.5,
            m: 0,
          }}
          
        >
        <Typography variant="body1" sx={{fontStyle: "italic"}}  >
        {bio}
          {'Bio tell us about yourself'}
          {'Bio tell us about yourself'}
          {'Bio tell us about yourself'}
          {'Bio tell us about yourself'}
          {'Bio tell us about yourself'}
          {'Bio tell us about yourself'}
          {'Bio tell us about yourself'}
          {'Bio tell us about yourself'}
          {'Bio tell us about yourself'}
        </Typography>
        </Paper>
      </CardContent>
    </Card>
  );
}

export default BioCard;
