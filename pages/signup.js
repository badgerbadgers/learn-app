import React, { useState } from "react";
import UserForm from "../components/userform/UserForm";
import { PublicLayout } from "../components/layout/PublicLayout";
import Footer from "../components/layout/Footer";
import { getSession } from "next-auth/react";

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
    bio: "",
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
export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    //if user not logged in - redirect to home page
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const { user } = session;

  if (user.hasProfile) {
    //if user has a profile - not allowed on signup page
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }
  return {
    props: { user },
  };
}
