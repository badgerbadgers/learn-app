import React, { useState } from "react";
import ProjectHeader from "./components/ProjectHeader";
import ProjectCards from "./components/ProjectCards";
import { Grid } from "@mui/material";
import { getDevelopersData, getProjectsData } from "../../lib/airtable";
import { privateLayout } from "../../components/PrivateLayout";

const MyProjects = ({projectsData, developerData}) => {
  
  console.log(projectsData)
  //console.log(developerData)
  return (
    <Grid
      container
      alignItems="center"
      sx={{ maxWidth: "1250px", margin: "auto"}}
    >
      <ProjectHeader />
      {projectsData && projectsData.map((project) => 
            <ProjectCards key={project.id} project={project.fields} /> )
      }
      
    </Grid>
  );
};

export default MyProjects;

MyProjects.getLayout = privateLayout

export async function getServerSideProps() { 
  const projectsData = await getProjectsData();
  const developerData = await getDevelopersData()
  return {
    props: {
      projectsData : projectsData,
      developerData: developerData,
    }
  } 
}