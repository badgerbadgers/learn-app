import React, { useState, useEffect } from "react";
import UserForm from "../components/UserForm";
import Image from "next/image";
import PublicLayout, { publicLayout } from "../components/PublicLayout";
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {loading && (
        <Image width={240} height={240} src="/img/loading.gif" alt="loading" />
      )}
      {!loading && (
        <UserForm
          userInfoData={userInfoData}
          setUserInfoData={setUserInfoData}
        />
      )}
      <Footer />
    </>
  );
};

export default SignUp;

SignUp.getLayout = publicLayout
