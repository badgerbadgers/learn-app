import React from "react";
import { Grid } from "@mui/material";
import ResourceCard from "./components/ResourceCard";
import minifyItems from "../../../lib/minifyItems";
import ReseourceToolBar from "./components/ReseourceToolBar";

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
      <ReseourceToolBar />
      <Grid item xs={12} marginLeft="25px" color="blue">Available Resources</Grid>
      {resources && resources.map((resource) => {
          return <ResourceCard key={resource.id} resource={resource} />;
      })}
    </Grid>
  );
}

export default Resources;
// Resources.auth = {
//   role: "admin",
//   // loading: <AdminLoadingSkeleton />,
//   unauthorized: "/", // redirect to this url
// }

export async function getServerSideProps(context) {
  const Airtable = require("airtable");
  const base = new Airtable({ apiKey: process.env.AT_KEY }).base(
    process.env.AIRTABLE_BASE_ID
  );
  try {
    // Create the items constant to select all base resources from the items table
    // Then saved the items as data that is send as json file
    // Finally, it will send the items as resources by minify items data.
    const items = await base("resources").select().all();
    const data = JSON.parse(JSON.stringify(items));
  
    return {
      props: {
        resources: minifyItems(data),
      }
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        err: "Something went wrong 😕",
      }
    };
  }
}
