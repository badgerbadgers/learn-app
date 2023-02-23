import { useState, useEffect, useRef } from "react";
import StudentsTable from "./components/StudentsTable";
import StudentsFilter from "./components/StudentsFilter";
import { Container, Typography } from "@mui/material";
import { privateLayout } from "../../../components/layout/PrivateLayout";
import { getSession } from "next-auth/react";
import getData from "../../../lib/getData";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import { formatDistance } from "date-fns";

const StudentManagemant = () => {
  const url = "/api/users";
  const allStudents = useRef([]);
  const [loading, setLoading] = useState(true);
  const [tableRows, setTableRows] = useState([]);
  const [id, setId] = useState([]);
  const [cohorts, setCohorts] = useState([]);
  const [courses, setCourses] = useState([]);
  const [roles, setRoles] = useState([
    { value: "mentors", label: "Mentor" },
    { value: "students", label: "Student" },
  ]);
  const [searchInput, setSearchInput] = useState("");
  const [filters, setFilters] = useState({});

  const requestSearch = (searchValue) => {
    setSearchInput(searchValue);

    const searchedRows = allStudents.current.filter((row) => {
      if (!searchValue) {
        return true;
      }
      if (row.name.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }
      if (row.gh.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }
      if (row.email.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }
      return false;
    });

    setTableRows(searchedRows);
  };

  const clearSearch = () => {
    requestSearch("");
  };

  const makeRowfromStudent = (student) => {
    return {
      id: student._id,
      name: student.name ? student.name : "",
      email: student.email ? student.email : "",
      gh: student.gh ? student.gh : "",
      record_created: "counting",
      status: "counting",
      last_seen: student.last_seen ? formatDistance(new Date(student.last_seen), new Date(), { addSuffix: true }) : "",
    };
  };

  useEffect(() => {
    const url = "/api/cohorts";
    const params = {};
    try {
      (async () => {
        const response = await getData(params, url);
        let cohorts = response.data;
        let localCohorts = [];
        if (cohorts) {
          cohorts.map((cohort) => {
            localCohorts.push({
              value: cohort._id,
              label: cohort.cohort_name,
            });
          });
        }
        setCohorts(localCohorts);
      })();
    } catch (error) {
      console.log("An error getData in /api/cohorts:", error);
    }
  }, []);

  useEffect(() => {
    const url = "/api/courses";
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
      console.log("An error from getData in /api/courses:", error);
    }
  }, []);

  const filterChangeHandler = (newFilters) => {
    setFilters({ ...newFilters });
  };

  useEffect(() => {
    setLoading(true);
    const params = { params: filters };
    try {
      (async () => {
        let response = await getData(params, url);
        const students = response.data;
        let localRows = [];
        if (students) {
          students.map(async (student) => {
            const item = makeRowfromStudent(student);
            localRows.push(item);
          });
        }
        allStudents.current = localRows;
        requestSearch(searchInput);
        setLoading(false);
      })();
    } catch (error) {
      console.log("An error from getData in /api/students", error);
    }
  }, [filters]);

  return (
    <Container sx={{ textAlign: "center " }}>
      <Typography pb={4} sx={{ fontWeight: 100, fontSize: "3rem" }}>
        Student Management
      </Typography>
      <Grid container spasing={2}>
        <Grid item xs={10}>
          <StudentsFilter cohorts={cohorts.sort()} courses={courses.sort()} roles={roles} changeHandler={filterChangeHandler} />
        </Grid>
        <Grid item xs={2}>
          <TextField
            id="input-with-icon-textfield"
            variant="outlined"
            value={searchInput}
            onChange={(e) => requestSearch(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon fontSize="small" />,
              endAdornment: (
                <IconButton title="Clear" aria-label="Clear" size="small" onClick={clearSearch} style={{ visibility: searchInput ? "visible" : "hidden" }}>
                  <ClearIcon fontSize="small" />
                </IconButton>
              ),
            }}
          />
        </Grid>
      </Grid>
      <StudentsTable loading={loading} tableRows={tableRows} id={id} setId={setId} />
    </Container>
  );
};

export default StudentManagemant;

StudentManagemant.getLayout = privateLayout;

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
