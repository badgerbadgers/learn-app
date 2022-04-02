import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useRouter } from "next/router";
import ContactCard from "../components/ContactCard";
import MediaCard from "../components/MediaCard";
import SkillsCard from "../components/SkillsCard";
import PreviousIndustryCard from "../components/PreviousIndustryCard";
import { Container } from "@mui/material";
import styles from '../../../styles/Portfolio.module.css'

function Cards() {
  const [user, setUser] = useState(null);

  // Consuming local JSON data using fetch API
  const router = useRouter();
  const id = router.query.id;

  const getUserData = async () => {
    let res = await axios.get("/api/users", {params: {id: id}});
    let data = await res.data;
    return data;
  };

  useEffect(() => {
    (async () => {
      const userFromFetch = await getUserData();
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
          {user && <SkillsCard skills={user.skillsArray} />}
        </div>
        <div className={styles.portfolioItem}>
          {user && (
            <PreviousIndustryCard previousIndustry={user.previousIndustryArray} />
          )}
        </div>
      </div>

    </Container>
  );
}

export default Cards;
