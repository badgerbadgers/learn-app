import React from "react";
import Grid from "@mui/material/Grid";
import LessonHeader from "./LessonHeader";
import LearningObjectivesCard from "./LearningObjectivesCard";
import AssignmentCard from "./AssignmentCard";
import LessonMaterialsCard from "./LessonMaterialsCard";
import BreakCard from "./BreakCard";

// place another switch statement here
export default function DisplayCards({
  currentLesson,
  currentIndex,
  scheduleData,
  courseName,
  cohortName,
  weekLessonNumber,
}) {
  const switchCardDisplay = () => {
    switch (currentLesson.type) {
      case "review":
      case "break":
        return <BreakCard  content={currentLesson.content}/>;
      case "lesson":
        return (
          <>
            <LearningObjectivesCard
              objectives={currentLesson.lesson.learning_objectives}
            />
            <LessonMaterialsCard materials={currentLesson.lesson.materials} />
            <AssignmentCard
              mindset={currentLesson.lesson.mindset_content}
              submit={currentLesson.lesson.submission_link.url}
              assignments={currentLesson.lesson.assignments}
            />
          </>
        );

      default:
        console.log("place an error here");
        return "";
        break;
    }
  };
  return (
    <Grid item xs={12} md={9} lg={9}>
      <LessonHeader
        currentIndex={currentIndex}
        scheduleData={scheduleData}
        courseName={courseName}
        cohortName={cohortName}
        currentLesson={currentLesson}
        weekLessonNumber={weekLessonNumber}
      />
      {switchCardDisplay()}
      {/* <LearningObjectivesCard
        objectives={currentLesson.lesson.learning_objectives}
      />
      <LessonMaterialsCard materials={currentLesson.lesson.materials} />
      <AssignmentCard
        mindset={currentLesson.lesson.mindset_content}
        submit={currentLesson.lesson.submission_link.url}
        assignments={currentLesson.lesson.assignments}
      /> */}
    </Grid>
  );
}
