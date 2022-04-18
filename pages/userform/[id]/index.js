import React, { useState, useEffect } from "react";
import {useSession, getSession} from 'next-auth/react';
import { useRouter } from "next/router";
import getData from "../../../lib/getData";
import UsersForm from "./components/UsersForm";
import { Container, Paper, Typography } from "@mui/material";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import styles from "../../../styles/Portfolio.module.css";

export default function InputForm() {

  const url = "/api/users";
  const router = useRouter();

  const id = router.query.id;

  const { data: session, status } = useSession();

  useEffect(() => {
    const params = { params: { id: id } };
    if (id) {     
      (async () => {
        await getData(params, url).then((data) => {
          setUser(data);
          setLoading(false);
        });
      })();
    }
  }, [id]);


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


export async function getServerSideProps(context) {
  return {
    props: {
      session: await getSession(context),
    },

  }
}