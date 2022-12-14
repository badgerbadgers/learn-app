import React, { useState, useEffect } from "react";
// import getData from "../../../lib/getData"
import { privateLayout } from "../../../components/layout/PrivateLayout";
import { getCourseFromMongo } from "../../../lib/course";
import { getSession } from "next-auth/react";
import dbConnect from "../../../lib/dbConnect";
import Header from "./components/Header";
import Grid from '@mui/material/Grid';
import Section from "./components/Section"

// don't forget there is the lesson.js in api
export default function CourseManagement(courseData) {
  console.log(courseData);
  // const [lessons, setLessons] = useState(null)
  // const [isLoading, setLoading] = useState(false)

  // useEffect(() => {
  //     setLoading(true)
  //     const url = "api/lessons";
  //     const params = {};
  //     try {
  //         const fetchLessonData= async () => {
  //             const response = await getData(params, url)
  //             setLessons(data)

  //         }
  //     } catch(e) {
  //         console.log("error",e.message)
  //     }
  // },[])

  return (
    <Grid container spacing={2} sx={{ backgroundColor: "yellow" }}>
      {/* not sure if I need the whole courseData to map */}
      <Header courseData={courseData} />
      <Section/>
      
    </Grid>
  );
}
CourseManagement.getLayout = privateLayout;
export async function getServerSideProps(context) {
  const session = await getSession(context);
  console.log("params",context.params)
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
  const courseSlug = context.params["slug"];
  console.log("slug", courseSlug);
  const courseData = await getCourseFromMongo(courseSlug);
  // console.log(JSON.stringify(courseData, null, 4));

  return {
    props: {
      user,
      // must be serialized as json
      courseData: JSON.parse(JSON.stringify(courseData)),
    },
  };
}
