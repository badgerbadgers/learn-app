import React, { useState, useEffect } from "react";
import UserForm from "../components/UserForm";
import Image from "next/image";
import { useSession, getSession} from "next-auth/react";
import clientPromise from "../lib/mongodb";
import { useRouter } from "next/router";

export const SignUp = () => {
 const [userInfoData, setUserInfoData] = useState({});
const [loading, setLoading] = useState(false);
const { data: session} = useSession();
const router = useRouter();
const id = session.id;

console.log(session.id)

  useEffect(()=>{
    setLoading(true);
    if (id) {
       try { async (req, res) => {
            // connect to database
            const client = await clientPromise;
            const database = client.db(process.env.MONGODB_DB);
          
            // find the document matching the session.id - github id
            
            if( database
            .collection("usersprofile")
            .find({ gh: id }).limit(1) != 0) {
                router.push('/dashboard');
            } else {
                setUserInfoData({
                    firstName: "",
                    lastName: "",
                    pronouns: "",
                    email: "",
                    github: "",
                    linkedin: "",
                    twitter: "",
                    videoUrl: "",
                    techStackInput: "",
                    skillInput: "",
                    previousIndustryInput: "",
                    techStackArray: "",
                    skillsArray: "",
                    previousIndustryArray: "",
                });
                // setLoading(false);
            }
            }
        } catch (error) {
              console.log(error, "error from getUser in /api/users");
        }
            setLoading(false);
    };
  }, []);

return (
    <>
      {loading && (
        <Image width={240} height={240} src="/img/loading.gif" alt="loading" />
      )}
      {!loading && (
            <UserForm userInfoData={userInfoData} setUserInfoData={setUserInfoData}/>  
      )}
      </>
  )};

export async function getServerSideProps(context) {
    return {
      props: {
        session: await getSession(context),
      },
  
    }
  }