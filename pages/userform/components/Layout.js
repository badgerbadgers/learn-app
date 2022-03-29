import React, { useState } from "react";
import UsersForm from "./UsersForm";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { Container, Paper, Typography } from "@mui/material";
import styles from "../../../styles/Portfolio.module.css";

function Layout() {
  const [newUser, setNewUser] = useState("");

  return (
    <Container>
      <Paper elevation={15}>
        <div className={styles.titleForm}>
          {<DriveFileRenameOutlineIcon fontSize="large" />}
          <Typography p={2} variant="h5">
            Input Form
          </Typography>
        </div>
        <UsersForm addUser={setNewUser} newUser={newUser} />
      </Paper>
    </Container>
  );
}

export default Layout;
