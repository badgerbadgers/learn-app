import React from "react";
import { Stack, Box, Grid, Alert } from "@mui/material";
import Lesson from "./Lesson";
import Section from "./Section";

export default function Form({ lessons }) {
  if (!lessons || lessons.length === 0) {
    return (
      <Alert sx={{ width: "100%" }} severity="warning">
        No lessons for this course
      </Alert>
    );
  }

  // removing deuplicate sections from lessons
  const uniqueSectionArray = [];
  lessons.forEach((lesson) => {
    if (!uniqueSectionArray.includes(lesson.section.title)) {
      uniqueSectionArray.push(lesson.section.title);
    }
  });
  console.log(uniqueSectionArray);
  return (
    <Box sx={{ width: "100%", m: "2em" }}>
      <Grid item md={10} lg={12} sx={{ ml: "80px", mb: "3em" }}>
        <Stack>
          {uniqueSectionArray.map((section, index) => {
            const lessonComponent = lessons.map((lesson) => {
              if (section === lesson.section.title) {
                return <Lesson key={lesson._id} title={lesson.title} />;
              }
            });
            return (
              <React.Fragment key={index}>
                <Section sectionTitle={section} />
                {lessonComponent}
              </React.Fragment>
            );
          })}
        </Stack>
      </Grid>
    </Box>
  );
}
