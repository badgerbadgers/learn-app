import { getSession } from "next-auth/react";
import LogIn from "../components/Login";
import { Typography } from "@mui/material";
import Image from "next/image";
import { publicLayout } from "../components/layout/PublicLayout";
export default function Home({ user }) {
  return (
    <div>
      <Image alt="" src="/img/labs-g-01.png" width={315} height={240} />
      <Typography variant="h5" sx={{ textAlign: "center" }}>
        Building Together
      </Typography>
      <LogIn />
    </div>
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

  if (!session) {
    return {
      props: {},
    };
  }
}

