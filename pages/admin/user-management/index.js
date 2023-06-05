import { useState, useEffect, useRef } from "react";
import UsersTable from "./components/UsersTable";
import UsersFilter from "./components/UsersFilter";
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
import { getCourses } from "pages/api/v1/courses";
import { getCohorts } from "pages/api/v1/cohorts";
import { getUsers } from "pages/api/v1/users";
import Link from "next/link";
import Box from "@mui/material/Box";

const UserManagement = ({allCourses, allCohorts, users}) => {
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
    let localCohorts = [];
    if (allCohorts) {
      allCohorts.map((cohort) => {
        localCohorts.push({
          value: cohort._id,
          label: cohort.cohort_name,
        });
      });
    }
    setCohorts(localCohorts);
  }, [allCohorts]);


  useEffect(()=>{
    let localCourses = [];
    if (allCourses) {
          allCourses.map((course) => {
            localCourses.push({
              value: course._id,
              label: course.course_name,
            });
          });
        }
        setCourses(localCourses);
  }, [allCourses])

  const filterChangeHandler = (newFilters) => {
    setFilters({ ...newFilters });
  };

  useEffect(() => {
    setLoading(true);
    const params = { params: filters };
    let localRows = [];
    if (users) {
      users.map(async(student) => {
        const item = makeRowfromStudent(student);
        localRows.push(item);
      });
    }
    try {
      (async () => {
        const url = "/api/v1/users";
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
      console.log("An error from getData in /api/v1/users", error);
    }
  }, [filters, searchInput, users]);

  return (
    <Container sx={{ textAlign: "center " }}>
      <Box sx={{ textAlign: "right" }}>
        <Link href="/admin/user-management/deleted">Deleted Users</Link>
      </Box>
      <Typography pb={4} sx={{ fontWeight: 100, fontSize: "3rem" }}>
        User Management
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <UsersFilter
            cohorts={cohorts.sort()}
            courses={courses.sort()}
            roles={roles}
            changeHandler={filterChangeHandler}
          />
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
      <UsersTable
        loading={loading}
        tableRows={tableRows}
        id={id}
        setId={setId}
        cohorts={cohorts.sort()}
      />
    </Container>
  );
};

export default UserManagement;

UserManagement.getLayout = privateLayout;

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
  const courses = await getCourses();
  const cohorts = await getCohorts();
  const users = await getUsers();
  return {
    props: {
      user,
      allCourses: JSON.parse(JSON.stringify(courses)),
      allCohorts: JSON.parse(JSON.stringify(cohorts)),
      users: JSON.parse(JSON.stringify(users)),
    },
  };
}
