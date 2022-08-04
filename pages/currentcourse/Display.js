import React from "react";
import Grid from "@mui/material/Grid";
import LessonHeader from "./components/LessonHeader";
import LearningObjectivesCard from "./components/LearningObjectivesCard";
import AssignmentCard from "./components/AssignmentCard";
import LessonMaterialsCard from "./components/LessonMaterialsCard";

export default function Display({ doc }) {
  return (
    <Grid item xs={12} md={9} lg={9}>
      <LessonHeader title={doc.lesson_label} />
      <LearningObjectivesCard objectives={doc.learning_objectives} key={doc._id}/>
      <LessonMaterialsCard materials={doc.materials_Data} />
      <AssignmentCard
        mindset={doc.mindset_content}
        submit={doc.submission_link.url}
        assignments={doc.assignment_Data}
      />
    </Grid>
  );
}
