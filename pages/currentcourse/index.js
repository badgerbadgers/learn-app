import React, { useState } from "react";
import { privateLayout } from "../../components/PrivateLayout";
import { getSession } from "next-auth/react";
// import { getCourseData } from "../../lib/courseData";
// import { getlessonData } from "../../lib/airtable";
import { getMongoLessons } from "../../lib/courseData";
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import MenuHeader from "./components/MenuHeader";
import Display from "./Display";

export default function CurrentCoursePage({ users, lessonData }) {
   console.log(lessonData);
  const [selectedLabel, setSelectedLabel] = useState("Lesson 1.1: JavaScript Basics");
  console.log(selectedLabel, "selectedLabel");
  return (
    <Grid
      container
      spacing={3}
      sx={{ maxWidth: "100%", mt: "-118px" }}
      // need help with right and left margin
    >
      {/* ---------------Menu---------- */}

      <Grid item md={3}>
        <Paper
          variant="outlined"
          square
          sx={{
            height: "100%",
            backgroundColor: "#F4F5F7",
          }}
        >
          <MenuList dense>
            <MenuHeader />
            {/* ^^ component */}
            <MenuItem>
              <Typography variant="h6">Lessons</Typography>
            </MenuItem>
            {lessonData.map((lessons) => {
              return (
                <div key={lessons.order}>
                  <MenuItem
                    onClick={() => {
                      setSelectedLabel(lessons.lesson_label);
                    }}
                  >
                    <Typography variant="body1" noWrap={true}>
                      {lessons.lesson_label}
                    </Typography>
                  </MenuItem>
                  <Divider />
                </div>
              );
            })}
          </MenuList>
        </Paper>
      </Grid>

      {/* -----------------------the right side of the grid--------------------------- */}

      {lessonData &&
        lessonData.map((doc) => {
          if (doc.lesson_label === selectedLabel) {
            return <Display key={doc.order} doc={doc} />;
          }
        })}
    </Grid>
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
  // const courseData = await getCourseData();
  // const lessonData = (await getlessonData()) || null;
   const lessonData = (await getMongoLessons()) || null;

  // calling the function getCourseData from the file
  return {
    props: { user, lessonData: lessonData },
  };
  // returning LessonData as props in index
  // lessonData is object that you can name whatever you want
}
