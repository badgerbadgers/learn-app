import React from "react";
import { getSession } from "next-auth/react";
import { Container, Typography } from "@mui/material";
import { privateLayout } from "../../components/PrivateLayout";

const CourseManagement = ({ user }) => {


  return (
    <Container sx={{ textAlign: "center" }}>
      <Typography>Test</Typography>
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
