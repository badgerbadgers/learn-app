import React, { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { Container, Typography } from "@mui/material";
import { privateLayout } from "../../components/PrivateLayout";
import getData from "../../lib/getData";
import CohortsTable from "./components/CohortsTable";

const CohortManagement = () => { // do we need addtional check if user is Admin? 

  const urlCohorts = "/api/cohorts";
  const urlCourses = "/api/courses";
  const [loading, setLoading] = useState(true);
  const [cohorts, setCohorts] = useState([]);
  const [courseNames, setCoursenames] = useState({});
  const [tableRows, setTableRows] = useState([])


  const makeRowfromDbCohort = (i, dbItem, courseName) => {
    console.log('dbItem ====>', dbItem)
    return {
      id: i, // Tmp solution for MUI data grid. We need to come up with a format for ID that works best for Mary Alice 
      cohortName: dbItem.cohort_name,
      courseName: courseName,
      startDate: new Date(dbItem.start_date),
      endDate: new Date(dbItem.end_date),
      week: 'counting', // TODO: function that counts weeks accurately (winter holidays, summer breaks, delays etc)
      status: 'in progress',
      students: `${dbItem.students.length} / ${dbItem.seats}`, //
      mentors: `${dbItem.mentors[0].length} / ${dbItem.mentors[1].length}`, // Assignment reviewers / traditional mentors
      archive:'archive' }

  } 

  useEffect(() => {
    setLoading(true);
    const params = {}
    try {
      (async () => {
        await getData(params, urlCohorts).then((cohorts) => {
          
          const courseIds = cohorts.map(cohort => cohort.course_id);
          
          
          
          let localTableRows = []
          if (cohorts) {
            setCohorts(cohorts)
            console.log(cohorts, 'cohorts before loop')
            for (let i=0; i<cohorts.length; i++) {
              const courseName = 'React';
              console.log(cohorts[i], 'inside for loop')
              localTableRows.push(makeRowfromDbCohort(i, cohorts[i], courseName));
            }
          }

          setTableRows(localTableRows);
          console.info("localTableRows", localTableRows);

          console.log('data recieved from API', cohorts)


          setLoading(false);
        });
      })();
    ;
    } catch (error) {
      console.log(error, "error from getData in /api/usersprofile");
    }
  }, [])

  return (
    <Container sx={{ textAlign: "center" }}>
      <Typography  pb={4} sx={{fontWeight: 100, fontSize: '3rem',}} >Cohort Management</Typography>
      <CohortsTable loading={loading} tableRows={tableRows} />
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
  if (!user.hasProfile) {
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
