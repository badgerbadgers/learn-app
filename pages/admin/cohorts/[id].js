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
  // console.log(cohort);
  // console.log(students);

  const [open, setOpen] = useState(false);
  //const [schedule, setSchedule] = useState(cohort.schedule);
  const [startDate, setStartDate] = useState(cohort.start_date);

  // const router = useRouter();
  // const query = router.query;

  // useEffect(() => {
  //   // let cohort = {};

  //   // const url = `/api/v1/cohorts/${query.id}`;
  //   // const params = {}; //{ slug: query.slug };
  //   try {
  //     (async () => {
  //       setLoading(true);
  //       const response = await getData(params, url);
  //       cohort = response.data;
  //       setCohort(cohort);
  //       console.log(cohort);
  //       setSchedule(cohort.schedule);
  //       setLoading(false);
  //       //TMP for MVP, needs to be changed when DB schema and Student model are ready
  //       if (cohort.students) {
  //         const localStudents = [];
  //         cohort.students.map((st) => {
  //           if (!st.user) {
  //             return;
  //           }
  //           const student = {
  //             id: st.user._id,
  //             ...st.user,
  //             studentAdded: st.added_at,
  //           };
  //           delete student._id;
  //           console.log(student);
  //           localStudents.push(student);
  //         });
  //         await setStudents(localStudents);
  //       }
  //     })();
  //   } catch (error) {
  //     console.log("An error from getData in", url, error);
  //   }
  // }, [query]);
  //  {!cohort && !loading && (
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
            //   startDate={cohort.start_date}
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
            // schedule={schedule}
            // setSchedule={setSchedule}
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
  // TODO - check if the logged in user is admin

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
    const [prevCohort, nextCohort] =
      (await getPrevAndNextCohortSlugs(cohortId)) || null; // TODO  - why return null if nothing is returned
    // get cohort data
    const cohort = JSON.parse(JSON.stringify(await getCohortById(cohortId)));
    // get cohort students
    const data = JSON.parse(JSON.stringify(await getCohortStudents(cohortId)));
    const students =
      data.students?.map((st) => {
        if (st.user) {
          const filteredStudent = {
            id: st.user._id,
            ...st.user,
            added_at: st.added_at,
          };
          delete filteredStudent._id;
          return filteredStudent;
        }
      }) || [];

    return {
      props: {
        cohort,
        students,
        prevCohort,
        nextCohort,
      },
    };
  } catch (err) {
    console.error(err);
    // TODO - what return here: redirect to a custom error page or send an error in props and let components handle it???
  }
}
