import React from "react";
import Grid from "@mui/material/Grid";
import LessonHeader from "./LessonHeader";
import LearningObjectivesCard from "./LearningObjectivesCard";
import AssignmentCard from "./AssignmentCard";
import LessonMaterialsCard from "./LessonMaterialsCard";
import BreakCard from "./BreakCard";

// Objective: have 1 switch case that will check the type and have 2 layouts for is lesson or if break
/*1. switch case that checks the type 
2. if lesson show the lesson cards along
3. if break/review show the breakcard
4. next and previous lesson button functionality
*/
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
        return (
          <>
           
            <BreakCard content={currentLesson.content} />
          </>
        );
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
