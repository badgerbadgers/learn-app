import React, { useState, useEffect } from "react";
import UserForm from "../components/UserForm";
import Image from "next/image";
import { getSession} from "next-auth/react";
import {clientPromise} from "../lib/mongodb";
import { useRouter } from "next/router";

const SignUp = ({session}) => {
 const [userInfoData, setUserInfoData] = useState({});
const [loading, setLoading] = useState(false);

const router = useRouter();
// const id = session.user.id;
console.log(session)
console.log('*****sessionID  ', session.user.id)

  useEffect(()=>{
    setLoading(true);
    if (id) {
       try 
       { 
        (async (req, res) => {
        //connect to database
        const database = await clientPromise.db(process.env.MONGODB_DB);
        
        // find the document matching the session.id - github id
        if( await database
        .collection("usersprofile")
        .count_documents({ gh: session.user.id }, limit = 1) !== 0) {
            setLoading(false);
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
            });
            setLoading(false);
        }
        })();
        }
        catch (error) {
              console.log(error, "error from getUser in /api/users");
        };
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
    )

};

export default SignUp;

export async function getServerSideProps(context) {
    return {
      props: {
        session: await getSession(context),
      },
  
    }
  };


  //https://techinplanet.com/modulenotfounderror-module-not-found-error-cant-resolve-dns-in-node_modules-mongodb-lib/

