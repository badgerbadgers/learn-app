import { React, useState } from "react";
import MenuHeader from "./MenuHeader";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Link from "next/link";

export default function Menu({ courseName, cohortName, lessonData, zoomLink }) {
  const switchType = (val) => {
    let typeValue = "";
    switch (val) {
      case "review":
        typeValue = "review";
        console.log("we're reviewing");
        lessonData.content;
        break;
      case "lesson":
        typeValue = "lesson";
        console.log("we're having a lesson");

        break;
      case "break":
        typeValue = "break";
        console.log("we're on a break");
        break;
      default:
        console.log("place an error here");
        break;
    }
    return typeValue;
  };

  return (
    <Grid item md={3} sx={{ maxWidth: "100%" }}>
      <Paper
        variant="outlined"
        square
        sx={{
          height: "100%",
          backgroundColor: "#F4F5F7",
        }}
      >
        <MenuList dense>
          <MenuHeader zoomLink={zoomLink} />
          {/* ^^ component */}
          <Divider sx={{ mb: "5px" }} />

          <MenuItem>
            <Typography variant="h6">Lessons</Typography>
          </MenuItem>

          {lessonData.map((lessons, index) => {
            // console.log(index, lessons)
            // console.log(lessons.lesson._id)
            // console.log("type", lessons);
            // console.log(lessons.lesson.order)
            return (
              <Stack key={index}>
                <Link
                  href={{
                    pathname: "/course/[course_name]/[cohort_name]/",

                    //lesson is the query from router
                    query: {
                      course_name: courseName,
                      cohort_name: cohortName,
                      week: index,
                      // lesson: lessons.title,
                    },
                  }}
                  passHref
                  //updates the path of current page without rerunnig
                  shallow={true}
                >
                  <MenuItem>
                    <Typography variant="body1" noWrap={true}>
                      {switchType(lessons.type)}
                      {/* {`Lesson  ${lessons.type}`} */}
                    </Typography>
                  </MenuItem>
                </Link>
                <Divider />
              </Stack>
            );
          })}
        </MenuList>
      </Paper>
    </Grid>
  );
}
