import React, { useState, useEffect } from "react";
import MediaCards from "./components/MediaCards";
import ContactCards from "./components/ContactCards";
import SkillsCards from "./components/SkillsCards";
import PreviousIndustryCards from "./components/PreviousIndustryCards";
import { Grid } from "@mui/material";

// // Fixed number of columns
const gridContainer = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gridTemplateRows: "auto",
};

function Cards() {
  const [user, setUser] = useState(null)
  
  const getData = async () => {
    let res = await fetch('/api/users');
    console.log('RESPONSE', res)
    let data = await res.json();
    console.log('DATA', data)
    return data
  }
  useEffect(() => {
    ( async () => {
      const userFromFetch = await getData();
      console.log('Data', userFromFetch)
      setUser(userFromFetch);
    })()
  }, [])
  return (
    <Grid container p={2} sx={gridContainer} spacing={4}>
      <Grid item xs={12} md={12}>
       <ContactCards user={user} />
      </Grid>
      <Grid item xs={12} md={12}>
        <MediaCards user={user} />
      </Grid>
      <Grid item xs={12} md={12}>
        <SkillsCards user={user} />
      </Grid>
      <Grid item xs={12} md={12}>
        <PreviousIndustryCards user={user}/>
      </Grid>
    </Grid>
  );
}

export default Cards;
