//import { getSession } from "next-auth/react";
import LogIn from "../components/Login";
import { Typography } from "@mui/material";
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import Image from 'next/image'

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter()
  if (session) {
    router.push('/dashboard')
  }
  return (
    <>
      {/* <Typography variant="h3">
        Code the Dream Apprentice Landing Page</Typography> */}
      <Image src="/img/ctd-logo.png" width={300} height={300}/>
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
