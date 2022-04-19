import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import getData from "../../../lib/getData";
import UsersForm from "./components/UsersForm";
import { Container, Paper, Typography } from "@mui/material";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import styles from "../../../styles/Portfolio.module.css";
import Image from "next/image";

export default function InputForm() {
  const [userInfoData, setUserInfoData] = useState({
        firstName: "",
        lastName: "",
        pronouns: "",
        email: "",
        github: "",
        linkedin: "",
        twitter: "",
        videoUrl: "",
        techStack: [],
        skills: [],
        previousIndustry: [],
      });
  const [loading, setLoading] = useState('true');

  const url = "/api/users";
  const router = useRouter();

  const id = router.query.id;

  useEffect(() => {
    const params = { params: { id: id } };
    if (id) {
      
      (async () => {
        await getData(params, url).then((data) => {
    // Add input default values and initialize the state values
          setUserInfoData({
            firstName: data.firstName,
            lastName: data.lastName,
            pronouns: data.pronouns,
            email: data.email,
            github: data.github,
            linkedin: data.linkedin,
            twitter: data.twitter,
            videoUrl: data.videoUrl,
            techStack: data.techStackArray,
            skills: data.skillsArray,
            previousIndustry: data.previousIndustryArray,
          });
          setLoading(false);
        });
      })();
    }
  }, [id]);


  return (
    <>
      {loading && (
        <Image width={240} height={240} src="/img/loading.gif" alt="loading" />
      )}
      {!loading && (
      <Container>
        <Paper elevation={15}>
          <div className={styles.titleForm}>
            {<DriveFileRenameOutlineIcon fontSize="large" />}
            <Typography p={2} variant="h5">
              Input Form
            </Typography>
          </div>
          <UsersForm userInfoData={userInfoData} setUserInfoData={setUserInfoData}/>
        </Paper>
      </Container>
      )}
    </>
)};

