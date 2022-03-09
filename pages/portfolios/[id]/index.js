import React, { useState, useEffect } from "react";
import MediaCard from "./components/MediaCard";
import ContactCard from "./components/ContactCard";
import SkillsCard from "./components/SkillsCard";
import PreviousIndustryCard from "./components/PreviousIndustryCard";
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
    let data = await res.json();
    console.log(data)
    return data
  }
  useEffect(() => {
    ( async () => {
      const userFromFetch = await getData();
      setUser(userFromFetch);
    })()
  }, [])
  
  return (
    <Grid container p={2} sx={gridContainer} spacing={4}>
      <Grid item xs={12} md={12}>
        {user && <ContactCard user={user} />}
      </Grid>
      <Grid item xs={12} md={12}>
        {user && <MediaCard videoUrl={user.videoUrl} />}
      </Grid>
      <Grid item xs={12} md={12}>
        {user && <SkillsCard skills={user.skills} />}
      </Grid>
      <Grid item xs={12} md={12}>
        {user && <PreviousIndustryCard previousIndustry={user.previousIndustry} />}
      </Grid>
    </Grid>
  );
}

export default Cards;
