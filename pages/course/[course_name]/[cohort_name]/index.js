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

export default function CurrentCoursePage({ user, lessonData, zoomLink }) {
  /*
  Objective: show the lesson, review, and breaks 
  1. check type of first item in index ...check
  2.
  if it's a lesson = show the cards for lesson 
  if it's a review = show the content of review
  if it's a break = show the content of break
  */
  // TODO change lessonData to scheduleData

  const [selectedLabel, setSelectedLabel] = useState(lessonData[0]);

  // const switchType = (val) => {
  //   let typeValue = "";
  //   switch (val) {
  //     case "review":
  //       typeValue = "review";
  //       console.log("we're reviewing");
  //       break;
  //     case "lesson":
  //       typeValue = "lesson";
  //       console.log("we're having a lesson");
  //       break;
  //     case "break":
  //       typeValue = "break";
  //       console.log("we're on a break");
  //       break;
  //     default:
  //       console.log("place an error here");
  //       break;
  //   }
  //   return typeValue;
  // };
  // switchType(selectedLabel);
  

  // useEffect(() => {
  //   if (!lessonData || lessonData.length === 0) {
  //     alert("There are no lessons for this course"); //TODO: uniform error messages
  //     return null;
  //   } else {
  //     setSelectedLabel(lessonData[0]);
  //   }
  // }, []);

  const router = useRouter();
console.log(selectedLabel)
  
  useEffect(() => {
    //if nothing in selectedLabel or nothing also in query then go back
    if (!selectedLabel || !router.query.week) {
     
      return;
    }
    //new query
    let newSelectedLabel = router.query.week;
   console.log(newSelectedLabel)

    if (selectedLabel !== newSelectedLabel) {
      setSelectedLabel(newSelectedLabel);
    }
  }, [selectedLabel, router]);

  return (
    <Grid container spacing={3} sx={{ maxWidth: "100%" }}>
      <Menu
        lessonData={lessonData}
        courseName={router.query["course_name"]}
        cohortName={router.query["cohort_name"]}
        zoomLink={zoomLink}
      />

      {lessonData &&
        lessonData.map((doc) => {
          
          // console.log("hello")
          // // filling in cards based on selectedLabel
          if (doc === selectedLabel) {
            console.log("here",selectedLabel)
            let index = lessonData.findIndex(
              (doc) => doc === selectedLabel
            );
            return (
              <DisplayCards
                courseName={router.query["course_name"]}
                cohortName={router.query["cohort_name"]}
                key={doc._id}
                doc={doc}
                index={index}
                lessonData={lessonData}
              />
            );
          }
        })}
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

  const lessonData = (await mongoLessonsAfterPipeline(slug)) || null;
  const zoomLink = (await getZoomLink(slug)) || null;
  return {
    props: {
      courseName: context.params["course_name"],
      slug: slug,
      user,
      lessonData: JSON.parse(JSON.stringify(lessonData)),
      zoomLink,
    },
  };
  // returning LessonData as props in index
  //context.params contains the route parameters
}
