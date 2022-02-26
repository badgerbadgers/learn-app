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
  const [user, setUser] = useState()
  const getData = async () => {
    let res = await fetch('/api/users');
    let data = await res.json();
    return data
    console.log(data)
  }
  useEffect(() => {
    const User = getData;
    setUser(User);
  }, [])
  return (
    <Grid container p={2} sx={gridContainer} spacing={4}>
      <Grid item xs={12} md={12}>
        <ContactCards user={user}/>
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
