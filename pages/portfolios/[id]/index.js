import React from "react";
import MediaCards from "./components/MediaCards";
import ContactCards from "./components/ContactCards";
import SkillsCards from "./components/SkillsCards";
import PreviousIndustryCards from "./components/PreviousIndustryCards";
import { Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";

function Cards() {
  return (
    <Box p={2}>
      <Grid item xs={12} sm={6} lg={3}>
        <Typography>Logo</Typography>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} lg={3}>
          <ContactCards />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <MediaCards />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <SkillsCards />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <PreviousIndustryCards />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Cards;