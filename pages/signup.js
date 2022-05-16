import React, { useState } from "react";
import UserForm from "../components/userform/UserForm";
import { PublicLayout } from "../components/PublicLayout";
import Footer from "../components/Footer";

const SignUp = () => {
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
    bio: ""
  });

  return (
    <UserForm userInfoData={userInfoData} setUserInfoData={setUserInfoData} />
  );
};

export default SignUp;

//to custom a layout for sighup page used function
SignUp.getLayout = function getLayout(pages) {
  return (
    <>
      <PublicLayout>{pages}</PublicLayout>
      <Footer />
    </>
  );
};

// getServerSideProps 
// limit the access of other routes until you fill out the profile
// call the DB to see if you have a profile doc (not create it & if you don't)
// if it doesn't exist - then you have to stay on this route until it does 