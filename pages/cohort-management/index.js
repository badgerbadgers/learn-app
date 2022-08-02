import React, { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import Button from '@mui/material/Button';
import { Container, Grid, Typography } from "@mui/material";
import { format } from "date-fns";
import { privateLayout } from "../../components/PrivateLayout";
import getData from "../../lib/getData";
import CohortsTable from "./components/CohortsTable";
import AddIcon from '@mui/icons-material/Add';

const CohortManagement = () => {

  const url = "/api/cohorts";
  const [loading, setLoading] = useState(true);
  const [tableRows, setTableRows] = useState([]);
  const [id, setId] = useState(1);
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



  const makeRowfromCohort = (i, cohort) => {
    setId(++id);
    return {
      id: id, // Tmp solution for MUI data grid. We need to come up with a format for ID that works best for Mary Alice 
      cohortName: cohort.cohort_name,
      courseName: cohort.course_name,
      startDate: format(new Date(cohort.start_date), 'MMM dd, yyyy'),
      endDate: format(new Date(cohort.end_date), 'MMM dd, yyyy'),
      week: 'counting', // TODO: function that counts weeks accurately (winter holidays, summer breaks, delays etc)
      status: setStatus(cohort.start_date, cohort.end_date),
      students: `${cohort.students.length} / ${cohort.seats}`, //
      mentors: `${cohort.mentors[0].length} / ${cohort.mentors[1].length}`, // Assignment reviewers / traditional mentors
      archive: 'archive', // TODO: do we actually need an archive btn?
    }
  }

  const createCohort = () => {
    setId(++id);
    console.log(id);
    return {
      id: id,
      cohortName: 'Cohort Name',
      courseName: 'Choose a course',
      startDate: format(new Date(), 'MMM dd, yyyy'),
      endDate: format(new Date(), 'MMM dd, yyyy'),
      week: '',
      status: `${id}`,
      students: '0/0',
      mentors: `0/0`,
      archive: 'archive',
    };
  };

  // const computeMutation = (newRow, oldRow) => {
  //   if (newRow.name !== oldRow.name) {
  //     return `Name from '${oldRow.name}' to '${newRow.name}'`;
  //   }
  //   if (newRow.age !== oldRow.age) {
  //     return `Age from '${oldRow.age || ''}' to '${newRow.age || ''}'`;
  //   }
  //   return null;
  // }

  const handleAddRow = () => {
    setTableRows((tableRows) => [...tableRows, createCohort()]);
  };

  useEffect(() => {
    setLoading(true);
    const params = {}
    try {
      (async () => {
        await getData(params, url).then((cohorts) => {
          let localTableRows = []
          if (cohorts) {
            cohorts.map(async (cohort, i) => {
              const item = makeRowfromCohort(i, cohort)
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
      <Grid container justifyContent="flex-end">
        <Button size="small" align="rigth" startIcon={<AddIcon />}  onClick={handleAddRow}>
          Add cohort
        </Button>
      </Grid>

      <CohortsTable 
      loading={loading} 
      tableRows={tableRows}
      courses={courses.sort()}
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
