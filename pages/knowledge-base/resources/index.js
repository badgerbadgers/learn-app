import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import ResourceCard from "./components/ResourceCard";
import minifyItems from "../../../lib/minifyItems";
import ResourceToolBar from "./components/ResourceToolBar";
import { getResourceData } from "../../../lib/airtable";

function Resources({ resources }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterResources, setFilterResources] = useState([])
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

    const filteredResultByType = resources.filter((item) => {
      if (item.fields.Type) {
        return item.fields.Type.toLowerCase().includes(term.toLowerCase());
      }
    });

    const filteredResultByDescription = resources.filter((item) => {
      if (item.fields.Description) {
        return item.fields.Description.toLowerCase().includes(term.toLowerCase())
      }
    });
    const filteredResultByTopic = resources.filter((item) => {
      if (item.fields["Name (from topic)"]) {
        // initialize the variable before to use and loop the array
        let topicToLowerCase = item.fields["Name (from topic)"];
        return topicToLowerCase.map((item) => {
          item.toLowerCase().includes(term.toLowerCase())
        }); 
      }
    });

    const filteredResultByLanguage = resources.filter((item) => {
      if (item.fields["Name (from language)"]) {
        // initialize the variable before to use and loop the array
        let languageToLowerCase = item.fields["Name (from language)"];
        return languageToLowerCase.map((item) => {
          item.toLowerCase().includes(term.toLowerCase())
        });
      }
    });

    // Remove duplicates resources before pushing to tempResults
    // Will push all to the temporary result array and return it
    const removeDuplicateResources = resources.filter((item, id, tempResults) => {
      return tempResults.indexOf(item) === id;
    });

    tempResults.push(
      ...filteredResultByName,
      ...filteredResultByType,
      ...filteredResultByDescription,
      ...filteredResultByTopic,
      ...filteredResultByLanguage
    );
    console.log("TEMPRESULTS", removeDuplicateResources);
    return tempResults;
  };
  
  searchResults("w3");

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
      {resources &&
        resources.map((resource) => {
          return <ResourceCard key={resource.id} resource={resource} />;
        })
      }
      {/* {filterResources &&
        filterResources.map((resource) => {
          return <ResourceCard key={resource.id} resource={resource} />;
        })
      } */}
      {/* {filteredCards &&
        filteredCards.map((resource) => {
          return <ResourceCard key={resource.id} resource={resource} />;
        })
      } */}
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
