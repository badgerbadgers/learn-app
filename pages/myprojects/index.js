import React, { useState } from "react";
import ProjectHeader from "./components/ProjectHeader";
import ProjectCards from "./components/ProjectCards";
import { Grid } from "@mui/material";
import { getDevelopersData, getProjectsData } from "../../lib/airtable";
import { privateLayout } from "../../components/PrivateLayout";
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { MinifyRecords } from "./components/MinifyRecords";

const MyProjects = ({projectsData, developerData, session}) => {
  const [MyProjectsData, setMyProjectsData] = useState({});
console.log(session)

  // useEffect(() => {
  //   if (id) {
  //     try{
  //       projectsData && projectsData.map((project) => 
  //         if(project.fields.Developer)
  //         }catch (error){
  //           console.log(error, "error from getData in /api/usersprofile");
  //       };
  //     }
  // }, [id]);
  
  console.log(projectsData , '**********PRD****')
  console.log(developerData , "**Dev**")
  return (
    <Grid
      container
      alignItems="center"
      sx={{ maxWidth: "1250px", margin: "auto"}}
    >
      <ProjectHeader />
      {projectsData && projectsData.map((project) => 
            <ProjectCards key={project.id} project={project.fields} /> )
      }
      
    </Grid>
  );
};

export default MyProjects;

MyProjects.getLayout = privateLayout;


export async function getServerSideProps() { 
  const projectsData = await getProjectsData();
  const developerData = await getDevelopersData();
  const session = await getSession();
  if (session) { //if session exists returnsession,
  return {    
    props: {
      projectsData: MinifyRecords(projectsData),
      developerData: MinifyRecords(developerData),        
      }
    } 
  }
  return { //nothing happens if no session 
    props: {},
  };
}
