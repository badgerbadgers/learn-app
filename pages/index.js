//import { getSession } from "next-auth/react";
import LogIn from "../components/Login";
import { Typography } from "@mui/material";
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import Image from 'next/image'
import { useEffect } from "react";
import styles from '../styles/Home.module.css'
import DreamWall from '../components/DreamWall'

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter()


  useEffect(() => {
    if (session) {
      router.push('/dashboard')
    }
  }, [])

  return (
    <>
    <DreamWall />
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
