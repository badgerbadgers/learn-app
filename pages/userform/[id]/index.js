import React, { useState } from "react";
import UsersForm from "./components/UsersForm";
import { Container, Paper, Typography } from "@mui/material";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import styles from "../../../styles/Portfolio.module.css";

function InputForm() {

  return (
    <Container>
      <Paper elevation={15}>
        <div className={styles.titleForm}>
          {<DriveFileRenameOutlineIcon fontSize="large" />}
          <Typography p={2} variant="h5">
            Input Form
          </Typography>
        </div>
        <UsersForm />
      </Paper>
    </Container>
  );
}

export default InputForm