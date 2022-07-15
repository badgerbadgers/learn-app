import React, { useEffect } from "react";
// import CurrentCourseLayout from "./components/CurrentCourseLayout";
import { privateLayout } from "../../components/PrivateLayout";
import { getSession } from "next-auth/react";
import { getCourseData } from "../../lib/courseData";
import { getlessonData } from "../../lib/airtable";
import { Grid } from "@mui/material";
import LearningObjectivesCard from "./components/LearningObjectivesCard";
import AssignmentCard from "./components/AssignmentCard";
import LessonMaterialsCard from "./components/LessonMaterialsCard";
import Menu from "./components/Menu";
import LessonHeader from "./components/LessonHeader";


export default function CurrentCoursePage({ courseData, lessonData, users }) {
  console.log(courseData);
  // data holds courseData
  console.log(lessonData);

  return (
    <>
      <Grid
        container
        spacing={3}
        sx={{ maxWidth: "100%", mt: "-118px" }}
        // need help with right and left margin
      >
        <Menu
        lessonData={lessonData}/>

        <Grid item xs={12} md={9} lg={9}>
          <LessonHeader/>
          {/* {lessonData.map((lessonsTitle) => {
            return (
              <LessonHeader
                key={lessonsTitle.fields.id}
                label={lessonsTitle.fields.Label}
                startDate={lessonsTitle.fields["Start Date"]}
                endDate={lessonsTitle.fields["End Date"]}
              />
            );
          })} */}

          <LearningObjectivesCard />
          <LessonMaterialsCard />
          <AssignmentCard />
        </Grid>
      </Grid>
      {/* <h1>{lessonData[0].fields.Title}</h1> */}
      {/* {lessonData.map((lessons) => {
        return (
          <CurrentCourseLayout
            key={lessons.fields.Section}
            Title={lessons.fields.Title}
          />
        );
      })} */}
    </>
  );
}

CurrentCoursePage.getLayout = privateLayout;
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
  const { user } = session;
  if (!user.hasProfile) {
    return {
      redirect: {
        destination: "/signup",
        permanent: false,
      },
    };
  }
  const courseData = await getCourseData();
  const lessonData = (await getlessonData()) || null;

  // calling the function getCourseData from the file
  return {
    props: { user, courseData: courseData, lessonData: lessonData },
  };
  // returning courseData as props in index
  // data is object that you can name whatever you want
}
