import React, { useState } from "react";
import ProjectHeader from "./components/ProjectHeader";
import ProjectCards from "./components/ProjectCards";
import { Grid } from "@mui/material";

const MyProjects = () => {
  return (
    <Grid
      container
      alignItems="center"
      xs={12}
      sx={{ maxWidth: "1250px", margin: "auto"}}
    >
      <ProjectHeader />
      <ProjectCards />
    </Grid>
  );
};

export default MyProjects;
