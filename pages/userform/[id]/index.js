import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import getData from "../../../lib/getData";
import UsersForm from "./components/UsersForm";
import { Container, Paper, Typography } from "@mui/material";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import styles from "../../../styles/Portfolio.module.css";
import Image from "next/image";
import clientPromise from "../../../lib/mongodb";

export default function InputForm() {
  const [userInfoData, setUserInfoData] = useState(null);
  const [loading, setLoading] = useState(false);

  const url = "/api/users";
  const router = useRouter();
  const id = router.query.id;

  useEffect(()=>{
    setLoading(true);
  }, [])

  useEffect(() => {
    const params = { params: { id: id } };
    if (id) {
      try{
        (async (req, res) => {
        // connect to database
        const client = await clientPromise;
        const database = client.db(process.env.MONGODB_DB);
     //find the document matching the query.id - github id
        if(database.collection("users").count_documents({ gh: id }, limit = 1) === 0) { 
          setUserInfoData({
            firstName: "",
            lastName: "",
            pronouns: "",
            email: "",
            github: "",
            linkedin: "",
            twitter: "",
            videoUrl: "",
            techStackInput: "",
            skillInput: "",
            previousIndustryInput: "",
            techStackArray: "",
            skillsArray: "",
            previousIndustryArray: "",
            });
            setLoading(false);     
          }
        }
      )}catch (error){
        console.log(error, "error from getUser in /api/users");
    }
      try{          
          (async () => {
          await getData(params, url).then((data) => {
  // Add input default values and initialize the state values
            setUserInfoData({
              firstName: data.firstName,
              lastName: data.lastName,
              pronouns: data.pronouns,
              email: data.email,
              github: data.gh,
              linkedin: data.linkedin,
              twitter: data.twitter,
              videoUrl: data.videoUrl,
              techStackArray: data.techStackArray,
              skillsArray: data.skillsArray,
              previousIndustryArray: data.previousIndustryArray,
              techStackInput: "",
              skillInput: "",
              previousIndustryInput: "",
            });
              setLoading(false);         
            });
          })();
        } 
     catch (error){
          console.log(error, "error from getData in /api/usersprofile");
      }
    }      
  }, [id]);

console.log('**Userinfo Data**', userInfoData, loading)
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

