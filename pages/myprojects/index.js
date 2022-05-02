import React, { useState } from "react";
import ProjectHeader from "./components/ProjectHeader";
import ProjectCards from "./components/ProjectCards";
import { Grid } from "@mui/material";

const MyProjects = () => {
  return (
    <Grid
      container
      xs={12}
      justify="center"
      sx={{ maxWidth: "1250px", margin: "auto" }}
    >
      <ProjectHeader />
      <ProjectCards />
    </Grid>
  );
};

export default MyProjects;
