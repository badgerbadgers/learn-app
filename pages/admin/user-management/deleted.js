import { useState, useEffect, useRef } from "react";
import DeletedUsersTable from "./components/DeletedUsersTable";
import { Container, Typography } from "@mui/material";
import { privateLayout } from "../../../components/layout/PrivateLayout";
import { getSession } from "next-auth/react";
import getData from "../../../lib/getData";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import { format } from "date-fns";
import Link from "next/link";
import Box from "@mui/material/Box";
import { getUsers } from "pages/api/v1/users";

const DeletedUserManagement = ({ users }) => {
  const allUsers = useRef([]);
  const [loading, setLoading] = useState(true);
  const [tableRows, setTableRows] = useState([]);
  const [id, setId] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const requestSearch = (searchValue) => {
    setSearchInput(searchValue);

    const searchedRows = allUsers.current.filter((row) => {
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

  const makeRowfromUser = (user) => {
    return {
      id: user._id,
      name: user.name ? user.name : "",
      email: user.email ? user.email : "",
      gh: user.gh ? user.gh : "",
      record_created: user.deleted_at
        ? format(new Date(user.deleted_at), "MMM dd, yyyy")
        : "",
      is_admin: user.is_admin ? "✔️" : "",
    };
  };

  useEffect(() => {
    setLoading(true);
    let localRows = [];
    if (users) {
      users.map(async (user) => {
        const item = makeRowfromUser(user);
        localRows.push(item);
      });
    }
    allUsers.current = localRows;
    requestSearch(searchInput);
    setLoading(false);
  }, [searchInput, users]);

  return (
    <Container sx={{ textAlign: "center " }}>
      <Box sx={{ textAlign: "left" }}>
        <Link href="/admin/user-management">User Management</Link>
      </Box>
      <Typography pb={4} sx={{ fontWeight: 100, fontSize: "3rem" }}>
        Deleted Users
      </Typography>
      <Grid sx={{ textAlign: "right" }}>
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
      <DeletedUsersTable
        loading={loading}
        tableRows={tableRows}
        id={id}
        setId={setId}
      />
    </Container>
  );
};

export default DeletedUserManagement;

DeletedUserManagement.getLayout = privateLayout;

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
  
  const users = await getUsers({deleted: true});
  return {
    props: { user, users: JSON.parse(JSON.stringify(users)) },
  };
}
