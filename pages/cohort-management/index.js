import React from "react";
import { getSession } from "next-auth/react";
import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import { privateLayout } from "../../components/PrivateLayout";
import CoursesTable from "./components/CoursesTable";

const CourseManagement = ({ user }) => {


  return (
    <Container 
    // sx={{backgroundColor: "silver"}}
    >
      <Typography variant="h5" gutterBottom component="h2">CTD Cohorts</Typography>
{/* 
        <Toolbar   sx={{ justifyContent: "space-between" }}>
            <Typography variant="h6"> Filters.</Typography>
            <Typography variant="h6"> Search. </Typography>
            <Typography variant="h6"> Add btn.</Typography>
        </Toolbar> */}
        <CoursesTable/>


    </Container>
  );
};

export default CourseManagement;

CourseManagement.getLayout = privateLayout;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  const { user } = session;
  if(!user.hasProfile) {
    return {
      redirect: {
        destination: '/signup',
        permanent: false,
      }
    }
  }
  return {
    props: { user },
  }
}
