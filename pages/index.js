import { useEffect } from "react";
import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";
import LogIn from "../components/Login";
import { Typography } from "@mui/material";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import ImageWall from "../components/ImageWall";

export default function Home(props) {
  const { data: session } = useSession();
  const router = useRouter()

  useEffect(() => {
    if (session) {
      router.push('/dashboard')
    }
  }, [])

  return (
    <>
      {/* <ImageWall />  */}
      <div className={styles.indexOverlay}></div>
      <div className={styles.homeOuter}>
        <div className={styles.left}></div>
        <div className={styles.right}></div>
        <div className={styles.inner}>
          <Image alt="" src="/img/labs-g-01.png" width={315} height={240} />
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            Building Together
          </Typography>
          <LogIn />
        </div>
      </div>
    </>
  );
}

Home.displayName = "Home";

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getSession(context),
   
    },
  };
}
