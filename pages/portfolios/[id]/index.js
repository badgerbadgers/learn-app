import React from "react";
import MediaCards from "./components/MediaCards";
import ContactCards from "./components/ContactCards";
import SkillsCards from "./components/SkillsCards";
import PreviousIndustryCards from "./components/PreviousIndustryCards";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    background: 'linear-gradient(45deg, #2196F3 30%, #1FF4F1 90%)',
    padding: "1rem",      
  }
}))

function Cards() {
  const { container } = useStyles()
  return (
    <Box p={2} className={container}>
      <Grid item xs={12} sm={6} lg={3}>
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