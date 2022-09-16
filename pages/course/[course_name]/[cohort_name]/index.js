import React, { useState,useEffect } from "react";
import { privateLayout } from "../../../../components/PrivateLayout";
import { getSession } from "next-auth/react";
import { mongoLessonsAfterPipeline } from "../../../../lib/courseData";
import Grid from "@mui/material/Grid";
import Menu from "../../components/Menu";
import Display from "../../components/Display";
import Router ,{useRouter} from "next/router";

export default function CurrentCoursePage({ user, lessonData }) {
  //console.log(lessonData);
  const [selectedLabel, setSelectedLabel] = useState(
    lessonData[0].lesson_label
  );
  //console.log(selectedLabel, "selectedLabel");
    //router is client side we are using to get the params
  const router = useRouter();

  useEffect(() => {
    //if nothin in slectedLabel or nothing also in query then go back
    if(!selectedLabel || !router.query.lesson){ 
      return 
    }
   const newSelectedLabel =router.query.lesson
   
    if (selectedLabel !== newSelectedLabel) {
      console.log(router.query)
       console.log(selectedLabel,newSelectedLabel)
             setSelectedLabel(newSelectedLabel);
    }
    
  }, [selectedLabel, router]);

  

//  componentDidUpdate(prevProps){
//     const { query } = this.props.router;
//     console.log("query:", query.lesson);
//     // verify props have changed to avoid an infinite loop
//     // if (query.lesson !== prevProps.router.query.lesson) {
//     //   // fetch data based on the new query------------------
//     //   setSelectedLabel(lessons.lesson_label);
//     // }
//   }
  return (
    <Grid
      container
      spacing={3}
      sx={{ maxWidth: "100%", mt: "-118px" }}
      // need help with right and left margin
    >
      <Menu
        lessonData={lessonData}
        selectedLabel={selectedLabel}
        setSelectedLabel={setSelectedLabel}
        courseName={router.query["course_name"]}
        cohortName ={router.query["cohort_name"]}
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
  console.log(context.params);
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
  // lessonData is object that you can name whatever you want
}
