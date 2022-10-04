import { Button, Grid, Typography } from '@mui/material';
import { Fragment, useEffect, useState } from 'react';

import getData from '../../../lib/getData';
import { getSession } from 'next-auth/react';
import { privateLayout } from '../../../components/PrivateLayout';
import { useRouter } from 'next/router';

const IndividualCohortPage = () => {
  const [cohort, setCohort] = useState(null);
  const router = useRouter();
  const query = router.query;



  useEffect(() => {
    let cohort = {}
    const url = "/api/cohorts/slug/" + (`${query.slug}`);
    const params = { slug: query.slug };
    try {
      (async () => {
        const response = await getData(params, url);
        cohort = response.cohort;
        console.log("COHORT", cohort);
        setCohort(cohort)
      })();
    } catch (error) {
      console.log("An error from getData in", url, error);
    }
  }, [])

  return (
    <Fragment>
      {!cohort && (
        <Grid>
          <Typography variant="body1" gutterBottom>
            This cohort was not found
          </Typography>
          <Button> Back to cohort management</Button>

        </Grid>

      )
      }
      {cohort && (
        <Grid>
          <Typography variant="h2" gutterBottom>
            {cohort.cohort_name}
          </Typography>

          <Button>Change Schedule</Button>
        </Grid>

      )
      }


    </Fragment>
  )
}

export default IndividualCohortPage


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
  console.log('context', context)
  const slug = context.params["slug"];

  return {
    props: {
      slug: context.params["slug"],
      user,
    },
  };
}
