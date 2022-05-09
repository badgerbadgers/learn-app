import React, { useState, useEffect } from "react";
import ProjectHeader from "./components/ProjectHeader";
import ProjectCard from "./components/ProjectCard";
import { Grid } from "@mui/material";
import { getDevelopersData, getProjectsData } from "../../lib/airtable";
import { privateLayout } from "../../components/PrivateLayout";
import { getSession } from "next-auth/react";
import { MinifyDevelopersRecords } from "./components/MinifyDevelopersRecords";

const colorArray = ["primary.main", "primary.greenCard", "secondary.main"];
//console.log(colorArray[0])

const MyProjects = ({ projectsData, developersData, user }) => {
  const [myProjectsData, setMyProjectsData] = useState([]);
  const [headerColor, setHeaderColor] = useState([]);
  const currentUserID = user.gh.toLowerCase();

  useEffect(() => {
    if (currentUserID) {
      try {
        // filter developersData to get the current user data based on their githubId which is same as the currentUserID from session.
        //Then we will map the data and return the key which is the developers ID from the Peoples table.
        // Next step this key will be mapped against the developers ID in the developers array in the Projects table to find all the projects related to the current user only.
        const currentUserDataID =
          developersData &&
          Object.entries(developersData)
            .filter(([key, value]) => value.github === currentUserID)
            .map(([key, value]) => key);
        // console.log(currentUserID);
        // console.log(currentUserDataID, "****CUID***");

        //filter projectsData to get projects where the current user is the developer.
        const currentUserProjects =
          projectsData &&
          projectsData.filter((project) =>
            project.fields.Developers.includes(currentUserDataID[0])
          );

        console.log(currentUserProjects, "CUP**");

        // Creating a temp Array to store multiple projects data and then set each project into the state with correct fields.
        //cant store directly into to sate as it will overwrite the privious data and can't spread the state else it adds a 
        //dependency to the array and goes in infinite loop.

        const tempMultiProjectsData = [];

        // mapping the current user projects to create a new object for each doc into myProjectsData to check if the field exist and change the developers ID to Name.
        currentUserProjects.map((project) => {
          tempMultiProjectsData.push({
            id: project.id,
            projectName: project.fields["Project Name"] || "",
            website: project.fields.Website | "",
            logo:
              (project.fields.photo &&
                project.fields.photo.length > 0 &&
                project.fields.photo[0].url) ||
              "",
            description: project.fields.Project_Description || "",
            dailyStandupTime: project.fields["Daily Standup Time (ET)"] || "",
            planningMeetTime:
              project.fields["Monday Planning Meeting (ET)"] || "",
            dailyScrumTime: project.fields["daily scrum"] || "",
            repo: project.fields.Repo || "",
            calendarLink: project.fields.calendarLinks || "",
            projectManager: project.fields["Project Manager"] || "",
            team:
              project.fields.Developers.map(
                (developerID) => developersData[developerID]["Person Name"]
              ) || "",
            type: project.fields.Type || "",
          });
        });
        setMyProjectsData(tempMultiProjectsData);
      } catch (error) {
        console.log(error, "error from projectsData in /api/myprojects");
      }
    }
  }, [currentUserID, projectsData, developersData]);

  useEffect(() => {
    const tempColorArray = [];
    if (myProjectsData) {
      for (const i = 0; i < myProjectsData.length; i++) {
        let colorIndex = i % 3;
        // console.log(colorIndex, "******CI****");
        tempColorArray.push(colorArray[colorIndex]);
        // console.log(colorArray[colorIndex]);
      }
      setHeaderColor(tempColorArray);
    }
  }, [myProjectsData]);

  console.log(myProjectsData, "*** MyPRD**");
  //console.log(projectsData, "**********PRD****");
  //console.log(developersData, "**Dev**");

  return (
    <Grid
      container
      alignItems="center"
      sx={{ maxWidth: "1250px", margin: "auto" }}
    >
      <ProjectHeader />
      {myProjectsData &&
        myProjectsData.map((project) => (
          <ProjectCard
            key={project.id}
            projectData={project}
            headerColor={headerColor.map(color => color)}
          />
        ))}
    </Grid>
  );
};

export default MyProjects;

MyProjects.getLayout = privateLayout;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  try {
    if (session) {
      //if session exists returnsession,
      const projectsData = await getProjectsData();
      const developersData = await getDevelopersData();
      const { user } = session;
      return {
        props: {
          projectsData,
          developersData: MinifyDevelopersRecords(developersData),
          user,
        },
      };
    } // if session doesnt exist.
    return {
      props: {},
    };
  } catch (error) {
    return {
      props: {
        err: "Something went wrong",
      },
    };
  }
}

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
