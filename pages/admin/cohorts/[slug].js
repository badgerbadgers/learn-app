import { Button, Grid, Typography } from "@mui/material";
import { Fragment, useEffect, useState } from "react";

import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { privateLayout } from "../../../components/layout/PrivateLayout";
import getData from "../../../lib/getData";
import ScheduleModal from "./components/ScheduleModal";

const IndividualCohortPage = () => {
  const [loading, setLoading] = useState(true);
  const [cohort, setCohort] = useState(null);
  const [open, setOpen] = useState(true);
  const router = useRouter();
  const query = router.query;
  const [schedule, setSchedule] = useState([]);

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
      })();
    } catch (error) {
      console.log("An error from getData in", url, error);
    }
  }, []);

  return (
    <Fragment>
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
      {cohort && (
        <Grid>
          <Typography variant="h2" align="center" gutterBottom>
            {cohort.cohort_name}
          </Typography>
          <Button
            color="secondary"
            href="/admin/cohort-management"
            sx={{ m: 5 }}
          >
            Back to cohort management
          </Button>
          <Button align="center" onClick={() => setOpen(true)}>
            Change Schedule
          </Button>

          <ScheduleModal
            open={open}
            setOpen={setOpen}
            id={cohort._id}
            cohortName={cohort.cohort_name}
            startDate={cohort.start_date}
            schedule={schedule}
            setSchedule={setSchedule}
          />
        </Grid>
      )}
    </Fragment>
  );
};

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
