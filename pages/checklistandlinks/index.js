import useMediaQuery from "@mui/material/useMediaQuery";
import {privateLayout} from "../../components/PrivateLayout";

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

ChecklistPage.getLayout = privateLayout
