import React, { useEffect } from "react";
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";

import DashBoardCard from "./components/DashBoardCard";
import CtdTooldCard from "./components/CtdToolsCard";
import useMediaQuery from "@mui/material/useMediaQuery";

import { Container, Grid, Typography, Paper } from "@mui/material";
import { dashBoardInfo } from "../../lib/dashBoardCardsInfo";
import DashbrdHeader from "./components/DashbrdHeader";
import CardsLayoutDashbrd from "./components/CardsLayoutDashbrd";

const Dashboard = () => {
  const { data: session } = useSession();

  //use a query to adjust mobile view
  const matches = useMediaQuery("(min-width:600px)");
  console.log("session", session);
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, [router, session]);

  return (
    <Container sx={{ textAlign: "center", p: !matches && 1 }}>
      {session && (
        <>
          <DashbrdHeader />
          <CardsLayoutDashbrd matches={matches}>
            <CtdTooldCard />

            {dashBoardInfo.map((info) => {
              return (
                <DashBoardCard
                  key={info.title}
                  title={info.title}
                  text={info.text}
                  icon={info.icon}
                  href={info.href}
                />
              );
            })}
          </CardsLayoutDashbrd>
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
