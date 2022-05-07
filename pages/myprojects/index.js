import React, { useState, useEffect} from "react";
import ProjectHeader from "./components/ProjectHeader";
import ProjectCards from "./components/ProjectCards";
import { Grid } from "@mui/material";
import { getDevelopersData, getProjectsData } from "../../lib/airtable";
import { privateLayout } from "../../components/PrivateLayout";
import { useSession } from "next-auth/react";
import { MinifyRecords } from "./components/MinifyRecords";

const MyProjects = ({projectsData, developerData}) => {
  //const [MyProjectsData, setMyProjectsData] = useState({});
  const { data: session, status } = useSession();

  const currentUserID = status === 'authenticated' && session.user.gh;
  console.log(currentUserID)

  // useEffect(() => {
  //   if (currentUserID) {
  //     try{
  //       projectsData && projectsData.map((project) => { 
  //         (project.fields.Developers.includes(currentUserID)) &&
  //           setMyProjectsData({
  //             projectName: project.fields['Project Name'] || "",
  //             website: project.fields.Website |"",
  //             logo: (project.fields.photo || project.fields.photo.length > 0) && project.fields.photo[0].url || "",
  //             description: project.fields.Project_Description || "",
  //             dailyStandupTime: project.fields['Daily Standup Time (ET)'] || "",
  //             planningMeetTime: project.fields['Monday Planning Meeting (ET)'] || "",
  //             dailyScrumTime: project.fields['daily scrum'] || "",
  //             repo: project.fields.Repo || "",
  //             calendarLinks: project.fields.calendarLinks || "",
  //             projectManager: project.fields['Project Manager'] || "",
  //             team: project.fields.Developers || "",
  //             type: project.fields.Type || "",
  //           })
          
  //       })
  //       }      
  //       catch (error){
  //           console.log(error, "error from projectsData in /api/myprojects");
  //       };
  //   }
  // }, [currentUserID, projectsData]);
  
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
      {/* <ProjectCards project={MyProjectsData} />  */}
      
    </Grid>
  );
};

export default MyProjects;

MyProjects.getLayout = privateLayout;


export async function getServerSideProps() { 
  try {
  const projectsData = await getProjectsData();
  const developerData = await getDevelopersData();
  //const session = await getSession();
  // if (session) { //if session exists returnsession,
  return {    
    props: {
      projectsData: MinifyRecords(projectsData),
      developerData: MinifyRecords(developerData), 
      }
    }
  } catch(error) {
     return {
      props: {
        err: "Something went wrong"
      },
    }
  }
}
