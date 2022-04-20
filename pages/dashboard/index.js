import React, { useEffect } from "react";
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";

import DashBoardCard from "./components/DashBoardCard";
import CtdTooldCard from "./components/CtdToolsCard";
import useMediaQuery from "@mui/material/useMediaQuery";

import { Container, Grid, Typography, Paper } from "@mui/material";
import { dashBoardInfo } from "../../lib/dashBoardCardsInfo";

import PsychologyIcon from "@mui/icons-material/Psychology";

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
          <Typography variant="h3" gutterBottom color="secondary">
            <PsychologyIcon
              color="secondary"
              style={{
                fontSize: "54px",
                position: "relative",
                top: "8px",
              }}
            />{" "}
            Knowledge Base
          </Typography>

          <Paper
            sx={{
              minWidth: 330,
              backgroundColor: "#F4F5F7",
              my: 2,
              mx: "auto",
              p: matches ? 8 : 1,
            }}
          >
            <Grid
              container
              rowSpacing={2}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              sx={{ justifyContent: "center" }}
            >
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
            </Grid>
          </Paper>
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
