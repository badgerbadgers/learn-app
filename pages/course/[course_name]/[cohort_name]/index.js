import React, { useState, useEffect } from "react";
import { privateLayout } from "../../../../components/layout/PrivateLayout";
import { getSession } from "next-auth/react";
import Grid from "@mui/material/Grid";
import Menu from "../../components/Menu";
import DisplayCards from "../../components/DisplayCards";
import Router, { useRouter } from "next/router";
import Alert from "@mui/material/Alert";
import Cohort from "../../../../lib/models/Cohort";
import dbConnect from "../../../../lib/dbConnect";

export default function CurrentCoursePage({ user, scheduleData, zoomLink }) {
  // removing empty objs in scheduleData
  const filteredScheduleData = scheduleData.filter((el) => {
    if (Object.keys(el).length !== 0) {
      return true;
    }
    return false;
  });

  const [weekLessonNumber, setweekLessonNumber] = useState(0);

  // if filteredScheduleData[0] exisits then get lesson of first week
  const [currentLesson, setCurrentLesson] = useState(
    !!filteredScheduleData[0] ? filteredScheduleData[0] : undefined
  );

  useEffect(() => {
    if (!filteredScheduleData || filteredScheduleData.length === 0) {
      return (
        <Alert severity="error" sx={{ width: "100%" }}>
          There are no lessons for this course
        </Alert>
      );
    }
  });

  const router = useRouter();

  useEffect(() => {
    if (weekLessonNumber === null || router.query.week === null) {
      // Todo: 404 pg
      return (
        <Alert severity="error" sx={{ width: "100%" }}>
          There are no lessons for this course
        </Alert>
      );
    }
    //new query
    let newWeekLessonNumber = parseInt(router.query.week);

    if (
      weekLessonNumber !== newWeekLessonNumber &&
      !!filteredScheduleData[newWeekLessonNumber]
    ) {
      setweekLessonNumber(newWeekLessonNumber);
      setCurrentLesson(filteredScheduleData[newWeekLessonNumber]);
    }
  }, [filteredScheduleData, weekLessonNumber, router]);

  return (
    <Grid container spacing={3} sx={{ maxWidth: "100%" }}>
      <Menu
        filteredScheduleData={filteredScheduleData}
        courseName={router.query["course_name"]}
        cohortName={router.query["cohort_name"]}
        zoomLink={zoomLink}
      />

      {/* conditional to render DisplayCards */}
      {filteredScheduleData && currentLesson && (
        <DisplayCards
          courseName={router.query["course_name"]}
          cohortName={router.query["cohort_name"]}
          filteredScheduleData={filteredScheduleData}
          weekLessonNumber={weekLessonNumber}
          currentLesson={currentLesson}
        />
      )}
    </Grid>
  );
}

CurrentCoursePage.getLayout = privateLayout;
export async function getServerSideProps(context) {
  const session = await getSession(context);
  await dbConnect();

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
  const scheduleData = await Cohort.getBySlug(slug);

  return {
    props: {
      courseName: context.params["course_name"],
      slug: slug,
      user,
      scheduleData: JSON.parse(JSON.stringify(scheduleData.schedule)),
      zoomLink: scheduleData.zoom_link,
    },
  };
  // returning scheduleData as props in index
}
