import React, { useState, useEffect } from "react";
import { Grid, Card } from "@mui/material";
import ResourceCard from "./components/ResourceCard";
import minifyItems from "../../../lib/minifyItems";
import ResourceToolBar from "./components/ResourceToolBar";
import { getResourceData } from "../../../lib/airtable";

function Resources({ resources }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterResources, setFilterResources] = useState([]);
  const [filterType, setFilterType] = useState("Type");

  // useEffect(() => {
  //   setFilterResources(searchResults(searchTerm))
  // }, [searchTerm])

  console.log("***RESOURCES***", resources);

  // We want a function that we can search by: name, type, topic, language, and description
  // Create a function that save in array the results temporary the element
  // The input will be a string which is "search term"
  // initialize the variable before to use and loop the array
  // The results by topic and language should be "looped" through the array
  // changing that string values into lowercase using the toLowerCase method
  // Remove duplicates before pushing to tempResults
  // The return will be the filtered array

  const searchResults = (term) => {
    const tempResults = [];
    let filteredResults = resources.filter((item) => {
      if (
        item.fields.Name ||
        item.fields.Type ||
        item.fields.Description ||
        item.fields["Name (from topic)"] ||
        item.fields["Name (from language)"]
      ) {
        // check if this term exist if not return empty array
        const lowerCaseName = item.fields.Name ? item.fields.Name.toLowerCase() : [];
        const lowerCaseType = item.fields.Type ? item.fields.Type.toLowerCase() : [];
        const lowerCaseDescription = item.fields.Description ? item.fields.Description.toLowerCase() : [];
        let topicSearchResults = item.fields['Name (from topic)'] ? item.fields['Name (from topic)'].map(topic => topic.toLowerCase()) : [];
        let languageSearchResults = item.fields['Name (from language)'] ? item.fields['Name (from language)'].map(topic => topic.toLowerCase()) : [];

        return (
          lowerCaseName.includes(term.toLowerCase()) ||
          lowerCaseType.includes(term.toLowerCase()) ||
          lowerCaseDescription.includes(term.toLowerCase()) ||
          (topicSearchResults && topicSearchResults.includes(term.toLowerCase())) ||
          (languageSearchResults && languageSearchResults.includes(term.toLowerCase()))
        );
      }
    });

    console.log("*filteredResults*", filteredResults);

    tempResults.push(filteredResults);

    // Remove duplicates resources before pushing to tempResults
    // Will push all to the temporary result array and return it
    const removeDuplicateResources = tempResults.filter((item, id) => {
      return tempResults.indexOf(item) === id;
    });

    console.log("**REMOVE DUPLICATE**", removeDuplicateResources);
    return removeDuplicateResources;
  };

  searchResults("coding");

  const handleSelectChange = () => {
    handleSelectAll();
    handleClickOption();
  };

  // let filteredCards = resources.filter((item) => {
  //   if (item.fields.Name.toLowerCase().includes(searchTerm.toLowerCase())) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  //   console.log("FILTER CARDS:", filteredCards)
  // });

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
      {/* 
        If the condition is true, the element right after && will be rendered. 
        If it is false, the program will ignore and skip it. 
      */}

      {/* {filterResources &&
        filterResources.map((resource) => {
          return <ResourceCard key={resource.id} resource={resource} />;
        })
      } */}
      {resources &&
        resources.map((resource) => {
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
