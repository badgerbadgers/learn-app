import React from "react";
import { Grid } from "@mui/material";
import ResourceCard from "./components/ResourceCard";
import { makeStyles } from "@mui/styles";
import minifyItems from "../api/minifyItems";

// Setting the styles on the root element of ResourceCard component
const useStyles = makeStyles((theme) => ({
  griContainer: {
    paddingLeft: "20px",
    paddingRight: "20px",
    marginTop: "5px",
  },
}));

function Resources({ resources }) {
  const classes = useStyles();
  console.log("RESOURCES:", resources);
  return (
    <Grid
      container
      spacing={2}
      className={classes.griContainer}
      justifyContent="center"
      // sx={{alignItems: "stretch"}}
    >
      {/* 
      xs=12 Each card will take entire row, and sm=6 will be two cards in row
      md=3 will be displayed 4 cards in one row.
      */}
      {resources.map((resource) => {
        return (
          <Grid item xs={12} sm={6} md={4} sx={{alignItems: "stretch"}}>
            <ResourceCard resource={resource} />
          </Grid>
        );
      })}
    </Grid>
  );
}

export default Resources;

export async function getServerSideProps(context) {
  const Airtable = require("airtable");
  const base = new Airtable({ apiKey: process.env.AT_KEY }).base(
    process.env.AIRTABLE_BASE_ID
  );
  try {
    const items = await base("resources").select().all();
    const data = JSON.parse(JSON.stringify(items));
    console.log("Data:", data);
    return {
      props: {
        resources: minifyItems(data),
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        err: "Something went wrong 😕",
      },
    };
  }
}
