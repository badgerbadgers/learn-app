import React, { useState } from "react";
import MenuHeader from "./MenuHeader";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Link from "next/link";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useMediaQuery } from "@mui/material";

export default function Menu({
  courseName,
  cohortName,
  filteredScheduleData,
  zoomLink,
}) {
  // mui swippable drawer
  const isSmallScreen = useMediaQuery("(max-width:900px)");

  const [state, setState] = useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 300 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <MenuList sx={{ py: "0" }}>
        {/* <MenuHeader zoomLink={zoomLink} />
        ^^ component */}
        <Divider sx={{ mb: "5px" }} />

        <MenuItem>
          <Typography variant="h6">Lessons</Typography>
        </MenuItem>
        {/* TODO: see if it makes more sense to name lesson weekLesson or something */}
        {filteredScheduleData.map((weekSchedule, index) => {
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
                    lesson: weekSchedule.lesson?.title || weekSchedule.type,
                  },
                }}
                passHref
                //updates the path of current page without rerunnig
                shallow={true}
              >
                <MenuItem sx={{ textTransform: "capitalize" }}>
                  <Typography variant="body1" noWrap={true}>
                    {weekSchedule.lesson
                      ? `Lesson ${weekSchedule.lesson.section.order}.${weekSchedule.lesson.order}: ${weekSchedule.lesson.title}`
                      : weekSchedule.type}
                  </Typography>
                </MenuItem>
              </Link>
              <Divider />
            </Stack>
          );
        })}
      </MenuList>
    </Box>
  );

  /////////////////////////////////////////////////////////
  return (
    <Grid item md={3} sm={12} sx={{ maxWidth: "100%" }}>
      <Paper
        variant="outlined"
        square
        sx={{
          height: "100%",
          backgroundColor: "#F4F5F7",
        }}
      >
        {!isSmallScreen && (
          <MenuList dense>
            <MenuHeader zoomLink={zoomLink} />
            {/* ^^ component */}
            <Divider sx={{ mb: "5px" }} />

            <MenuItem>
              <Typography variant="h6">Lessons</Typography>
            </MenuItem>
            {/* TODO: see if it makes more sense to name lesson weekLesson or something */}
            {filteredScheduleData.map((weekSchedule, index) => {
              // console.log(Object.values(weekSchedule).length ===0)
              // console.log(JSON.stringify(weekSchedule) === "{}")
              /**/

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
                        lesson: weekSchedule.lesson?.title || weekSchedule.type,
                      },
                    }}
                    passHref
                    //updates the path of current page without rerunnig
                    shallow={true}
                  >
                    <MenuItem sx={{ textTransform: "capitalize" }}>
                      <Typography variant="body1" noWrap={true}>
                        {weekSchedule.lesson
                          ? `Lesson ${weekSchedule.lesson.section.order}.${weekSchedule.lesson.order}: ${weekSchedule.lesson.title}`
                          : weekSchedule.type}
                      </Typography>
                    </MenuItem>
                  </Link>
                  <Divider />
                </Stack>
              );
            })}
          </MenuList>
        )}

        {isSmallScreen && (
          <Stack sx={{ border: "none", backgroundColor: "transparent" }}>
            {["left"].map((anchor) => (
              <React.Fragment key={anchor}>
                <Button
                  onClick={toggleDrawer(anchor, true)}
                  endIcon={<KeyboardArrowDownIcon />}
                  sx={{ border: "none" }}
                >
                  Lessons
                </Button>
                <SwipeableDrawer
                  anchor={anchor}
                  open={state[anchor]}
                  onClose={toggleDrawer(anchor, false)}
                  onOpen={toggleDrawer(anchor, true)}
                >
                  {list(anchor)}
                </SwipeableDrawer>
                {/* <MenuHeader zoomLink={zoomLink} />
            ^^ component */}
              </React.Fragment>
            ))}
          </Stack>
        )}
      </Paper>
    </Grid>
  );
}
