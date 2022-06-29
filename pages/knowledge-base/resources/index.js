import React, { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { Grid } from "@mui/material";
import ResourceCard from "./components/ResourceCard";
import minifyItems from "../../../lib/minifyItems";
import ResourceToolBar from "./components/ResourceToolBar";
import { privateLayout } from "../../../components/PrivateLayout";
import { getResourceData } from "../../../lib/airtable";

function Resources({ resources }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeResources, setActiveResources] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [topics, setTopics] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);

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


  const filterSelected = (selectedLanguages, selectedTopics, selectedTypes) => {
    
    // Filter resourses using selected languages, types and topics.
    const filteredResources = resources.filter(
      (resource) =>  {
        if (selectedLanguages.length == 0) {
          return true; 
        }
        const common = selectedLanguages.filter(
          value => resource.fields["Name (from language)"].includes(value)
        );
        return common.length > 0;
      }
    ).filter(
      (resource) =>  {
        if (selectedTopics.length == 0) {
          return true; 
        }
        const common = selectedTopics.filter(
          value => resource.fields["Name (from topic)"]?.includes(value) || false
        );
        return common.length > 0;
      }
    );
    return filteredResources;
  }


  useEffect(() => {
    if (resources) {
      setActiveResources(resources);
      const allLanguages = new Set(resources.map(resource => {
        return resource.fields["Name (from language)"] || []
      }).flat());
      const allTopics = new Set(resources.map(resource => {
        return resource.fields["Name (from topic)"] || []
      }).flat());
      const allTypes = new Set(resources.map(resource => {
        return resource.fields['Type'] || ''
      }));
      setLanguages([...allLanguages]);
      setTopics([...allTopics]);
      setTypes([...allTypes]);
    }
  }, [])

  useEffect(() => {
    let newList;
    if (searchTerm) {
      newList = searchResults(searchTerm);
    } else {
      newList = filterSelected(selectedLanguages, selectedTopics, selectedTypes);
    }
    setActiveResources(newList);
  }, [searchTerm, selectedLanguages, selectedTopics, selectedTypes]);
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
        languages={languages}
        selectedLanguages={selectedLanguages}
        setSelectedLanguages={setSelectedLanguages}
        topics={topics}
        selectedTopics={selectedTopics}
        setSelectedTopics={setSelectedTopics}
        types={types}
        selectedTypes={selectedTypes}
        setSelectedTypes={setSelectedTypes}
      />

      {/* 
        If the condition is true, the element right after && will be rendered. 
        If it is false, the program will ignore and skip it. 
      */}
      {activeResources &&
        activeResources.map((resource) => {
          if (resource) {
            return <ResourceCard key={resource.id} resource={resource} />;
          }
        })}
    </Grid>
  );
}

export default Resources;

Resources.getLayout = privateLayout;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  if (session) {
    const { user } = session;
    if(!user.hasProfile) {
      return {
        redirect: {
          destination: '/signup',
          permanent: false,
        }
      }
    }
    const data = await getResourceData();
    // Send the data as resources by minify data.
    return {
      props: {
        resources: minifyItems(data),
      },
    };
  }
}
