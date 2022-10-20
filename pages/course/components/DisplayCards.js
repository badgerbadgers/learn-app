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

    <Grid item xs={12} md={9} lg={9}>{console.log("amen",doc)}
      <LessonHeader
        title={doc.lesson.title}
        lessonOrder={doc.lesson.order}
        sectionOrder={doc.lesson.section.order}
        index={index}
        lessonData={lessonData}
        courseName={courseName}
        cohortName={cohortName}
      />
      <LearningObjectivesCard objectives={doc.lesson.learning_objectives} />
      <LessonMaterialsCard materials={doc.lesson.materials} />
      <AssignmentCard
        mindset={doc.lesson.mindset_content}
        submit={doc.lesson.submission_link.url}
        assignments={doc.lesson.assignments}
      />
    </Grid>
  );
}
