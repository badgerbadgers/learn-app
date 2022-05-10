import { getSession } from "next-auth/react";
import LogIn from "../components/Login";
import { Typography } from "@mui/material";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import ImageWall from "../components/ImageWall";

export default function Home() {
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

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  //if no session exists - redirect to login 
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  if (session) { //if session exists - redirect to dashboard
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }
  return { 
    props: { session },
  };
}
