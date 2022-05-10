import React, { useState } from "react";
import UserForm from "../components/UserForm";
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
console.log(userInfoData)
  return (
    <UserForm userInfoData={userInfoData} setUserInfoData={setUserInfoData} />
  );
};

export default SignUp;

//to custome a layout for sighup page used function
SignUp.getLayout = function getLayout(pages) {
  return (
    <>
      <PublicLayout>{pages}</PublicLayout>
      <Footer />
    </>
  );
};
