import React, { useEffect, useState } from "react";
import CohortsTable from "./components/CohortsTable";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { format } from "date-fns";
import getData from "../../../lib/getData";
import { getSession } from "next-auth/react";
import { privateLayout } from "../../../components/layout/PrivateLayout";

const CohortManagement = () => {
  const [loading, setLoading] = useState(true);
  const [tableRows, setTableRows] = useState([]);
  const [id, setId] = useState(0);
  const [courses, setCourses] = useState([]);

  const makeRowfromCohort = (cohort) => {
    return {
      id: cohort._id,
      cohortName: cohort.cohort_name,
      courseName:
        cohort.course.course_name.length > 0 ? cohort.course.course_name : "",
      courseId: cohort.course._id.length > 0 ? cohort.course._id : "",
      startDate: cohort.start_date
        ? format(new Date(cohort.start_date), "MMM dd, yyyy")
        : "",
      endDate: cohort.end_date
        ? format(
            new Date(cohort.end_date, cohort.schedule.length),
            "MMM dd, yyyy"
          )
        : "",
      students:
        cohort.students && cohort.students.length ? cohort.students.length : 0,
      seats: cohort.seats,
      mentors: cohort.mentors[0] ? `${cohort.mentors.length}` : "", // TMP, FIX LOGIC!!!! Assignment reviewers / traditional mentors
      slug: cohort.slug,
      scheduleLen: cohort.schedule.length,
    };
  };
  useEffect(() => {
    const url = "/api/courses";
    const params = {};
    try {
      (async () => {
        const response = await getData(params, url);
        let courses = JSON.parse(response.data);
        let localCourses = [];
        if (courses) {
          courses.map((course) => {
            localCourses.push({
              value: course._id,
              label: course.course_name,
            });
          });
        }
        setCourses(localCourses);
      })();
    } catch (error) {
      console.log("An error from getData in /api/courses:", error);
    }
  }, []);

  useEffect(() => {
    const url = "/api/cohorts";
    setLoading(true);
    const params = {};
    try {
      (async () => {
        let response = await getData(params, url);
        const cohorts = JSON.parse(response.data);
        let localRows = [];
        if (cohorts) {
          cohorts.map(async (cohort) => {
            const item = makeRowfromCohort(cohort);
            localRows.push(item);
          });
        }
        setTableRows(localRows);
        setLoading(false);
      })();
    } catch (error) {
      console.log("An error from getData in /api/cohorts:", error);
    }
  }, []);

  return (
    <Container sx={{ textAlign: "center" }}>
      <Typography pb={4} sx={{ fontWeight: 100, fontSize: "3rem" }}>
        Cohort Management
      </Typography>

      <CohortsTable
        loading={loading}
        tableRows={tableRows}
        courses={courses.sort()} // sort to get it in alphabetical order in the dropdown
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
        destination: "/",
        permanent: false,
      },
    };
  }
  const { user } = session;

  return {
    props: { user },
  };
}
