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
  lessonData,
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
          <MenuHeader />
          {/* ^^ component */}
          <Divider sx={{ mb: "5px" }} />

          <MenuItem>
            <Typography variant="h6">Lessons</Typography>
          </MenuItem>

          {lessonData.map((lessons) => {
            return (
              <Stack key={lessons.lesson_label} > 
              
                {/* {console.log("test",lessons.lesson_label)} */}
                <Link 
                  href={{
                    pathname: "/course/[course_name]/[cohort_name]/",

                    //lesson is the query from router
                    query: {
                      course_name: courseName,
                      cohort_name: cohortName,
                      lesson: lessons.lesson_label,
                    },
                  }}
                  passHref
                  //updates the path of current page without rerunnig
                  shallow={true}
                  
                >
                  <MenuItem>
                    <Typography variant="body1" noWrap={true}>
                      {lessons.lesson_label}
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
