import React from "react";
import CardHeader from "@mui/material/CardHeader";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import Button from "@mui/material/Button";
export default function LessonHeader({
  courseName,
  cohortName,
  lessonOrder,
  sectionOrder,
  currentIndex,
  scheduleData,
  currentLesson,
  weekLessonNumber,
}) {
  console.log("back to lessonheader");
  const getLessonQueryString = (weekLessonNumber) => {
    switch (scheduleData[weekLessonNumber].type) {
      case "review":
      case "break":
        return scheduleData[weekLessonNumber].type;

      case "lesson":
        return scheduleData[weekLessonNumber].lesson.title;

      default:
        console.log("error");
    }
  };

  const lessonTitle = () => {
    let typeValue = "";

    switch (currentLesson.type) {
      case "review":
      case "break":
        typeValue = currentLesson.type;
        // console.log("we're reviewing");
        break;
      case "lesson":
        typeValue = `Lesson ${currentLesson.lesson.section.order}.${currentLesson.lesson.order}: ${currentLesson.lesson.title}`;
        // console.log("we're having a lesson");
        break;
      default:
      // console.log("place an error here");
      // break;
    }
    return typeValue;
  };

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
                  lesson: getLessonQueryString(weekLessonNumber - 1),
                },
              }}
              shallow={true}
            >
              Previous Lesson
            </Link>
          </Button>
        ) : null}

        {/* {console.log(weekLessonNumber !== scheduleData.length - 1)} */}
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
                  lesson: getLessonQueryString(weekLessonNumber + 1),
                },
              }}
              shallow={true}
            >
              Next Lesson
            </Link>
          </Button>
        ) : null}
      </CardActions>

      <CardHeader
        // add a a switch case here
        title={lessonTitle()}
        titleTypographyProps={{
          variant: "h4",
          align: "center",
          color: "#FF5C35",
          fontSize: "54px",
          position: "relative",
          top: "8px",
          gutterBottom: true,
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
