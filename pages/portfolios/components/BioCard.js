import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

const card = {
  height: "100%",
};

function BioCard({ bio }) {
  return (
    <Card sx={card}>
      <CardContent sx={{ height: "100%" }}>
        <Typography variant="h6" gutterBottom>
          Summary
        </Typography>
        <Paper
          sx={{
            height: "90%",
          }}
        >
          <Typography variant="body1" sx={{ fontStyle: "italic", px: 1 }}>
            {bio}
          </Typography>
        </Paper>
      </CardContent>
    </Card>
  );
}

export default BioCard;
