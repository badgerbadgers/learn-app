import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";

export default function BreakCard({ content }) {
  return (
    <Card
      elevation={1}
      square
      sx={{
        backgroundColor:"syllabus.card",
        mb: "2em",
        padding: "1em",
        boxShadow: "none",
      }}
    >
      <CardHeader title={content} />
    </Card>
  );
}
