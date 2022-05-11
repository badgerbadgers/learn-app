import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import ResourceCard from "./components/ResourceCard";
import minifyItems from "../../../lib/minifyItems";
import ResourceToolBar from "./components/ResourceToolBar";
import { getResourceData } from "../../../lib/airtable";

function Resources({ resources }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeResources, setActiveResources] = useState(resources);
  const [filterTerm, setFilterTerm] = useState("");

  // We want a function that we can search by: name, type, topic, language, and description
  // Create a function that save in array the results temporary the element
  // The input will be a string which is "search term"
  // initialize the variable before to use and loop the array
  // The results by topic and language should be "looped" through the array
  // changing that string values into lowercase using the toLowerCase method
  // The return will be the filtered array
  const searchResults = (term, isFilter) => {
    const array = isFilter ? activeResources : resources;
    return array.filter((item) => {
      const itemName = item.fields.Name ? item.fields.Name.toLowerCase() : "";
      const itemDescription = item.fields.Description
        ? item.fields.Description.toLowerCase()
        : "";
      const itemType = item.fields.Type ? item.fields.Type.toLowerCase() : "";
      const topicSearchResults = item.fields["Name (from topic)"]
        ? item.fields["Name (from topic)"].map((topic) => topic.toLowerCase())
        : [];
      const languageSearchResults = item.fields["Name (from language)"]
        ? item.fields["Name (from language)"].map((language) =>
            language.toLowerCase()
          )
        : [];
      return (
        languageSearchResults.includes(term.toLowerCase()) ||
        topicSearchResults.includes(term.toLowerCase()) ||
        itemName.includes(term.toLowerCase()) ||
        itemDescription.includes(term.toLowerCase()) ||
        itemType.includes(term.toLowerCase())
      );
    });
  };

  useEffect(() => {
    if (searchTerm) {
      const newList = searchResults(searchTerm);
      setActiveResources(newList);
    }
  }, [searchTerm]);

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
        filterTerm={filterTerm}
        setFilterTerm={setFilterTerm}
        setSearchTerm={setSearchTerm}
      />

      {/* 
        If the condition is true, the element right after && will be rendered. 
        If it is false, the program will ignore and skip it. 
      */}

      {activeResources &&
        activeResources.map((resource) => {
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
    },
  };
}
