import { Box, Button, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CohortHeader from "./components/CohortHeader";
import Grid from "@mui/material/Unstable_Grid2";
import IndCohortGrid from "./components/IndCohortGrid";
import { getPrevAndNextCohortSlugs } from "../../../lib/cohortData";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { privateLayout } from "../../../components/layout/PrivateLayout";
import { format, formatDistance } from "date-fns";
import ScheduleModal from "./components/ScheduleModal";
import { getCohortById } from "pages/api/v1/cohorts/[id]";
import { getCohortStudents } from "pages/api/v1/cohorts/[id]/students";

const IndividualCohortPage = ({ cohort, students, prevCohort, nextCohort }) => {
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState(cohort.start_date);

  return (
    <Container>
      {!cohort && (
        <Grid>
          <Typography align="center" variant="body1" gutterBottom>
            This cohort was not found
          </Typography>
          <Button href="/admin/cohort-management" sx={{ m: 5 }}>
            Back to cohort management
          </Button>
        </Grid>
      )}
      {cohort && (
        <Box>
          <CohortHeader
            title={cohort.cohort_name}
            course={cohort.course}
            setOpen={setOpen}
            startDate={startDate}
            setStartDate={setStartDate}
            scheduleLen={cohort.schedule && cohort.schedule.length} // TODO - check if schedule is not null?
            prevCohort={prevCohort}
            nextCohort={nextCohort}
          />

          <IndCohortGrid students={students} />
          <ScheduleModal
            open={open}
            setOpen={setOpen}
            id={cohort._id}
            cohortName={cohort.cohort_name}
            startDate={cohort.start_date}
            setStartDate={setStartDate}
          />
        </Box>
      )}
    </Container>
  );
};

export default IndividualCohortPage;

IndividualCohortPage.getLayout = privateLayout;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  // TODO - check if the logged in user is admin?

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  // const { user } = session;

  try {
    const cohortId = context.params.id;

    // get cohort data
    const cohort = JSON.parse(JSON.stringify(await getCohortById(cohortId)));
    // get cohort students
    const data = JSON.parse(JSON.stringify(await getCohortStudents(cohortId)));
    console.log("----------");
    console.log(data, "DATA");
    // TODO  - the filtering should be done in API handler
    const students =
      data.students
        ?.map((st) => {
          if (st.user) {
            const filteredStudent = {
              id: st.user._id,
              ...st.user,
              added_at: st.added_at, // add '|| null' here
            };
            delete filteredStudent._id;
            return filteredStudent;
          }
        })
        .filter((student) => student) || []; // filter to get students which are not null and return empty array if students returned as empty array
    console.log(students, "++++++++");
    const [prevCohort, nextCohort] = (await getPrevAndNextCohortSlugs(
      cohortId
    )) || [null, null]; // || null; // ** null is not iterable
    // https://avatars.githubusercontent.com/u/2739321?v=4
    return {
      props: {
        cohort,
        students,
        prevCohort,
        nextCohort,
      },
    };
  } catch (error) {
    console.error(error);
    // TODO - what return here: redirect to a custom error page (404, 403, 500) or send an error in props and let components handle it???

    // nextjs docs - https://nextjs.org/blog/next-10#notfound-support
    if (error.status === 404) {
      return { notFound: true };
    }
    // possible solution ideas - https://github.com/vercel/next.js/discussions/12652#discussioncomment-90145
    throw new Error(error);
  }
}
