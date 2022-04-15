//import { getSession } from "next-auth/react";
import LogIn from "../components/Login";
import { Typography } from "@mui/material";
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
export default function Home() {
  const { data: session } = useSession();
  const router = useRouter()
  if (session) {
    router.push('/dashboard')
  }
  return (
    <>
      <Typography variant="h3">
        Code the Dream Apprentice Landing Page</Typography>
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
