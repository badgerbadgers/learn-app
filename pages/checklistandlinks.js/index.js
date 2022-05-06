import {
  Container,
  Paper,
  Grid,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import PrivateLayout from "../../components/PrivateLayout";

import CheckListCard from "./components/CheckListCard";
import WeeklyMeetingsCard from "./components/WeeklyMeetingsCard";

//import DOMPurify from "isomorphic-dompurify";
import styles from "../../styles/Knowledge.module.css";
import CTDAdminCard from "./components/CTDAdminCard";
import CTDMissionCard from "./components/CTDMissionCard";

export default function ChecklistPage() {
  //use a query to adjust mobile view
  const matches = useMediaQuery("(min-width:900px)");
  return (
    //layout
    <Container
      className={styles.checklistLink}
      sx={{ textAlign: "center", p: !matches && 1 }}
    >
      <Paper
        sx={{
          //minWidth: 330,
          backgroundColor: "background.dbpaper",
          my: 2,
          mx: "auto",
          p: matches ? 8 : 2,
        }}
      >
        <Grid
          container
          rowSpacing={2}
          m={0}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          sx={{ justifyContent: "center" }}
        >
          <CheckListCard />
          <WeeklyMeetingsCard />
          <CTDAdminCard />
          <CTDMissionCard />
        </Grid>
      </Paper>
    </Container>
  );
}

ChecklistPage.getLayout = function getLayout(page) {
  return <PrivateLayout>{page}</PrivateLayout>;
};
