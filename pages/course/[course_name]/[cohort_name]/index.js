import React, { useState, useEffect } from "react";
import { privateLayout } from "../../../../components/PrivateLayout";
import { getSession } from "next-auth/react";
import { mongoLessonsAfterPipeline } from "../../../../lib/courseData";
import Grid from "@mui/material/Grid";
import Menu from "../../components/Menu";
import DisplayCards from "../../components/DisplayCards";
import Router, { useRouter } from "next/router";

export default function CurrentCoursePage({ user, lessonData }) {
  const [selectedLabel, setSelectedLabel] = useState("");

  useEffect(() => {
    setSelectedLabel(lessonData[0].lesson_label);
  }, []);

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
      />

      {lessonData &&
        lessonData.map((doc) => {
          // filling in cards based on selectedLabel
          if (doc.lesson_label === selectedLabel) {
            let index = lessonData.findIndex(
              (doc) => doc.lesson_label === selectedLabel
            );
            console.log(index);
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

  const lessonData = (await mongoLessonsAfterPipeline()) || null;

  return {
    props: {
      courseName: context.params["course_name"],
      cohortName: context.params["cohort_name"],
      user,
      lessonData: JSON.parse(JSON.stringify(lessonData)),
    },
  };
  // returning LessonData as props in index
  //context.params contains the route parameters
}
