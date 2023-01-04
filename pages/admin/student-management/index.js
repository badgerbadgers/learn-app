import { useState, useEffect, useRef } from "react";
import StudentsTable from "./components/StudentsTable";
import StudentsFilter from "./components/StudentsFilter";
import { Container, Typography } from "@mui/material";
import { privateLayout } from "../../../components/layout/PrivateLayout";
import { getSession } from "next-auth/react";
import getData from "../../../lib/getData";
import { format } from "date-fns";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import makeStyles from "@mui/styles/makeStyles";
import { createTheme } from "@mui/material/styles";

const defaultTheme = createTheme();
const useStyles = makeStyles(
  (theme) => ({
    root: {
      padding: theme.spacing(0.5, 0.5, 0),
      justifyContent: "space-between",
      display: "flex",
      alignItems: "flex-start",
      flexWrap: "wrap",
    },
    textField: {
      [theme.breakpoints.down("xs")]: {
        width: "100%",
      },
      margin: theme.spacing(1, 0.5, 1.5),
      "& .MuiSvgIcon-root": {
        marginRight: theme.spacing(0.5),
      },
      "& .MuiInput-underline:before": {
        borderBottom: `1px solid ${theme.palette.divider}`,
      },
    },
  }),
  { defaultTheme }
);

const StudentManagemant = () => {
  const url = "/api/users";
  const allStudents = useRef([]);
  const [loading, setLoading] = useState(true);
  const [tableRows, setTableRows] = useState([]);
  const [id, setId] = useState([]);
  const [cohorts, setCohorts] = useState([]);
  const [courses, setCourses] = useState([]);
  const [roles, setRoles] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  //sreate setFilter with callback
  // const setFilter = (filters) => {
  //   //create a subset of all students using the filters (set Tablerows and update)
  //   const filteredRows = allStudents.current.filter((row) => {
  //     if (!!filters.cohort && row.cohortId !== filters.cohort) {
  //       return false;
  //     }

  //     if (!!filters.course && row.currentCourseId !== filters.course) {
  //       return false;
  //     }

  //     if (!!filters.role && !row.roleId.includes(filters.role)) {
  //       return false;
  //     }

  //     return true;
  //   });

  //   setTableRows(filteredRows);
  // };

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
      recordCreated: "counting",
      // cohort: student.cohort ? student.cohort.cohort_name : "",
      // cohortId: student.cohort ? student.cohort._id : "",
      // currentCourse: student.cohort ? student.cohort.course.course_name : "",
      // currentCourseId: student.cohort ? student.cohort.course._id : "",
      // role: student.userId ? student.userId.roleIds : "",
      // roleId: student.userId ? student.userId.roleIds : "",
      status: "counting",
      lastLogin: "counting",
    };
  };

  useEffect(() => {
    const url = "/api/cohorts";
    const params = {};
    try {
      (async () => {
        const response = await getData(params, url);
        let cohorts = JSON.parse(response.data);
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
    const url = "/api/roles";
    const params = {};
    try {
      (async () => {
        const response = await getData(params, url);
        let roles = JSON.parse(response.data);
        let localRoles = [];
        if (roles) {
          roles.map((role) => {
            localRoles.push({
              value: role._id,
              label: role.name,
            });
          });
        }
        setRoles(localRoles);
      })();
    } catch (error) {
      console.log("An error getData in /api/cohorts:", error);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = {};
    try {
      (async () => {
        let response = await getData(params, url);
        const students = JSON.parse(response.data);
        let localRows = [];
        if (students) {
          students.map(async (student) => {
            const item = makeRowfromStudent(student);
            localRows.push(item);
          });
        }
        allStudents.current = localRows;
        setTableRows(localRows);
        setLoading(false);
      })();
    } catch (error) {
      console.log("An error from getData in /api/students", error);
    }
  }, []);

  return (
    <Container sx={{ textAlign: "center " }}>
      <Typography pb={4} sx={{ fontWeight: 100, fontSize: "3rem" }}>
        Student Management
      </Typography>
      <Grid container spasing={2}>
        <Grid item xs={10}>
          {/* <StudentsFilter cohorts={cohorts.sort()} courses={courses.sort()} roles={roles.sort()} setFilter={setFilter} /> */}
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
  if (!user.hasProfile) {
    return {
      redirect: {
        destination: "/signup",
        permanent: false,
      },
    };
  }
  return {
    props: { user },
  };
}
