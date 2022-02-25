import React from "react";
import MediaCards from "./components/MediaCards";
import ContactCards from "./components/ContactCards";
import SkillsCards from "./components/SkillsCards";
import PreviousIndustryCards from "./components/PreviousIndustryCards";
import { Grid } from "@mui/material";

// // Fixed number of columns
const gridContainer = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gridTemplateRows: "auto",
};

function Cards() {
  return (
    <Grid container p={2} sx={gridContainer} spacing={2}>
      <Grid item xs={12} md={8}>
        <ContactCards />
      </Grid>
      <Grid item xs={12} md={8}>
        <MediaCards />
      </Grid>
      <Grid item xs={12} md={8}>
        <SkillsCards />
      </Grid>
      <Grid item xs={12} md={8}>
        <PreviousIndustryCards />
      </Grid>
    </Grid>
  );
}

export default Cards;
