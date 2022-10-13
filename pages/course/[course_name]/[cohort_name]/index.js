import React, { useState, useEffect } from "react";
import { privateLayout } from "../../../../components/PrivateLayout";
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
  const [selectedLabel, setSelectedLabel] = useState("");

  useEffect(() => {
    if (!lessonData || lessonData.length === 0) {
      alert("There are no lessons for this course"); //TODO: uniform error messages
      return null;
    } else {
      setSelectedLabel(lessonData[0].title);
    }
  }, [lessonData]);

  const router = useRouter();

  useEffect(() => {
    //if nothing in selectedLabel or nothing also in query then go back
    if (!selectedLabel || !router.query.lesson) {
      return;
    }
    //new query
    let newSelectedLabel = router.query.lesson;

    if (selectedLabel !== newSelectedLabel) {
      setSelectedLabel(newSelectedLabel);
    }
  }, [selectedLabel, router]);

  return (
    <Grid
      container
      spacing={3}
      sx={{ maxWidth: "100%", mt: "-118px" }}
      // fix margin in .main home module for pages
    >
      <Menu
        lessonData={lessonData}
        courseName={router.query["course_name"]}
        cohortName={router.query["cohort_name"]}
        zoomLink={zoomLink}
      />

      {lessonData &&
        lessonData.map((doc) => {
          // filling in cards based on selectedLabel
          if (doc.title === selectedLabel) {
            let index = lessonData.findIndex(
              doc => doc.title === selectedLabel
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
