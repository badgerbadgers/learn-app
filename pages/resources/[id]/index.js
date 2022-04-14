import React from "react";
import { Grid } from "@mui/material";
import ResourceCards from "./componentes/ResourceCards";
import { makeStyles } from "@mui/styles";

// Setting the styles on the root element of ResourceCard component
const useStyles = makeStyles((theme) => ({
  griContainer: {
    paddingLeft: "20px",
    paddingRight: "20px",
    marginTop: "5px",
  }
}));
function Resources() {
  const classes = useStyles();
  return (
    <Grid
      container spacing={2}
      className={classes.griContainer}
      justifyContent="center"
    >
      {/* 
      xs=12 Each card will take entire row, and sm=6 will be two cards in row
      md=3 will be displayed 4 cards in one row.
      */}
      <Grid item xs={12} sm={6} md={3}>
        <ResourceCards />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <ResourceCards />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <ResourceCards />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <ResourceCards />
      </Grid>
    </Grid>
  );
}

export default Resources;
