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
}) {
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
          {/* TODO: see if it makes more sense to name lesson weekLesson or something */}
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
                      lesson: lesson.lesson?.title || lesson.type,
                    },
                  }}
                  passHref
                  //updates the path of current page without rerunnig
                  shallow={true}
                >
                  <MenuItem>
                    <Typography variant="body1" noWrap={true}>
                      {lesson.lesson?.title || lesson.type}
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
