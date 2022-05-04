import React from "react";
import { Grid } from "@mui/material";
import ResourceCard from "./components/ResourceCard";
import minifyItems from "../../../lib/minifyItems";
import { getResourceData } from "../../../lib/airtable";

function Resources({ resources }) {

  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      sx={{
        paddingLeft: "20px",
        paddingRight: "20px",
        marginTop: "5px",
        marginBottom: "25px"
      }}
    >
      {resources && resources.map((resource) => {
          return <ResourceCard key={resource.id} resource={resource} />;
      })}
    </Grid>
  );
}

export default Resources;

export async function getServerSideProps() {
 const data = await getResourceData();
      // Send the data as resources by minify data.  
    return {
      props: {
        resources: minifyItems(data),
      }
    };
  } 
