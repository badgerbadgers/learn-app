import React, { useState } from "react";
import UsersForm from "./UsersForm";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { Paper, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: useTheme().spacing(6),
    padding: useTheme().spacing(1),
  },
}));

function Layout() {
  const classes = useStyles();
  const [newUser, setNewUser] = useState('');

  return (
    <>
      <Paper className={classes.pageContent} align="center" elevation={15}>
        {<DriveFileRenameOutlineIcon fontSize="large" />}
        <Typography p={2} variant="h5">
          Input Form
        </Typography>
        <UsersForm addUser={setNewUser} newUser={newUser}/>
      </Paper>
    </>
  );
}

export default Layout;
