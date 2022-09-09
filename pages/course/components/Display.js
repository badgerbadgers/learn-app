import React from "react";
import Grid from "@mui/material/Grid";
import LessonHeader from "./LessonHeader";
import LearningObjectivesCard from "./LearningObjectivesCard";
import AssignmentCard from "./AssignmentCard";
import LessonMaterialsCard from "./LessonMaterialsCard";

export default function Display({ doc, key}) {
  return (
    <Grid item xs={12} md={9} lg={9} key={key}>
      <LessonHeader title={doc.lesson_label} />
      <LearningObjectivesCard objectives={doc.learning_objectives} key={doc._id}/>
      <LessonMaterialsCard materials={doc.materials} key={doc._id}/>
      <AssignmentCard
        mindset={doc.mindset_content}
        submit={doc.submission_link.url}
        assignments={doc.assignments}
      />
    </Grid>
  );
}
