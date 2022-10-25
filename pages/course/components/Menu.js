import { React } from "react";
import MenuHeader from "./MenuHeader";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Link from "next/link";

export default function Menu({
  courseName,
  cohortName,
  scheduleData,
  zoomLink,
  currentLesson,
}) {

  const getLessonTitle = (lesson) => {
    switch (lesson.type) {
      case "review":
      case "break":
        return lesson.type;
        // console.log("we're reviewing");
       
      case "lesson":
        return lesson.lesson.title;
        // console.log("we're having a lesson");
      
      default:
        console.log("place an error here");
        return '';
  
    }
  
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
          {scheduleData.map((lesson, index) => {
           
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
                      lesson: getLessonTitle(lesson),
                    },
                  }}
                  passHref
                  //updates the path of current page without rerunnig
                  shallow={true}
                >
                  <MenuItem>
                    <Typography variant="body1" noWrap={true}>
                      {/* giving all lesson instead of lesson.type */}
                      {getLessonTitle(lesson)}
                      
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
