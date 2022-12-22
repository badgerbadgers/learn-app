import React, { useState, useEffect } from "react";
import { privateLayout } from "../../../../components/layout/PrivateLayout";

import { getSession } from "next-auth/react";
import Grid from "@mui/material/Grid";
import Menu from "../../components/Menu";
import DisplayCards from "../../components/DisplayCards";
import { useRouter } from "next/router";
import Alert from "@mui/material/Alert";
import Cohort from "../../../../lib/models/Cohort";
import dbConnect from "../../../../lib/dbConnect"; 
import { format, addDays } from "date-fns";

export default function CurrentCoursePage({
  user,
  scheduleData,
  zoomLink,
  startDate,
}) {
  const [weekLessonNumber, setweekLessonNumber] = useState(0);

  // if filteredScheduleData[0] exisits then get lesson of first week
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
      !!scheduleData[newWeekLessonNumber]
    ) {
      setweekLessonNumber(newWeekLessonNumber);
      setCurrentLesson(scheduleData[newWeekLessonNumber]);
    }
  }, [scheduleData, weekLessonNumber, router]); 

  const lessonStartDate = () => {
    return format(
      addDays(new Date(startDate), 7 * weekLessonNumber),
      "MMM dd, yyyy"
    );
  };

  const lessonEndDate = () => {
    return format(
      addDays(new Date(startDate), 7 * (weekLessonNumber + 1) - 1),
      "MMM dd, yyyy"
    );
  };

  return (
    <Grid
      container
      spacing={3}
      sx={{ maxWidth: "100%", mb:"24px"}}
    >
      <Menu
        scheduleData={scheduleData}
        courseName={router.query["course_name"]}
        cohortName={router.query["cohort_name"]}
        zoomLink={zoomLink}
        weekLessonNumber={weekLessonNumber}
      />

      {/* conditional to render DisplayCards */}
      {scheduleData && currentLesson && (
        <DisplayCards
          courseName={router.query["course_name"]}
          cohortName={router.query["cohort_name"]}
          scheduleData={scheduleData}
          weekLessonNumber={weekLessonNumber}
          currentLesson={currentLesson}
          lessonStartDate={lessonStartDate()}
          lessonEndDate={lessonEndDate()}

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
      startDate: JSON.parse(JSON.stringify(scheduleData.start_date)),
    },
  };
  // returning scheduleData as props in index
}
