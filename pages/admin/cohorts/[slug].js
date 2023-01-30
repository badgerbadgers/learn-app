import { Box, Button, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import CohortHeader from "./components/CohortHeader";
import Grid from "@mui/material/Unstable_Grid2";
import IndCohortGrid from "./components/IndCohortGrid";
import { getPrevAndNextCohortSlugs } from "../../../lib/cohortData";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { privateLayout } from "../../../components/layout/PrivateLayout";
import getData from "../../../lib/getData";
import ScheduleModal from "./components/ScheduleModal";

const IndividualCohortPage = ({ prevCohort, nextCohort }) => {
  const [loading, setLoading] = useState(true);
  const [cohort, setCohort] = useState(null);
  const [students, setStudents] = useState([]);
  const [open, setOpen] = useState(false);
  const [schedule, setSchedule] = useState([]);
  const router = useRouter();
  const query = router.query;

  useEffect(() => {
    let cohort = {};
    const url = "/api/cohorts/slug/" + `${query.slug}`;
    const params = { slug: query.slug };
    try {
      (async () => {
        const response = await getData(params, url);
        cohort = response.cohort;
        setCohort(cohort);

        setSchedule(cohort.schedule);
        setLoading(false);
        //TMP for MVP, needs to be changed when DB scema and Student model are ready
        if (cohort.students) {
          const localStudents = [];
          cohort.students.map((st) => {
            if (!st.user) {
              return;
            }
            let student = st.user;
            student.id = student._id;
            delete student._id;
            localStudents.push(student);
          });
          await setStudents(localStudents)
        }
      })();
    } catch (error) {
      console.log("An error from getData in", url, error);
    }
  }, [])




  return (
    <Container>
      {!cohort && !loading && (
        <Grid>
          <Typography align="center" variant="body1" gutterBottom>
            This cohort was not found
          </Typography>
          <Button href="/admin/cohort-management" sx={{ m: 5 }}>
            Back to cohort management
          </Button>
        </Grid>
      )}
      {cohort && !loading && (
        <Box>

          <CohortHeader
            title={cohort.cohort_name}
            course={cohort.course}
            setOpen={setOpen}
            startDate={cohort.start_date}
            scheduleLen={schedule.length}
            prevCohort={prevCohort}
            nextCohort={nextCohort}
          />
          <IndCohortGrid
            loading={loading}
            students={students}
          />
          <ScheduleModal
            open={open}
            setOpen={setOpen}
            id={cohort._id}
            cohortName={cohort.cohort_name}
            startDate={cohort.start_date}
            schedule={schedule}
            setSchedule={setSchedule}
          />
        </Box>
      )}
    </Container>
  )
}

export default IndividualCohortPage;

IndividualCohortPage.getLayout = privateLayout;
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

  const [prevCohort, nextCohort] = (await getPrevAndNextCohortSlugs(context.params["slug"])) || null;
  return {
    props: {
      slug: context.params["slug"],
      user,
      prevCohort,
      nextCohort,
    },
  };
}