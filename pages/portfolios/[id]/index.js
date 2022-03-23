import React, { useState, useEffect } from "react";
import MediaCard from "./components/MediaCard";
import ContactCard from "./components/ContactCard";
import SkillsCard from "./components/SkillsCard";
import PreviousIndustryCard from "./components/PreviousIndustryCard";
import { Container, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root:{
    // ['@media screen and (min-width: 1500px)']:{
    //     maxWidth: '675px'
    // },
    // ['@media screen and (min-width: 1200px) and (max-width: 1500px)']:{
    //     maxWidth: '580px'
    // },
    ['@media screen and (min-width: 1000px) and (max-width: 1200px)']:{
        maxWidth: '480px'
    },
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
      {/* Spacing defines the padding left & top */}
      <Grid container spacing={2} mb={2}>
        <Grid item xs={12} sm={6}>
          {user && <ContactCard user={user} />}
        </Grid>
        <Grid item xs={12} sm={6}>
          {user && <MediaCard videoUrl={user.videoUrl} />}
        </Grid>
      </Grid>
      {/* Spacing defines the padding left & top */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          {user && <SkillsCard skills={user.skills} />}
        </Grid>
        <Grid item xs={12} sm={6}>
          {user && (
            <PreviousIndustryCard previousIndustry={user.previousIndustry} />
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default Cards;
