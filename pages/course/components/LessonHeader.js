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
  title,
  lessonOrder,
  sectionOrder,
  index,
  lessonData,
}) {
  return (
    <Card sx={{ mb: "1em", boxShadow: "none" }}>
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        {index !== 0 ? (
          <Button sx={{ color: "black" }} startIcon={<ArrowBackIcon />}>
            <Link
              href={{
                pathname: "/course/[course_name]/[cohort_name]/",

                //lesson is the query from router
                query: {
                  course_name: courseName,
                  cohort_name: cohortName,
                  lesson: lessonData[index - 1].title,
                },
              }}
              shallow={true}
            >
              Previous Lesson
            </Link>
          </Button>
        ) : null}

        {index !== lessonData.length - 1 ? (
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
                  lesson: lessonData[index + 1].title,
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
        
        title={`Lesson ${sectionOrder}.${lessonOrder}: ${title}`}
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
