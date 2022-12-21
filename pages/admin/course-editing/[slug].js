import React, { useState, useEffect } from "react";
// import getData from "../../../lib/getData"
import { privateLayout } from "../../../components/layout/PrivateLayout";
import { getCourseFromMongo, getAllCourses } from "../../../lib/course";
import { getSession } from "next-auth/react";
import dbConnect from "../../../lib/dbConnect";
import Header from "./components/Header";
import { Grid, Alert } from "@mui/material";
import Form from "./components/Form.js";
import Router, { useRouter } from "next/router";

// don't forget there is the lesson.js & courses in api to REMOVE before you push!!!!!!!!!!!!!!!
export default function CourseManagement({ courseData, allCourses }) {
  // const [currentCourse, setCurrentCourse] = useState(
  //   !!allCourses ? allCourses[0].slug : null
  // );

  // const router = useRouter();

  // // console.log("router", router.query.slug);

  // const newCourse = router.query.slug;

  // useEffect(() => {
  //   if (!allCourses || allCourses.length === 0) {
  //     return <Alert severity="error">Courses not found</Alert>;
  //   } else if (currentCourse !== newCourse) {
  //     console.log("currentCourse", currentCourse);
  //     console.log("newCourse", newCourse);
  //     setCurrentCourse(newCourse);
  //   }
  // }, [currentCourse, allCourses, newCourse]);
  // // make sure array dependencies are correct

  // // const [lessons, setLessons] = useState(null)
  // // const [isLoading, setLoading] = useState(false)

  // // useEffect(() => {
  // //     setLoading(true)
  // //     const url = "api/lessons";
  // //     const params = {};
  // //     try {
  // //         const fetchLessonData= async () => {
  // //             const response = await getData(params, url)
  // //             setLessons(data)

  // //         }
  // //     } catch(e) {
  // //         console.log("error",e.message)
  // //     }
  // // },[])

  return (
    <Grid container spacing={2}>
      {/* {currentCourse === newCourse ? ( */}
        <>
          <Header
            courseTitle={courseData.course_name}
            allCourses={allCourses}
          />
          {/* rename section */}
          <Form lessons={courseData.lessons} />
        </>
      {/* ) : undefined} */}
    </Grid>
  );
}
CourseManagement.getLayout = privateLayout;
export async function getServerSideProps(context) {
  const session = await getSession(context);
  console.log("params", context.params);
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
  // may have to make another function to get all the coursenames since theyre not in courseData
  const courseSlug = context.params["slug"];
  // console.log("slug", courseSlug);
  const courseData = await getCourseFromMongo(courseSlug);
  const allCourses = await getAllCourses();

  // console.log(JSON.stringify(courseData, null, 4));

  return {
    props: {
      user,
      // must be serialized as json
      courseData: JSON.parse(JSON.stringify(courseData)),
      allCourses: JSON.parse(JSON.stringify(allCourses)),
    },
  };
}
