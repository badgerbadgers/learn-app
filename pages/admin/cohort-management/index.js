import { useState, useEffect, useRef } from "react";
import CohortsTable from "./components/CohortsTable";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { format } from "date-fns";
import getData from "../../../lib/getData";
import { getSession } from "next-auth/react";
import { privateLayout } from "../../../components/layout/PrivateLayout";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";

const CohortManagement = () => {
  const url = "/api/cohorts";
  const allCohorts = useRef([]);
  const [loading, setLoading] = useState(true);
  const [tableRows, setTableRows] = useState([]);
  const [id, setId] = useState(0);
  const [courses, setCourses] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const requestSearch = (searchValue) => {
    setSearchInput(searchValue);

    const searchedRows = allCohorts.current.filter((row) => {
      if (!searchValue) {
        return true;
      }
      if (row.cohortName.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }
      if (row.courseName.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }
      if (row.courseId.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }
      return false;
    });

    setTableRows(searchedRows);
  };

  const clearSearch = () => {
    requestSearch("");
  };

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
      mentors:
        cohort.mentors && cohort.mentors[0] && cohort.mentors[1]
          ? `${cohort.mentors[0].length} / ${cohort.mentors[1].length}`
          : "", // TMP, FIX LOGIC!!!! Assignment reviewers / traditional mentors
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
        allCohorts.current = localRows;
        requestSearch(searchInput);
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
      <Grid container spacing={2}>
        <Grid item xs={10}></Grid>
        <Grid item xs={2}>
          <TextField
            id="input-with-icon-textfield"
            variant="outlined"
            value={searchInput}
            onChange={(e) => requestSearch(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon fontSize="small" />,
              endAdornment: (
                <IconButton
                  title="Clear"
                  aria-label="Clear"
                  size="small"
                  onClick={clearSearch}
                  style={{ visibility: searchInput ? "visible" : "hidden" }}
                >
                  <ClearIcon fontSize="small" />
                </IconButton>
              ),
            }}
          />
        </Grid>
      </Grid>
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
