import React, { useState, useEffect } from "react";
import { privateLayout } from "../../../../components/layout/PrivateLayout";
import { getSession } from "next-auth/react";
import { getCohortSchedule, getZoomLink } from "../../../../lib/courseData";
import Grid from "@mui/material/Grid";
import Menu from "../../components/Menu";
import DisplayCards from "../../components/DisplayCards";
import Router, { useRouter } from "next/router";
import Alert from "@mui/material/Alert";

export default function CurrentCoursePage({ user, scheduleData, zoomLink }) {
  const [weekLessonNumber, setweekLessonNumber] = useState(0);

  // if scheduleData[0] exisits then get scheduleData[0] which is first week lesson otherwise undefined
  const [currentLesson, setCurrentLesson] = useState(
    !!scheduleData[0] ? scheduleData[0] : undefined
  );

  useEffect(() => {
    if (!scheduleData || scheduleData.length === 0) {
      return (
        <Alert severity="error" sx={{ width: "100%" }}>
          There are no lessons for this course
        </Alert>
      );
      // </Snackbar>)
      // alert("There are no lessons for this course"); //TODO: uniform error messages
      // return null;
    }
    // else {
    //   setSelectedLabel(scheduleData[0]);
    // }
  });

  const router = useRouter();

  useEffect(() => {
    //if nothing in selectedLabel or nothing also in query then go back

    if (weekLessonNumber === undefined || router.query.week === undefined) {
      // Todo: have error or 404 pg
      return;
    }
    //new query
    let newWeekLessonNumber = parseInt(router.query.week);
    // parseInt to make sure its a number

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

      {/* if scheduleData is true / exists & currentLesson exists / true then render DisplayCards */}
      {scheduleData && currentLesson && (
        <DisplayCards
          courseName={router.query["course_name"]}
          cohortName={router.query["cohort_name"]}
          scheduleData={scheduleData}
          weekLessonNumber={weekLessonNumber}
          currentLesson={currentLesson}
        />
      )}

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
  //context.params contains the route parameters
  const slug = context.params["cohort_name"];

  const scheduleData = (await getCohortSchedule(slug)) || null;
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
}
