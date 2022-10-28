import React from "react";
import CardHeader from "@mui/material/CardHeader";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import Button from "@mui/material/Button";
import { useMediaQuery } from "@mui/material";

// This is for lesson
export default function LessonHeader({
  courseName,
  cohortName,
  lessonOrder,
  sectionOrder,
  scheduleData,
  currentLesson,
  weekLessonNumber,
}) {
  // console.log("hello", currentLesson)

  // console.log(typeof weekLessonNumber)
  // console.log(scheduleData.indexOf(currentLesson))
  const isSmallScreen = useMediaQuery("(max-width:900px)");

  const index = scheduleData.indexOf(currentLesson);

  return (
    <Card sx={{ mb: "1em", boxShadow: "none" }}>
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* {console.log(weekLessonNumber !== 0 )} */}
        {weekLessonNumber !== 0 ? (
          <Button sx={{ color: "black" }} startIcon={<ArrowBackIcon />}>
            <Link
              href={{
                pathname: "/course/[course_name]/[cohort_name]/",

                //lesson is the query from router
                query: {
                  course_name: courseName,
                  cohort_name: cohortName,
                  week: weekLessonNumber - 1,
                  lesson:
                    scheduleData[weekLessonNumber - 1].lesson?.title ||
                    scheduleData[weekLessonNumber - 1].type,
                },
              }}
              shallow={true}
            >
              {isSmallScreen ? "Back" :"Previous Lesson" }
            </Link>
          </Button>
        ) : null}

        {weekLessonNumber !== scheduleData.length - 1 ? (
          <Button
            sx={{ color: "black", ml: "auto" }}
            endIcon={<ArrowForwardIcon />}
          >
            <Link
              href={{
                pathname: "/course/[course_name]/[cohort_name]/",

                query: {
                  course_name: courseName,
                  cohort_name: cohortName,
                  week: weekLessonNumber + 1,
                  // since data structures for lesson and review are different need ternary statement
                  lesson:
                    scheduleData[weekLessonNumber + 1].lesson?.title ||
                    scheduleData[weekLessonNumber + 1].type,
                },
              }}
              shallow={true}
            >{isSmallScreen ? "Next" :"Next Lesson" }
             
            </Link>
          </Button>
        ) : null}
      </CardActions>

      <CardHeader
        title={
          currentLesson.lesson
            ? `Lesson ${currentLesson.lesson.section.order}.${currentLesson.lesson.order}: ${currentLesson.lesson.title}`
            : currentLesson.type
        }
        // fix fontSize
        titleTypographyProps={{
          variant: "h4",
          align: "center",
          color: "#FF5C35",
          fontSize: "2rem",
          position: "relative",
          top: "8px",
          gutterBottom: true,
          textTransform:"capitalize"
        }}
      />
      {/* TODO: get dates from cohort */}
      <Typography variant="h6" sx={{ textAlign: "center" }}>
        Week Date
      </Typography>
      <Typography variant="body1" sx={{ textAlign: "center" }}>
        Date
      </Typography>
    </Card>
  );
}
