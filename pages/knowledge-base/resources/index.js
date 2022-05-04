import React, { useState } from "react";
import { Grid } from "@mui/material";
import ResourceCard from "./components/ResourceCard";
import minifyItems from "../../../lib/minifyItems";
import ResourceToolBar from "./components/ResourceToolBar";

function Resources({ resources }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("Type");

  console.log("RESOURCES:", resources);

  // We want a function that we can search by: name, type, topic, language, and description
  // Create a function that save in array the results temporary the element
  // The input will be a string which is "search term"
  // The return will be the filtered array
  // Remove duplicates before pushing to tempResults
  // Result by topic and language we need to loop through the array
  const searchResults = (term) => {
    const tempResults = [];
    const filteredResultByName = resources.filter((item) => {
      return item.fields.Name.toLowerCase().includes(term.toLowerCase());
    });

    const filteredResultByType = resources.filter((item) => {
      if (item.fields.Type) {
        // console.log("ITEM", item.fields.Type);
        return item.fields.Type.toLowerCase().includes(term.toLowerCase());
      }
    });
    const filteredResultByDescription = resources.filter((item) => {
      if (item.fields.Description) {
        // console.log("ITEM", item.fields.Description);
        return item.fields.Description.toLowerCase().includes(term.toLowerCase())
      }
    });
    const filteredResultByTopic = resources.filter((item) => {
      if (item.fields["Name (from topic)"]) {
        // console.log("ITEM TOPIC", item.fields["Name (from topic)"]);
        return item.fields["Name (from topic)"][0].toLowerCase().includes(term.toLowerCase()); 
      }
    });
    // console.log("TOPIC",filteredResultByTopic);
    const filteredResultByLanguage = resources.filter((item) => {
      if (item.fields["Name (from language)"]) {
        // console.log("ITEM Language", item.fields["Name (from language)"]);
        return item.fields["Name (from language)"][0].toLowerCase().includes(term.toLowerCase());
      }
    });
    
    // Will push all to the temporary result array and return it
    tempResults.push(
      ...filteredResultByName,
      ...filteredResultByType,
      ...filteredResultByDescription,
      ...filteredResultByTopic,
      ...filteredResultByLanguage
    );
    console.log("FILTERTOPIC:", filteredResultByTopic);
    console.log("FILTERLANGUAGE:", filteredResultByLanguage);
    console.log("TEMPRESULTS", tempResults);
  };

  searchResults("javascript");

  const handleSelectChange = () => {
    handleSelectAll();
    handleClickOption();
  };

  let filteredCards = resources.filter((item) => {
    // console.log(item.fields[filterType])
    if (item.fields.Name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return true;
    } else {
      return false;
    }
  });

  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      sx={{
        paddingLeft: "20px",
        paddingRight: "20px",
        marginTop: "5px",
        marginBottom: "25px",
      }}
    >
      <ResourceToolBar
        resources={resources}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setFilterType={setFilterType}
        onChange={handleSelectChange}
      />
      <Grid item xs={12} marginLeft="25px" color="blue">
        Available Resources
      </Grid>

      {filteredCards &&
        filteredCards.map((resource) => {
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
