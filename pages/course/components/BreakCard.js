import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

export default function BreakCard({ content }) {
  return (
    <Grid item xs={12} md={9} lg={9}>
      <Card
        elevation={1}
        square
        sx={{
          backgroundColor: "#F4F5F7",
          mb: "2em",
          padding: "1em",
          boxShadow: "none",
        }}
      >
        <CardContent sx={{ my: -2 }}>
        <h3>{content}</h3></CardContent>
      </Card>
    </Grid>
  );
}
