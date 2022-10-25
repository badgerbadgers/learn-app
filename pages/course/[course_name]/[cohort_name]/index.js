import React, { useState, useEffect } from "react";
import { privateLayout } from "../../../../components/layout/PrivateLayout";
import { getSession } from "next-auth/react";
import {
  mongoLessonsAfterPipeline,
  getZoomLink,
} from "../../../../lib/courseData";
import Grid from "@mui/material/Grid";
import Menu from "../../components/Menu";
import DisplayCards from "../../components/DisplayCards";
import Router, { useRouter } from "next/router";
import BreakCard from "../../components/BreakCard";

export default function CurrentCoursePage({ user, scheduleData, zoomLink }) {

  /*
  Objective: show the lesson, review, and breaks 
  1. check type of first item in index ...check
  2.
  if it's a lesson = show the cards for lesson 
  if it's a review = show the content of review
  if it's a break = show the content of break
  */

  const [weekLessonNumber, setweekLessonNumber] = useState(0);

  const [currentLesson, setCurrentLesson] = useState(
    !!scheduleData[0] ? scheduleData[0] : undefined
  );
  // if scheduleData[0] exisits then get scheduleData[0] which is first week lesson otherwise undefined

  // useEffect(() => {
  //   if (!scheduleData || scheduleData.length === 0) {
  //     alert("There are no lessons for this course"); //TODO: uniform error messages
  //     return null;
  //   } else {
  //     setSelectedLabel(scheduleData[0]);
  //   }
  // }, []);

  // TODO: have review and break have same outcome
  // const switchType = () => {
  //   switch (currentLesson.type) {
  //     case "review":
  //       console.log("we're reviewing");
  //       return <BreakCard content={currentLesson.content} />;
  //     case "lesson":
  //       console.log("we're having a lesson");
  //       return <DisplayCards
  //           courseName={router.query["course_name"]}
  //         cohortName={router.query["cohort_name"]}
  //         scheduleData={scheduleData}
  //         weekLessonNumber={weekLessonNumber}
  //           // key={currentLesson.lesson._id}
  //           // index={index}
  //         currentLesson={currentLesson}
  //         // currentIndex={getIndex()}
  //         /> ;

  //     case "break":
  //       console.log("we're on a break");
  //       return <BreakCard content={currentLesson.content} />;

  //     default:
  //       console.log("place an error here");
  //       break;
  //   }
  // };

  const router = useRouter();
  // console.log(weekLessonNumber);

  useEffect(() => {
    //if nothing in selectedLabel or nothing also in query then go back

    if (weekLessonNumber === undefined || router.query.week === undefined) {
      // Todo have error or 404 pg
      return;
    }
    //new query
    let newWeekLessonNumber = parseInt(router.query.week);
    // parseInt to make sure its a number
    // console.log("new label", typeof newWeekLessonNumber);

    // const currentweekLessonNumber = scheduleData
    if (
      weekLessonNumber !== newWeekLessonNumber &&
      !!scheduleData[newWeekLessonNumber]
    ) {
      // scheduleData[newweekLessonNumber] is lesson
      // console.log("old label", weekLessonNumber);
      setweekLessonNumber(newWeekLessonNumber);
      setCurrentLesson(scheduleData[newWeekLessonNumber]);
    }
  }, [scheduleData, weekLessonNumber, router]);

  return (
    <Grid container spacing={3} sx={{ maxWidth: "100%" }}>
      <Menu
        scheduleData={scheduleData}
        courseName={router.query["course_name"]}
        cohortName={router.query["cohort_name"]}
        zoomLink={zoomLink}
        currentLesson={currentLesson}

      
      />

      {scheduleData && currentLesson && <DisplayCards
        courseName={router.query["course_name"]}
        cohortName={router.query["cohort_name"]}
        scheduleData={scheduleData}
        weekLessonNumber={weekLessonNumber}
        // key={currentLesson.lesson._id}
        // index={index}
        currentLesson={currentLesson}
        // currentIndex={getIndex()}
      />}

      {/* if scheduleData is true and exists currentLesson exists and is true then render DisplayCards */}
      {/* {const index = scheduleData.indexOf(currentLesson)} */}

      {/* {let index = scheduleData.findIndex(currentLesson)} */}
      {/* {scheduleData &&
        scheduleData.map((doc) => {
          // let index = scheduleData.findIndex((doc) => doc == selectedLabel)
        
          // // filling in cards based on selectedLabel
          // let index = scheduleData.findIndex((doc) => doc == selectedLabel)

          // if (doc === selectedLabel) {
          //   console.log("doc", doc)
          //   console.log("selectedLabel",selectedLabel)
          //   // let index = scheduleData.findIndex((doc) => doc == selectedLabel);
          //   return (
          //     <DisplayCards
          //       courseName={router.query["course_name"]}
          //       cohortName={router.query["cohort_name"]}
          //       key={doc._id}
          //       doc={doc}
          //       index={index}
          //       scheduleData={scheduleData}
          //     />
          //   );
          // }
        })} */}
    </Grid>
  );
}

CurrentCoursePage.getLayout = privateLayout;
export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const { user } = session;
  if (!user.hasProfile) {
    return {
      redirect: {
        destination: "/signup",
        permanent: false,
      },
    };
  }
  const slug = context.params["cohort_name"];

  const scheduleData = (await mongoLessonsAfterPipeline(slug)) || null;
  const zoomLink = (await getZoomLink(slug)) || null;
  return {
    props: {
      courseName: context.params["course_name"],
      slug: slug,
      user,
      scheduleData: JSON.parse(JSON.stringify(scheduleData)),
      zoomLink,
    },
  };
  // returning scheduleData as props in index
  //context.params contains the route parameters
}
