import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const card = {
  height: "100%",
};

function BioCard({bio}) {
  return (
    <Card sx={card}>
      <CardContent>
        <Typography variant="h5"  >
          'Bio'
        </Typography><Typography variant="body1"  >
          {'Bio tell us about yourself'}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default BioCard;
