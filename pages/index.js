import { getSession } from "next-auth/react";
import LogIn from "../components/Login";
import { Typography } from "@mui/material";

export default function Home() {


  return (
    <>
   
        <Typography
          variant="h3"
        >
          Code the Dream Apprentice Landing Page
        </Typography>
        <LogIn />
 
    </>
  );
}


export async function getServerSideProps(context) {


  return {
    props: {
      session: await getSession(context),
    },

  }
}
