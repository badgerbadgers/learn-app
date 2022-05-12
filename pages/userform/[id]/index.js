import React, { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import getData from "../../../lib/getData";
import UserForm from "../../../components/UserForm";
import Image from "next/image";
import { privateLayout } from "../../../components/PrivateLayout";

export default function InputForm({user}) {

  console.log(user, 'user session - user form index')
  const [userInfoData, setUserInfoData] = useState({
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
    techStackArray: [],
    skillsArray:[],
    previousIndustryArray: [],
  });
  const [loading, setLoading] = useState(false);

  const url = "/api/users";
  const router = useRouter();
  const id = router.query.id;
 

  useEffect(()=>{
    setLoading(true);
  }, [])

  useEffect(() => {
    const params = { params: { id: id } };
    if (id) {
      try{      
            (async () => {
            await getData(params, url).then((data) => {
        
        // Add input default values and initialize the state values
              setUserInfoData({
                firstName: data.firstName,
                lastName: data.lastName,
                pronouns: data.pronouns,
                email: data.email,
                github: data.gh,
                linkedin: data.linkedin,
                twitter: data.twitter,
                videoUrl: data.videoUrl,
                techStackArray: data.techStackArray,
                skillsArray: data.skillsArray,
                previousIndustryArray: data.previousIndustryArray,
                techStackInput: "",
                skillInput: "",
                previousIndustryInput: "",
              });
                setLoading(false);         
              });
            })();
          }catch (error){
            console.log(error, "error from getData in /api/usersprofile");
        };
      }
  }, [id]);


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

InputForm.getLayout = privateLayout

export async function getServerSideProps(ctx) {
  // remove users api call from the component into here

  const session = await getSession(ctx);
  const { user } = session;
  //if no session exists - redirect to login 
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  return { //nothing happens if no session 
    props: { user },
  };
}

