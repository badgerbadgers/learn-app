import React, { useEffect } from "react";
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";

import DashBoardCard from "./components/DashBoardCard";
import CTDToolsCard from "./components/CTDToolsCard";
import useMediaQuery from "@mui/material/useMediaQuery";

import { Container } from "@mui/material";
import { dashBoardInfo, cardStyles } from "../../lib/dashBoardCardsInfo";
import DashBoardHeader from "./components/DashBoardHeader";
import DashBoardCardsLayout from "./components/DashBoardCardsLayout";



const Dashboard = () => {

  const { data: session } = useSession();

  //use a query to adjust mobile view
  const matches = useMediaQuery("(min-width:600px)");

  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, []);

  return (
    <Container sx={{ textAlign: "center", p: !matches && 1 }}>
      {session && (
        <>
          <DashBoardHeader />
          <DashBoardCardsLayout matches={matches}>
            <CTDToolsCard style={cardStyles}/>

            {dashBoardInfo.map((info) => {
              return (
                <DashBoardCard
                  key={info.title}
                  title={info.title}
                  text={info.text}
                  icon={info.icon}
                  href={info.href}
                  style={cardStyles}
                />
              );
            })}
          </DashBoardCardsLayout>
        </>
      )}
    </Container>
  );
};

export default Dashboard;

export async function getServerSideProps(context) {
  
  return {
    props: {
      session: await getSession(context),
    },
  };
}

Dashboard.auth = {
  role: "admin",
  // loading: <AdminLoadingSkeleton />,
  unauthorized: "/", // redirect to this url
}