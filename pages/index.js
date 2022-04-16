//import { getSession } from "next-auth/react";
import LogIn from "../components/Login";
import { Typography } from "@mui/material";
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import Image from 'next/image'
import { useEffect } from "react";
import styles from '../styles/Home.module.css'

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
      {/* <Typography variant="h3">
        Code the Dream Apprentice Landing Page</Typography> */}
      <div className={styles.homeOuter}>
        <div className={styles.left}></div>
        <div className={styles.right}></div>
        <div className={styles.inner}>
          <Image src="/img/labs_mc-01.png" width={400} height={320}/>
          <LogIn />  
        </div>
      </div>
    
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
