import { Button } from '@mui/material';
import { getSession } from 'next-auth/react';
import { privateLayout } from '../../../components/PrivateLayout';
import { useRouter } from 'next/router';

const IndividualCohortPage = () => {
  const router = useRouter()
  const { pid } = router.query

  return <Button>Change Schedule</Button>
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
