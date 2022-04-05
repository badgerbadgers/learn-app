import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ContactCard from "../components/ContactCard";
import MediaCard from "../components/MediaCard";
import SkillsCard from "../components/SkillsCard";
import PreviousIndustryCard from "../components/PreviousIndustryCard";
import { Container } from "@mui/material";
import styles from "../../../styles/Portfolio.module.css";

import getData from "../../../lib/getData";

function Cards() {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);


  const router = useRouter();
  const id = router.query.id;

  const url = "/api/users"
  const params = { params: { id: id } }

  useEffect(() => {
    (async () => {
      const userFromFetch = await getData(params, url);
      setUser(userFromFetch);
      setLoading(false);
    })();
  }, []);

  if (isLoading) return <p>Loading...</p>;

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
            <PreviousIndustryCard
              previousIndustry={user.previousIndustryArray}
            />
          )}
        </div>
      </div>
    </Container>
  );
}

export default Cards;
