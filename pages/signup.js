import React, { useState } from "react";
import UserForm from "../components/UserForm";


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
    <UserForm userInfoData={userInfoData} setUserInfoData={setUserInfoData} />
  );
};

export default SignUp;
