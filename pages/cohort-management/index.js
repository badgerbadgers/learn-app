import React, {useEffect, useState} from "react";
import { getSession } from "next-auth/react";
import { Container, Typography } from "@mui/material";
import { privateLayout } from "../../components/PrivateLayout";
import getData from "../../lib/getData";

const CohortManagement = ({ user }) => {

    const url = "/api/cohorts";
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        setLoading(true);
        const params = {}
        try {
            (async () => {
              await getData(params, url).then((data) => {
                if (data) {
               
                 console.log('data recieved from API', data)
                }
                setLoading(false);
              });
            })();
          } catch (error) {
            console.log(error, "error from getData in /api/usersprofile");
          }
    },[])



  return (
    <Container sx={{ textAlign: "center" }}>
      <Typography>Test</Typography>
    </Container>
  );
};


export default CohortManagement;

CohortManagement.getLayout = privateLayout;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  const { user } = session;
  if(!user.hasProfile) {
    return {
      redirect: {
        destination: '/signup',
        permanent: false,
      }
    }
  }
  return {
    props: { user },
  }
}
