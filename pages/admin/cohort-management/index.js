import { useState, useEffect, useRef } from "react";
import CohortsTable from "./components/CohortsTable";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { format } from "date-fns";
import getData from "../../../lib/getData";
import { getSession } from "next-auth/react";
import { privateLayout } from "../../../components/layout/PrivateLayout";
import Grid from "@mui/material/Grid";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import TextField from "@mui/material/TextField";
import CohortsFilter from "./components/CohortsFilter";

const courseOptions = [
  { label: "All courses", value: "all courses" },
  { label: "Intro to programming", value: "intro to programming" },
  { label: "React", value: "react" },
  { label: "Rails", value: "rails" },
];

const statusOptions = [
  { label: "Any status", value: "any status" },
  { label: "Completed", value: "past" },
  { label: "In progress", value: "active" },
  { label: "Upcoming", value: "future" },
];
const CohortManagement = () => {
  const allCohorts = useRef([]);
  const [loading, setLoading] = useState(true);
  const [tableRows, setTableRows] = useState([]);
  const [id, setId] = useState(0);
  const [courses, setCourses] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredRows, setFilteredRows] = useState([]);
  const [courseOption, setCourseOption] = useState("all courses");
  const [statusOption, setStatusOption] = useState("any status");

  useEffect(() => {
    let filteredData = allCohorts.current;
    if (courseOption !== "all courses") {
      filteredData = filteredData.filter(
        (row) => row.courseName.toLowerCase() === courseOption
      );
    }
    if (statusOption !== "any status") {
      filteredData = filteredData.filter((row) => row.status === statusOption);
    }
    if (searchInput !== "") {
      filteredData = filteredData.filter((row) =>
        row.cohort_name.toLowerCase().includes(searchInput.toLowerCase())
      );
    }
    setFilteredRows(filteredData);
  }, [courseOption, statusOption, searchInput]);

  const handleCourseChange = (event) => {
    setCourseOption(event.target.value);
  };
  const handleStatusChange = (event) => {
    setStatusOption(event.target.value);
  };
  const handleSearchTextChange = (event) => {
    setSearchInput(event.target.value);
  };
  const clearSearch = () => {
    setSearchInput("");
  };
  const makeRowfromCohort = (cohort) => {
    return {
      id: cohort._id,
      cohort_name: cohort.cohort_name,
      courseName:
        cohort.course.course_name.length > 0 ? cohort.course.course_name : "",
      courseId: cohort.course._id.length > 0 ? cohort.course._id : "",
      start_date: cohort.start_date
        ? format(new Date(cohort.start_date), "MMM dd, yyyy")
        : "",
      endDate: cohort.end_date
        ? format(new Date(cohort.end_date), "MMM dd, yyyy")
        : "",
      status: cohort.status,
      students:
        cohort.students && cohort.students.length ? cohort.students.length : 0,
      seats: cohort.seats,
      mentors: Array.isArray(cohort.mentors) ? `${cohort.mentors.length}` : "", // TMP, FIX LOGIC!!!! Assignment reviewers / traditional mentors
      slug: cohort.slug,
      scheduleLen: cohort.schedule.length,
    };
  };

  useEffect(() => {
    const url = "/api/v1/courses";
    const params = {};
    try {
      (async () => {
        const response = await getData(params, url);
        let courses = response.data;
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
      console.log("An error from getData in /api/v1/courses:", error);
    }
  }, []);

  useEffect(() => {
    const url = "/api/v1/cohorts";
    setLoading(true);
    const params = {};
    try {
      (async () => {
        let response = await getData(params, url);
        const cohorts = response.data;
        let localRows = [];
        if (cohorts) {
          cohorts.map(async (cohort) => {
            const item = makeRowfromCohort(cohort);
            localRows.push(item);
          });
        }
        setTableRows(localRows);
        allCohorts.current = localRows;
        setLoading(false);
      })();
    } catch (error) {
      console.log("An error from getData in /api/v1/cohorts:", error);
    }
  }, []);

  return (
    <Container sx={{ textAlign: "center" }}>
      <Typography pb={4} sx={{ fontWeight: 100, fontSize: "3rem" }}>
        Cohort Management
      </Typography>
      <Grid container>
        <CohortsFilter
          courseOption={courseOption}
          courseOptions={courseOptions}
          statusOption={statusOption}
          statusOptions={statusOptions}
          handleCourseChange={handleCourseChange}
          handleStatusChange={handleStatusChange}
        />
        <Grid item xs={2}>
          <TextField
            id="outlined-search"
            variant="outlined"
            label="Search by cohort"
            value={searchInput}
            onChange={handleSearchTextChange}
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
        filteredRows={filteredRows}
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
