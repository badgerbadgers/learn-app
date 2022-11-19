import { Box, Button, Container, Typography } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { compareAsc, parseISO } from "date-fns";

import CohortHeader from "./components/CohortHeader";
import Grid from "@mui/material/Unstable_Grid2";
import IndCohortContent from "./components/IndCohortContent";
import ScheduleModal from "./components/ScheduleModal";
import getData from "../../../lib/getData";
import { getSession } from "next-auth/react";
import { privateLayout } from "../../../components/layout/PrivateLayout";
import { useRouter } from "next/router";
import { useTheme } from "@emotion/react";

const IndividualCohortPage = () => {
  const [loading, setLoading] = useState(true);
  const [cohort, setCohort] = useState(null);
  const [open, setOpen] = useState(false);
  const [schedule, setSchedule] = useState([]);
  const [prevCohort, setPrevCohort] = useState(null);
  const [nextCohort, setNextCohort] = useState(null);
  const router = useRouter();
  const theme = useTheme();

  const query = router.query;

  useEffect(() => {
    let cohort = {}
    const url = "/api/cohorts/slug/" + (`${query.slug}`);
    const params = { slug: query.slug };
    try {
      (async () => {
        const response = await getData(params, url);
        cohort = response.cohort;
        console.log(cohort)
        setCohort(cohort);
        setSchedule(cohort.schedule);
        setLoading(false);
      })();
    } catch (error) {
      console.log("An error from getData in", url, error);
    }
  }, [])



  //get prev and next to nav between cohorts

  useEffect(() => {
    if (!cohort) return
    const url = "/api/cohorts/nextPrev";
    const params = { params: { 
      currCohortName: cohort.cohort_name,
      targetDate: cohort.start_date,
   } };
    try {
      (async () => {
        const cohortList = await getData(params, url);
        console.log('cohortList in USE', cohortList)
      }
      )()

    } catch (error) {
      console.log(`An error from ${url}`, error);
    }
  }, [cohort])

  return (
    <Container>
      {!cohort && !loading && (
        <Grid>
          <Typography align="center" variant="body1" gutterBottom>
            This cohort was not found
          </Typography>
          <Button
            href="/admin/cohort-management"
            sx={{ m: 5 }}>
            Back to cohort management
          </Button>
        </Grid>
      )}
      {cohort && !loading && (
        <Box>
{/* 
          <CohortHeader
            title={cohort.cohort_name}
            course={cohort.course}
            setOpen={setOpen}
            startDate={cohort.start_date}
            scheduleLen={schedule.length}
            prev={prevCohort} //prevCohort._id
            next={nextCohort} //nextCohort._id
          /> */}
          <IndCohortContent />

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
  if (!user.hasProfile) {
    return {
      redirect: {
        destination: "/signup",
        permanent: false,
      },
    };
  }
  return {
    props: {
      slug: context.params["slug"],
      user,
    },
  };
}
