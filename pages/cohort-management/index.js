import React, { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { Container, Typography } from "@mui/material";
import { privateLayout } from "../../components/PrivateLayout";
import getData from "../../lib/getData";
import CohortsTable from "./components/CohortsTable";
import { format } from "date-fns";


const CohortManagement = () => { // do we need addtional check if user is Admin? 

  const urlCohorts = "/api/cohorts";
  const urlCourses = "/api/courses";
  const [loading, setLoading] = useState(true);
  const [tableRows, setTableRows] = useState([])

  const setStatus = (start, end) => {
    if (new Date(start) <= new Date() && new Date() <= new Date(end)) return "in progress";
    else if (new Date() < new Date(start)) return 'upcoming';
    else if (new Date() > new Date(end)) return 'completed';
  }

  const getCourses = async (courseIds) => {

    const coursesCache = {};
    console.info("courseIds=>", courseIds);
    const params = {params: JSON.stringify( [...courseIds] )};
    await getData(params, urlCourses).then((courses) => {
      courses.map(async course => coursesCache[course._id] = course.course_name)
    })
    return coursesCache
  }


  const makeRowfromDbCohort = (i, dbItem, courses) => {
    return {
      id: i, // Tmp solution for MUI data grid. We need to come up with a format for ID that works best for Mary Alice 
      cohortName: dbItem.cohort_name,
      courseName: db.dbItem.course_name,
      startDate: format(new Date(dbItem.start_date), 'MMM dd, yyyy'),
      endDate: format(new Date(dbItem.end_date), 'MMM dd, yyyy'),
      week: 'counting', // TODO: function that counts weeks accurately (winter holidays, summer breaks, delays etc)
      status: setStatus(dbItem.start_date, dbItem.end_date),
      students: `${dbItem.students.length} / ${dbItem.seats}`, //
      mentors: `${dbItem.mentors[0].length} / ${dbItem.mentors[1].length}`, // Assignment reviewers / traditional mentors
      archive: 'archive', // TODO: function that counts weeks accurately (winter holidays, summer breaks, delays etc)
    }

  }

  useEffect(() => {
    setLoading(true);
    const params = {}
    try {
      (async () => {
        await getData(params, urlCohorts).then((cohorts) => {
          // const courseIds = cohorts.map(cohort => cohort.course_id);
          // getCourses(new Set(courseIds)).then( (courses) => {
          let localTableRows = []
          if (cohorts) {
            cohorts.map(async (cohort, i) => {
              // const item = makeRowfromDbCohort(i, cohort)
              // localTableRows.push(item)
              console.log(cohort, i, 'cohort inside index')
            })
          }
          // setTableRows(localTableRows);
          setLoading(false);
          // });
        });
      })();
    } catch (error) {
      console.log(error, "error from getData in /api/usersprofile");
    }
  }, [])

  return (
    <Container sx={{ textAlign: "center" }}>
      <Typography pb={4} sx={{ fontWeight: 100, fontSize: '3rem', }} >Cohort Management</Typography>
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
