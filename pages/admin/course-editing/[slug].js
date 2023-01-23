import React from "react";
import { privateLayout } from "../../../components/layout/PrivateLayout";
import { getCourseFromMongo, getAllCourses } from "../../../lib/course";
import { getSession } from "next-auth/react";
import dbConnect from "../../../lib/dbConnect";
import Header from "./components/Header";
import  Grid  from "@mui/material/Grid";
import Form from "./components/Form.js";

export default function CourseManagement({ courseData, allCourses }) {
  return (
    <Grid container spacing={2}>
      <Header courseTitle={courseData.course_name} allCourses={allCourses} />
      <Form lessons={courseData.lessons} />
    </Grid>
  );
}
CourseManagement.getLayout = privateLayout;
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

  const courseSlug = context.params["slug"];
  const courseData = await getCourseFromMongo(courseSlug);
  const allCourses = await getAllCourses();

  return {
    props: {
      user,
      // must be serialized as json
      courseData: JSON.parse(JSON.stringify(courseData)),
      allCourses: JSON.parse(JSON.stringify(allCourses)),
    },
  };
}
