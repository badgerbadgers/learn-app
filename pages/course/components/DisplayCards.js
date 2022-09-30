import React from "react";
import Grid from "@mui/material/Grid";
import LessonHeader from "./LessonHeader";
import LearningObjectivesCard from "./LearningObjectivesCard";
import AssignmentCard from "./AssignmentCard";
import LessonMaterialsCard from "./LessonMaterialsCard";

export default function DisplayCards({
  doc,
  index,
  lessonData,
  courseName,
  cohortName,
}) {
  return (
    <Grid item xs={12} md={9} lg={9}>
      <LessonHeader
        title={doc.lesson_label}
        index={index}
        lessonData={lessonData}
        courseName={courseName}
        cohortName={cohortName}
      />
      <LearningObjectivesCard objectives={doc.learning_objectives} />
      <LessonMaterialsCard materials={doc.materials} />
      <AssignmentCard
        mindset={doc.mindset_content}
        submit={doc.submission_link.url}
        assignments={doc.assignments}
      />
    </Grid>
  );
}
