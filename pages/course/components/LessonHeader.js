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
import Stack from "@mui/material/Stack";

export default function LessonHeader({
  courseName,
  cohortName,
  scheduleData,
  currentLesson,
  weekLessonNumber,
  lessonStartDate,
  lessonEndDate,
}) {
  const isSmallScreen = useMediaQuery("(max-width:900px)");

  return (
    <Card sx={{ mb: "2em", boxShadow: "none", padding: "1em" }}>
      {!isSmallScreen && (
        <Stack>
          <CardActions
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            {weekLessonNumber !== 0 ? (
              <Button
                sx={{ color: "background.navButton" }}
                startIcon={<ArrowBackIcon />}
              >
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
                  {"Previous Lesson"}
                </Link>
              </Button>
            ) : null}

            {weekLessonNumber !== scheduleData.length - 1 ? (
              <Button
                sx={{ color: "background.navButton", ml: "auto" }}
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
                  {"Next Lesson"}
                </Link>
              </Button>
            ) : null}
          </CardActions>

          <CardHeader
            sx={{p:"6px"}}
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
            {lessonStartDate} - {lessonEndDate}
          </Typography>
        </Stack>
      )}

      {isSmallScreen && (
        <Stack>
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
          <CardActions sx={{ display: "flex", justifyContent: "center" }}>
            <Link
              href={
                weekLessonNumber !== 0
                  ? {
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
                    }
                  : ""
              }
              shallow={true}
              passHref
              // sends href to child
            >
              <Button
                sx={{
                  color: "background.navButton",
                  visibility: weekLessonNumber === 0 ? "hidden" : "visible",
                  pointerEvents: weekLessonNumber === 0 ? "none" : "auto",
                }}
                startIcon={<ArrowBackIcon />}
              ></Button>
            </Link>

            <Typography variant="h6" sx={{ textAlign: "center" }}>
              Week {weekLessonNumber + 1} of {scheduleData.length}
            </Typography>

            <Link
              href={
                weekLessonNumber !== scheduleData.length - 1? {
                      pathname: "/course/[course_name]/[cohort_name]/",

                      query: {
                        course_name: courseName,
                        cohort_name: cohortName,
                        week: weekLessonNumber + 1,
                        lesson:
                          scheduleData[weekLessonNumber + 1].lesson?.title ||
                          scheduleData[weekLessonNumber + 1].type,
                      },
                    }
                  : ""
              }
              shallow={true}
              passHref
            >
              <Button
                sx={{
                  color: "background.navButton",
                  visibility:
                    weekLessonNumber === scheduleData.length - 1
                      ? "hidden"
                      : "visible",
                  pointerEvents:
                    weekLessonNumber === scheduleData.length - 1
                      ? "none"
                      : "auto",
                }}
                endIcon={<ArrowForwardIcon />}
              ></Button>
            </Link>
          </CardActions>
          <Typography variant="body1" sx={{ textAlign: "center" }}>
            {lessonStartDate} - {lessonEndDate}
          </Typography>
        </Stack>
      )}
    </Card>
  );
}
