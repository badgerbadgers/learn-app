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
// import getData from "../../../lib/getData";
import clientPromise from "../../../lib/mongodb";
import { publicLayout } from "../../../components/PublicLayout";

function Portfolio({user, session}) {
  const [isLoading, setLoading] = useState(false);
  console.log(user, 'user');

  console.log(session, 'session');
  

  // const { data: session, status } = useSession();

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
          {(user && 
            <Container>
              <Button
                onClick={() => router.push("/dashboard")}
                sx={{ backgroundColor: "background", marginTop: "3rem" }}
              >
                Back to dashboard
              </Button>
            </Container>
          )}
          <div className={styles.headerLogo}>
            <Image src='/img/labs_mc-01.png' alt="CTD Labs Logo" width={160} height={125} layout="responsive"/>
          </div>
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

Portfolio.displayName = "Portfolio"

export default Portfolio;

Portfolio.getLayout = publicLayout


// export async function getServerSideProps(ctx) {
//   // remove users api call from the component into here

//   const session = await getSession(ctx);
//   const { user } = session;
//   //if no session exists - redirect to login 
//   if (!session) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//       },
//     }
//   }
//   return { //nothing happens if no session 
//     props: { user },
//   };
// }



export async function getServerSideProps(context) {

  // get session
  const session = await getSession(context);

console.log(session, 'sessio')
  //redirect for protected content
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }


  // data base calls 
  const id = context.query.id
  const client = await clientPromise;
  const database = client.db(process.env.MONGODB_DB);
  let user;
  // find the document matching the query.id - github id
  try {
    let doc = await database
      .collection("usersprofile")
      .findOne({ gh: id });
    user = JSON.parse(JSON.stringify(doc))
    return {
      props: {
        user: user,
        session 
      },
    }
  } catch (error) {
    console.log(error, "error from getUser in /api/users");
    return {
      props: {
        error: 'Error in DB'
      },
    }
  }

}


