import React, { useEffect } from "react";
import { getSession } from "next-auth/react";
import { Container, Typography } from "@mui/material";
import { privateLayout } from "../../components/PrivateLayout";
import testTry from "../../lib/airtableToMongoMigration"
import ClassesTable from "./components/ClassesTable";



const ClassesManagement = ({ user }) => {
  
  //tmp! 
  useEffect(()=> {
    testTry(process.env.NEXT_PUBLIC_AIRTABLE_TEST)
  },[])
    
  
  return (
    <Container 
    // sx={{backgroundColor: "silver"}}
    >
      <Typography variant="h5" gutterBottom component="h2">CTD Classes</Typography> 
        <ClassesTable/>
    </Container>
  );
};

export default ClassesManagement;

ClassesManagement.getLayout = privateLayout;

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
