import React, { useState, useEffect } from "react";
import MediaCard from "./components/MediaCard";
import ContactCard from "./components/ContactCard";
import SkillsCard from "./components/SkillsCard";
import PreviousIndustryCard from "./components/PreviousIndustryCard";
import { Container } from "@mui/material";
import styles from '../../../styles/Portfolio.module.css'

function Cards() {
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
    <Container>
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
