import React from "react";
import Grid from "@mui/material/Grid";
import LessonHeader from "./LessonHeader";
import LearningObjectivesCard from "./LearningObjectivesCard";
import AssignmentCard from "./AssignmentCard";
import LessonMaterialsCard from "./LessonMaterialsCard";
import BreakCard from "./BreakCard"; 
import Alert from "@mui/material/Alert";

export default function DisplayCards({
  currentLesson,
  scheduleData,
  courseName,
  cohortName,
  weekLessonNumber,
  startDate
}) {
  const switchCardDisplay = () => {
    switch (currentLesson.type) {
      case "review":
      case "break":
        return (
          <Grid item xs={12} sx={{ mx: "auto" }}>
            <BreakCard content={currentLesson.content} />
          </Grid>
        );
      case "lesson":
        return (
          <Grid item xs={12} sx={{ mx: "auto" }}>
            <LearningObjectivesCard
              objectives={currentLesson.lesson.learning_objectives}
            />
            <LessonMaterialsCard materials={currentLesson.lesson.materials} />
            <AssignmentCard
              mindset={currentLesson.lesson.mindset_content}
              submit={currentLesson.lesson.submission_link.url}
              assignments={currentLesson.lesson.assignments}
            />
          </Grid>
        );

      default:
        return <Alert severity="error">Lesson type does not exist</Alert>;
    }
  };
  return (
    <Grid item xs={11} md={9} lg={9} sx={{ mx: "auto" }}>
      <LessonHeader
        scheduleData={scheduleData}
        courseName={courseName}
        cohortName={cohortName}
        currentLesson={currentLesson}
        weekLessonNumber={weekLessonNumber}
        startDate={startDate}
      />
      {switchCardDisplay()}
    </Grid>
  );
}
