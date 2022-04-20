import React, { useEffect } from "react";
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";

import DashBoardCard from "./components/DashBoardCard";
import CtdTooldCard from "./components/CtdToolsCard";
import useMediaQuery from "@mui/material/useMediaQuery";

import {
  Container,
  Grid,
  Typography,
  Paper,

} from "@mui/material";

import CastForEducationIcon from "@mui/icons-material/CastForEducation";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import PsychologyIcon from "@mui/icons-material/Psychology";



const iconStyle = {
  fontSize: "38px",
  position: "relative",
  top: "8px",
};

const dashBoardInfo = [
  {
    title: "Skills Zones",
    text: "CTD Labs skills and zones rubric used for apprentice evaluations.",
    icon: <TrackChangesIcon color="primary" style={iconStyle} />,
    href: "/knowledge-base/zones",
  },
  {
    title: "Pair Programming",
    text: "Information and process about how CTD Labs implements pair programming.",
    icon: <ConnectWithoutContactIcon color="primary" style={iconStyle} />,
    href: "/knowledge-base/pair-pgr-page",
  },
  {
    title: "Resourses",
    text: "Student Resources.",
    icon: <CastForEducationIcon color="primary" style={iconStyle} />,
    href: "/knowledge-base/resourses",
  },
];

const Dashboard = () => {
  const { data: session } = useSession();
  console.log("SESSION", session);

  const matches = useMediaQuery("(min-width:600px)");

  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, []);

  return (
  
    <Container sx={{ textAlign: "center", p: !matches && 1 }}>
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
          // maxWidth: 800,
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
