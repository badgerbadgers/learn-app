import React from "react";
import ReportButton from "./components/ReportButton";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { getSession } from "next-auth/react";
import { privateLayout } from "../../../components/layout/PrivateLayout";

const AcceptanceFormReports = () => {
  return (
    <Container sx={{ textAlign: "center" }}>
      <Typography pb={4} sx={{ fontWeight: 100, fontSize: "3rem" }}>
        Acceptance Form Reports
      </Typography>
      <ReportButton />
    </Container>
  );
};

export default AcceptanceFormReports;

AcceptanceFormReports.getLayout = privateLayout;

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

  return {
    props: { user },
  };
}
