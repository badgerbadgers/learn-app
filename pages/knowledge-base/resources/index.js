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

  console.log("RESOURCES:", resources);

  // We want a function that we can search by: name, type, topic, language, and description
  // Create a function that save in array the results temporary the element
  // The input will be a string which is "search term"
  // The results by topic and language should be "looped" through the array
  // Remove duplicates before pushing to tempResults
  // The return will be the filtered array

  const searchResults = (term) => {
    const tempResults = [];
    const filteredResultByName = resources.filter((item) => {
      return item.fields.Name.toLowerCase().includes(term.toLowerCase());
    });
    console.log("*filteredResultByName*", filteredResultByName);

    const filteredResultByType = resources.filter((item) => {
      if (item.fields.Type) {
        return item.fields.Type.toLowerCase().includes(term.toLowerCase());
      }
    });

    console.log("*filteredResultByType*", filteredResultByType);

    const filteredResultByDescription = resources.filter((item) => {
      if (item.fields.Description) {
        return item.fields.Description.toLowerCase().includes(
          term.toLowerCase()
        );
      }
    });
    console.log("*filteredResultByDescription*", filteredResultByDescription);

    // remove the map and use for loop
    // Inside the loop item.fields["Name (from topic)"][i]
    // each element inside the loop to when is tru return it to tempResults
    // changing that string values into lowercase using the toLowerCase method.

    const filteredResultByTopic = resources.filter((item) => {
      if (item.fields["Name (from topic)"]) {
        // initialize the variable before to use and loop the array
        let topicResourcesResults = item.fields["Name (from topic)"];
        for (let i = 0; i < topicResourcesResults.length; i++) {
          // console.log("topicResourcesResults", topicResourcesResults[i]);
          return topicResourcesResults[i]
            .toLowerCase()
            .includes(term.toLowerCase());
        }
      }
    });
    console.log("*filteredResultByTopic*", filteredResultByTopic);

    const filteredResultByLanguage = resources.filter((item) => {
      if (item.fields["Name (from language)"]) {
        // initialize the variable before to use and loop the array
        let languageResourcesResults = item.fields["Name (from language)"];
        for (let i = 0; i < languageResourcesResults.length; i++) {
          // console.log("languageResourcesResults", languageResourcesResults[i]);
          return languageResourcesResults[i]
            .toLowerCase()
            .includes(term.toLowerCase());
        }
      }
    });
    console.log("*filteredResultByLanguage*", filteredResultByLanguage);

    tempResults.push(
      ...filteredResultByName,
      ...filteredResultByType,
      ...filteredResultByDescription,
      ...filteredResultByTopic,
      ...filteredResultByLanguage
    );
    // Remove duplicates resources before pushing to tempResults
    // Will push all to the temporary result array and return it
    const removeDuplicateResources = tempResults.filter((item, id) => {
      return tempResults.indexOf(item) === id;
    });

    console.log("**REMOVE DUPLICATE**", removeDuplicateResources);
    return removeDuplicateResources;
  };

  searchResults("javaScript");

  const handleSelectChange = () => {
    handleSelectAll();
    handleClickOption();
  };

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
        })
      }
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
