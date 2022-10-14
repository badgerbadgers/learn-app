import useMediaQuery from "@mui/material/useMediaQuery";
import { getSession } from "next-auth/react";
import { privateLayout } from "../../components/layout/PrivateLayout";
import CheckListCard from "./components/CheckListCard";
import WeeklyMeetingsCard from "./components/WeeklyMeetingsCard";
import CTDAdminCard from "./components/CTDAdminCard";
import CTDMissionCard from "./components/CTDMissionCard";
import CheckListLayout from "./components/CheckListLayout";

export default function ChecklistPage() {
  //use a query to adjust mobile view
  const matches = useMediaQuery("(min-width:900px)");
  return (
    <CheckListLayout matches={matches}>
      <CheckListCard />
      <WeeklyMeetingsCard />
      <CTDAdminCard />
      <CTDMissionCard />
    </CheckListLayout>
  );
}

ChecklistPage.getLayout = privateLayout;

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
  if (session) {
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
      props: {},
    };
  }
}

