import React, { useState, useEffect } from "react";
import {useSession, getSession} from 'next-auth/react';
import { useRouter } from "next/router";
import Image from "next/image";
import ContactCard from "../components/ContactCard";
import MediaCard from "../components/MediaCard";
import SkillsCard from "../components/SkillsCard";
import PreviousIndustryCard from "../components/PreviousIndustryCard";
import { Button, Container } from "@mui/material";
import styles from "../../../styles/Portfolio.module.css";
import getData from "../../../lib/getData";

function Portfolio() {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);
  
  const url = "/api/users";
  const router = useRouter();

  const id = router.query.id;

  const { data: session, status } = useSession();

  useEffect(() => {
    const params = { params: { id: id } };
    if (id) {
      
      (async () => {
        await getData(params, url).then((data) => {
          setUser(data);
          setLoading(false);
        });
      })();
    }
  }, [id]);

  return (
    <>
      {isLoading && (
        <Image width={240} height={240} src="/img/loading.gif" alt="loading" />
      )}
      {!isLoading && (
        <>
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
          {status === "authenticated" && (
            <Container>
              <Button
                onClick={() => router.push("/dashboard")}
                sx={{ backgroundColor: "#F4F5F7", marginTop: "3rem" }}
              >
                Back to dashboard
              </Button>
            </Container>
          )}
        </>
      )}
      {!isLoading && !user && (
        <Container sx={{ textAlign: "center" }}>
          User with id <strong>{id}</strong> wasn&apos;t found
        </Container>
      )}
    </>
  );
}

export default Portfolio;

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getSession(context),
    },

  }
}


