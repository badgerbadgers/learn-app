import React, { useState } from "react";
import UserForm from "../components/UserForm";
import { publicLayout } from "../components/PublicLayout";
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
  });

  return (
    <>
      <UserForm userInfoData={userInfoData} setUserInfoData={setUserInfoData} />
      <Footer />
    </>
  );
};

export default SignUp;

SignUp.getLayout = publicLayout;
