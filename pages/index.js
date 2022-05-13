import { getSession } from "next-auth/react";
import LogIn from "../components/Login";
import { Typography } from "@mui/material";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import ImageWall from "../components/ImageWall";
import { publicLayout } from "../components/PublicLayout";
export default function Home({user}) {
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

Home.getLayout = publicLayout;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (session) {
    //if session exists - redirect to dashboard
    const { user } = session;
    // console.log(user, 'user in homepage');
    // you have to take out the redirect to use the user on client side 
    //bc it happens before the props are passed
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
      props: { user },
    };
  }
}
