import React, { useState } from "react";
import { privateLayout } from "../../../../components/PrivateLayout";
import { getSession} from "next-auth/react";
import {mongoLessonsAfterPipeline} from "../../../../lib/courseData";
import Grid from "@mui/material/Grid";
import Menu from "../../components/Menu";
import Display from "../../components/Display";

export default function CurrentCoursePage({ user, lessonData }) {
  //console.log(lessonData);
  const [selectedLabel, setSelectedLabel] = useState(
    "Lesson 1.1: JavaScript Basics"
  );
  console.log(selectedLabel, "selectedLabel");
  return (
    
    <Grid
      container
      spacing={3}
      sx={{ maxWidth: "100%", mt: "-118px"}}
      // need help with right and left margin
    >
      <Menu
        lessonData={lessonData}
        selectedLabel={selectedLabel}
        setSelectedLabel={setSelectedLabel}
      />

      {/* --Display Cards--- */}

      {lessonData &&
        lessonData.map((doc) => {
          if (doc.lesson_label === selectedLabel) {
            return <Display key={doc._id} doc={doc} />;
          }
        })}
    </Grid>
  );
}



CurrentCoursePage.getLayout = privateLayout;
export async function getServerSideProps(context) {
    console.log(context.params)
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
    props: { user, lessonData: JSON.parse(JSON.stringify(lessonData))},
  };
  // returning LessonData as props in index
  // lessonData is object that you can name whatever you want
}
