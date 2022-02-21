import React from "react";
import MediaCards from "./components/MediaCards";
import ContactCards from "./components/ContactCards";
import SkillsCards from "./components/SkillsCards";
import PreviousIndustryCards from "./components/PreviousIndustryCards";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";


// // Fixed number of columns
const gridContainer = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gridTemplateRows: "auto"
};

const gridItem = {
  margin: "8px",
  border: "1px solid red",
  width: "100%"
};

function Cards() {
  return (
      <Grid container p={2} sx={gridContainer} >
        <Grid item xs={12} sx={gridItem}>
          <ContactCards />
        </Grid>
        <Grid item xs={12} sx={gridItem} > 
          <MediaCards  />
        </Grid>
        <Grid item xs={12} sx={gridItem}>
          <SkillsCards/>
        </Grid>
        <Grid item xs={12} sx={gridItem}>
          <PreviousIndustryCards />
        </Grid>
      </Grid>
  );
}

export default Cards;