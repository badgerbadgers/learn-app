import React, { useState, useEffect } from "react";
import ProjectHeader from "./components/ProjectHeader";
import ProjectCard from "./components/ProjectCard";
import { Grid, Link } from "@mui/material";
import { getDevelopersData, getProjectsData } from "../../lib/airtable";
import { privateLayout } from "../../components/PrivateLayout";
import { getSession } from "next-auth/react";
import { MinifyDevelopersRecords } from "./components/MinifyDevelopersRecords";

const colorArray = ["primary.main", "secondary.main", "secondary.light"];

const MyProjects = ({ projectsData, developersData }) => {
  const [myProjectsData, setMyProjectsData] = useState([]);
  const [headerColor, setHeaderColor] = useState([]);

  useEffect(() => {
    try {
      // Creating a temp Array to store multiple projects data and then set each project into the state with correct fields.
      //cant store directly into to sate as it will overwrite the privious data and can't spread the state else it adds a
      //dependency to the array and goes in infinite loop.

      const tempMultiProjectsData = [];

      // mapping the current user projects to create a new object for each doc into myProjectsData to check if the field exist and change the developers ID to Name.
      // currentUserProjects && currentUserProjects.map((project) => {****
      projectsData.map((project) => {
        //Remove React Native and Rails API from the Types array and then mapping the it to replace the text with Icons.
        const projectTypeArray =
          project.fields.Type &&
          project.fields.Type.filter(
            (element) =>
              element === "React" || element === "Rails" || element === "NodeJS"
          ).map((element) => {
            if (element === "React") {
              element = "../img/myProjectsIcon/react.svg";
            } else if (element === "Rails") {
              element = "../img/myProjectsIcon/Ruby_on_Rails-Logo.wine.svg";
            } else if (element === "NodeJS") {
              element = "../img/myProjectsIcon/NodeJS_logo.png";
            }
            return element;
          });
        //verify if the field exisit and remove any spaces before and after the content
        tempMultiProjectsData.push({
          id: project.id,
          projectName:
            (project.fields["Project Name"] &&
              project.fields["Project Name"].trim()) ||
            "",
          website:
            (project.fields.Website && project.fields.Website.trim()) || "",
          logo:
            (project.fields.photo &&
              project.fields.photo.length > 0 &&
              project.fields.photo[0].url) ||
            "",
          description:
            (project.fields.Project_Description &&
              project.fields.Project_Description.trim()) ||
            "",
          dailyStandupTime:
            (project.fields["Daily Standup Time (ET)"] &&
              project.fields["Daily Standup Time (ET)"].trim()) ||
            "",
          planningMeetTime:
            project.fields["Monday Planning Meeting (ET)"] &&
            project.fields["Monday Planning Meeting (ET)"].trim(),
          dailyScrumTime:
            (project.fields["daily scrum"] &&
              project.fields["daily scrum"].trim()) ||
            "",
          repo:
            (project.fields.Repo && (
              <Link
                href={project.fields.Repo.trim()}
                target="_blank"
                color="secondary"
              >
                {" "}
                Repo Link{" "}
              </Link>
            )) ||
            "",
          calendarLink:
            (project.fields.calendarLinks && (
              <Link href={project.fields.calendarLinks.trim()} target="_blank">
                {" "}
                Calendar Link{" "}
              </Link>
            )) ||
            "",
          projectManager:
            (project.fields["Project Manager"] &&
              project.fields["Project Manager"].trim()) ||
            "",
          team:
            (project.fields.Developers &&
              project.fields.Developers.map(
                (developerID) => developersData[developerID]["Person Name"]
              )) ||
            "",
          type: (project.fields.Type && projectTypeArray) || "",
        });
      });
      setMyProjectsData(tempMultiProjectsData);
    } catch (error) {
      console.log(error, "error from projectsData in /api/myprojects");
    }
  }, [projectsData, developersData]);

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
      const { user } = session;
      const projectsData = await getProjectsData(user);
      const developersData = await getDevelopersData();

      return {
        props: {
          projectsData,
          developersData: MinifyDevelopersRecords(developersData),
        },
      };
    } // if session doesnt exist.
    return {
      props: {},
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } catch (error) {
    return {
      props: {
        err: "Something went wrong",
      },
    };
  }
}
