import React from "react";
import { getSession } from "next-auth/react";
import DashBoardCard from "./components/DashBoardCard";
import CTDToolsCard from "./components/CTDToolsCard";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Container } from "@mui/material";
import { dashBoardInfo, cardStyles } from "../../lib/dashBoardCardsInfo";
import DashBoardHeader from "./components/DashBoardHeader";
import DashBoardCardsLayout from "./components/DashBoardCardsLayout";
import { privateLayout } from "../../components/layout/PrivateLayout";

const Dashboard = ({ user }) => {
  //use a query to adjust mobile view
  const matches = useMediaQuery("(min-width:600px)");

  return (
    <Container
      sx={{ textAlign: "center", p: !matches && 1 }}
      className="extra-top-padding"
    >
      <DashBoardHeader />
      <DashBoardCardsLayout matches={matches}>
        <CTDToolsCard style={cardStyles} user={user} />

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
    </Container>
  );
};

export default Dashboard;

Dashboard.getLayout = privateLayout;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const { user } = session;
  if (!user.hasProfile) {
    return {
      redirect: {
        destination: "/signup",
        permanent: false,
      },
    };
  }
  return {
    props: { user },
  };
}

