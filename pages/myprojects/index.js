import React, { useState, useEffect } from "react";
import ProjectHeader from "./components/ProjectHeader";
import ProjectCard from "./components/ProjectCard";
import { Grid, Link } from "@mui/material";
import { getDevelopersData, getProjectsData } from "../../lib/airtable";
import { privateLayout } from "../../components/PrivateLayout";
import { getSession } from "next-auth/react";
import { MinifyDevelopersRecords } from "./components/MinifyDevelopersRecords";

const colorArray = ["primary.main", "primary.greenCard", "secondary.main"];

const MyProjects = ({ projectsData, developersData, user }) => {
  const [myProjectsData, setMyProjectsData] = useState([]);
  const [headerColor, setHeaderColor] = useState([]);
  const currentUserID = (user.gh).toLowerCase();
        // console.log(currentUserID);
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

        //filter projectsData to get projects where the current user is the developer.
        const currentUserProjects =
          projectsData &&
          projectsData.filter((project) =>
            project.fields.Developers.includes(currentUserDataID[0])
          );

        // Creating a temp Array to store multiple projects data and then set each project into the state with correct fields.
        //cant store directly into to sate as it will overwrite the privious data and can't spread the state else it adds a 
        //dependency to the array and goes in infinite loop.

        const tempMultiProjectsData = [];

        // mapping the current user projects to create a new object for each doc into myProjectsData to check if the field exist and change the developers ID to Name.
        currentUserProjects && currentUserProjects.map((project) => {

              //Remove React Native and Rails API from the Types array and then mapping the it to replace the text with Icons. 
          const projectTypeArray = project.fields.Type && project.fields.Type
          .filter((element) => element === "React" || element === "Rails" || element === "NodeJS")
          .map(
            element => {
              if (element === 'React') {
                element = '../img/myProjectsIcon/react.svg';
              } else if (element === "Rails") {
                element = '../img/myProjectsIcon/Ruby_on_Rails-Logo.wine.svg';
              } else if (element === "NodeJS") {
                element = '../img/myProjectsIcon/NodeJS_logo.png';
              }
              return element;
            }
          )
//verify if the field exisit and remove any spaces before and after the content
          tempMultiProjectsData.push({
            id: project.id,
            projectName: project.fields["Project Name"] && project.fields["Project Name"].replace(/^\s+|\s+$/g, "") || "",
            website: project.fields.Website && project.fields.Website.replace(/^\s+|\s+$/g, "") || "https://labs.codethedream.org/",
            logo:
              (project.fields.photo &&
                project.fields.photo.length > 0 &&
                project.fields.photo[0].url) || "",
            description: project.fields.Project_Description && project.fields.Project_Description.replace(/^\s+|\s+$/g, "") || "",
            dailyStandupTime: project.fields["Daily Standup Time (ET)"] && project.fields["Daily Standup Time (ET)"].replace(/^\s+|\s+$/g, "") || "",
            planningMeetTime: project.fields["Monday Planning Meeting (ET)"] && project.fields["Monday Planning Meeting (ET)"].replace(/^\s+|\s+$/g, "") || "",
            dailyScrumTime: project.fields["daily scrum"] && project.fields["daily scrum"].replace(/^\s+|\s+$/g, "") || "",
            repo: project.fields.Repo && (<Link href= {project.fields.Repo.replace(/^\s+|\s+$/g, "")} target='_blank' color='secondary'> Repo Link </Link>) || "",
            calendarLink: project.fields.calendarLinks && (<Link href= {project.fields.calendarLinks.replace(/^\s+|\s+$/g, "")} target='_blank' > Calendar Link </Link>) || "",
            projectManager: project.fields["Project Manager"] && project.fields["Project Manager"].replace(/^\s+|\s+$/g, "") || "",
            team:
            project.fields.Developers && project.fields.Developers.map(
                (developerID) => developersData[developerID]["Person Name"]
              ) || "",
            type: project.fields.Type && projectTypeArray || "",
          });
        });
        setMyProjectsData(tempMultiProjectsData);
      } catch (error) {
        console.log(error, "error from projectsData in /api/myprojects");
      }
    }
  }, [currentUserID, projectsData, developersData]);

  //Now that the data is set inside the myProjectsData we can now loop over the 3 colors to pass to the Header
  //moving the setHeaderColor inside above useEffect would result in infinite loop since we are dependent on the myprojectsData.

  useEffect(() => {
    const tempColorArray = [];
    if (myProjectsData) {
      for (const i = 0; i < myProjectsData.length; i++) {
        let colorIndex = i % 3;
        tempColorArray.push(colorArray[colorIndex]);
      }
      setHeaderColor(tempColorArray);
    }
  }, [myProjectsData]);

  // console.log(myProjectsData, "*** MyPRD**");

  return (
    <Grid
      container
      alignItems="center"
      sx={{ maxWidth: "1250px", margin: "30px auto" }}
    >
      <ProjectHeader />
      {myProjectsData &&
        myProjectsData.map((project, i) => (
          <ProjectCard
            key={project.id}
            projectData={project}
            headerColor={headerColor[i]}
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
