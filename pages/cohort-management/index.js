import React, { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { format } from "date-fns";
import { privateLayout } from "../../components/PrivateLayout";
import getData from "../../lib/getData";
import CohortsTable from "./components/CohortsTable";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';



const CohortManagement = () => {

  const url = "/api/cohorts";
  const [loading, setLoading] = useState(true);
  const [tableRows, setTableRows] = useState([]);
  const [id, setId] = useState(0);
  const [courses, setCourses] = useState([]);

  const setStatus = (start, end) => {
    if (new Date(start) <= new Date() && new Date() <= new Date(end)) return "in progress";
    else if (new Date() < new Date(start)) return 'upcoming';
    else if (new Date() > new Date(end)) return 'completed';
  }

  useEffect(() => {
    const url = "/api/courses";
    const params = {}
    try {
      (async () => {
        await getData(params, url).then((courses) => {
          let localCourses = []
          if (courses) {
            courses.map(course => {
              localCourses.push(course.course_name)
            })
          }
          setCourses(localCourses)
        });
      })();
    } catch (error) {
      console.log(error, "an error from getData in /api/courses");
    }
  }, [])
 


  const makeRowfromCohort = (cohort) => {
    return {
      id: cohort._id, 
      cohortName: cohort.cohort_name,
      courseName: (cohort.course.length > 0 && cohort.course[0])? cohort.course[0]["course_name"] : "",
      startDate: cohort.start_date? format(new Date(cohort.start_date), 'MMM dd, yyyy'): "",
      endDate:  cohort.end_date?  format(new Date(cohort.end_date), 'MMM dd, yyyy'): "",
      week: 'counting', // TODO: function that counts weeks accurately (winter holidays, summer breaks, delays etc)
      status: setStatus(cohort.start_date, cohort.end_date),
      students: cohort.students.length && cohort.seats ? `${cohort.students.length} / ${cohort.seats}`: "TBD", // TODO: make it more readeble
      mentors: cohort.mentors && cohort.mentors[0] && cohort.mentors[1]? `${cohort.mentors[0].length} / ${cohort.mentors[1].length}`: 'TBD', // TMP, FIX LOGIC!!!! Assignment reviewers / traditional mentors
    }
  }


  useEffect(() => {
    setLoading(true);
    const params = {}
    try {
      (async () => {
        await getData(params, url).then((cohorts) => {
          let localTableRows = []
          if (cohorts) {
            cohorts.map(async (cohort) => {
              const item = makeRowfromCohort(cohort)
              localTableRows.push(item)
            })
          }
          setTableRows(localTableRows);
          setLoading(false);
        });
      })();
    } catch (error) {
      console.log(error, "an error from getData in /api/cohorts");
    }
  }, [])

  return (
    <Container sx={{ textAlign: "center" }}>
      <Typography pb={4} sx={{ fontWeight: 100, fontSize: '3rem', }} >Cohort Management</Typography>

      <CohortsTable 
      // getRowId={(r) => r.id}
      loading={loading} 
      tableRows={tableRows} 
      courses={courses.sort()} // sort to het in in alphabetical order in the dropdown
      id={id}
      setId={setId}
        />
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
