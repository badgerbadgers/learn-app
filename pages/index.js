import { getSession } from "next-auth/react";
import LogIn from "../components/Login";
import {getGitHubMembers, getGitHubRepos} from "../lib/github";
import { Typography } from "@mui/material";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import ImageWall from "../components/ImageWall";

export default function Home() {
    // getGitHubMembers()
  // getGitHubRepos()
  return (
    <>
      {/* <ImageWall />  */}
      <div className={styles.indexOverlay}></div>
      <div className={styles.homeOuter}>
        <div className={styles.left}></div>
        <div className={styles.right}></div>
        <div className={styles.inner}>
          <Image alt="" src="/img/labs-g-01.png" width={420} height={320} />
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
