import React, { useState, useEffect } from "react";
import MediaCard from "./components/MediaCard";
import ContactCard from "./components/ContactCard";
import SkillsCard from "./components/SkillsCard";
import PreviousIndustryCard from "./components/PreviousIndustryCard";
import { Container, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import styles from '../../../styles/Portfolio.module.css'
const useStyles = makeStyles((theme) => ({
  root:{
    // ['@media screen and (min-width: 1500px)']:{
    //     maxWidth: '675px'
    // },
    // ['@media screen and (min-width: 1200px) and (max-width: 1500px)']:{
    //     maxWidth: '580px'
    // },
    // ['@media screen and (min-width: 1000px) and (max-width: 1200px)']:{
    //     maxWidth: '480px'
    // },
  },
}))

function Cards() {
  const classes = useStyles();
  const [user, setUser] = useState(null);

  // Consuming local JSON data using fetch API
  const getData = async () => {
    let res = await fetch("/api/users");
    let data = await res.json();
    console.log(data);
    return data;
  };
  useEffect(() => {
    (async () => {
      const userFromFetch = await getData();
      setUser(userFromFetch);
    })();
  }, []);

  return (
    // The grids are necessary for responsiveness
    <Container className={classes.root}>
      <div className={styles.portfolioGrid}>
        <div className={styles.portfolioItem}>
          {user && <ContactCard user={user} />}
        </div>
        <div className={styles.portfolioItem}>
          {user && <MediaCard videoUrl={user.videoUrl} />}
        </div>

        <div className={styles.portfolioItem}>
          {user && <SkillsCard skills={user.skills} />}
        </div>
        <div className={styles.portfolioItem}>
          {user && (
            <PreviousIndustryCard previousIndustry={user.previousIndustry} />
          )}
        </div>
      </div>

    </Container>
  );
}

export default Cards;
