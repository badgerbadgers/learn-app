import React from "react";
import UsersForm from "./UsersForm";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { Paper, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: useTheme().spacing(6),
    padding: useTheme().spacing(2),
  },
}));

function Users() {
  const classes = useStyles();
  return (
    <>
      <Paper className={classes.pageContent} align="center" margin="dense">
        {<DriveFileRenameOutlineIcon fontSize="large" />}
        <Typography p={2} variant="h5" >
          Input Form
        </Typography>
        <UsersForm />
      </Paper>
    </>
  );
}

export default Users;
