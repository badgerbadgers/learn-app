import React, { useState } from "react";
import ProjectHeader from "./components/ProjectHeader";
import ProjectCards from "./components/ProjectCards";
import { Grid } from "@mui/material";
import { getProjectsData } from "../../lib/airtable";

const MyProjects = ({data}) => {
  // console.log('***data****' + data.map((doc) => doc.fields['Project Name']))
  return (
    <Grid
      container
      alignItems="center"
      sx={{ maxWidth: "1250px", margin: "auto"}}
    >
      <ProjectHeader />
      <ProjectCards />
    </Grid>
  );
};

export default MyProjects;

export async function getServerSideProps() { 
  const data = await getProjectsData();
  return {
    props: {
      data,
    }
  } 
}