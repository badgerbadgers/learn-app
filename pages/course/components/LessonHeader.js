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
import { format, addDays } from "date-fns";

export default function LessonHeader({
  courseName,
  cohortName,
  scheduleData,
  currentLesson,
  weekLessonNumber,
  startDate,
}) {
  const isSmallScreen = useMediaQuery("(max-width:900px)");

  // move to index and pass function as props
  const lessonStartDate = () => {
    return format(
      addDays(new Date(startDate), 7 * weekLessonNumber),
      "MMM dd, yyyy"
    );
  };

  const lessonEndDate = () => {
    return format(
      addDays(new Date(startDate), 7 * (weekLessonNumber + 1) - 1),
      "MMM dd, yyyy"
    );
  };

  console.log(typeof startDate);
  return (
    <Card sx={{ mb: "1em", boxShadow: "none" }}>
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        {weekLessonNumber !== 0 ? (
          <Button sx={{color:"background.navButton"}} startIcon={<ArrowBackIcon />}>
            <Link
              href={{
                pathname: "/course/[course_name]/[cohort_name]/",

                //lesson is the query from router
                query: {
                  course_name: courseName,
                  cohort_name: cohortName,
                  week: weekLessonNumber - 1,
                  // since data structures for lesson and review are different need ternary operator
                  lesson:
                    scheduleData[weekLessonNumber - 1].lesson?.title ||
                    scheduleData[weekLessonNumber - 1].type,
                },
              }}
              shallow={true}
            >
              {isSmallScreen ? "Back" : "Previous Lesson"}
            </Link>
          </Button>
        ) : null}

        {weekLessonNumber !== scheduleData.length - 1 ? (
          <Button
            sx={{color:"background.navButton", ml: "auto" }}
            endIcon={<ArrowForwardIcon />}
          >
            <Link
              href={{
                pathname: "/course/[course_name]/[cohort_name]/",

                query: {
                  course_name: courseName,
                  cohort_name: cohortName,
                  week: weekLessonNumber + 1,
                  lesson:
                    scheduleData[weekLessonNumber + 1].lesson?.title ||
                    scheduleData[weekLessonNumber + 1].type,
                },
              }}
              shallow={true}
            >
              {isSmallScreen ? "Next" : "Next Lesson"}
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
        titleTypographyProps={{
          variant: "h4",
          align: "center",
          color: "#FF5C35",
          position: "relative",
          top: "8px",
          gutterBottom: true,
          textTransform: "capitalize",
        }}
      />
      <Typography variant="h6" sx={{ textAlign: "center" }}>
        Week {weekLessonNumber + 1} of {scheduleData.length}
      </Typography>

      <Typography variant="body1" sx={{ textAlign: "center" }}>
        {lessonStartDate()} - {lessonEndDate()}
      </Typography>
    </Card>
  );
}
