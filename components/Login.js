import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";
import { Stack, Button, Typography } from "@mui/material/";

export default function LogIn() {
  const { data: session, status } = useSession();

  const router = useRouter();

  const buttonData = [
    {
      title: "Log-In",
      onClick: () => {
        signIn("github", {
          callbackUrl: "/dashboard",
        });
      },
    },
    {
      title: "Sign-Up",
      onClick: () => {
        router.push(`/userform/${encodeURIComponent(session.user.gh)}`);
      },
    },
  ];

  return (
    <Stack spacing={8} mt={6}>
      {buttonData.map((btn, i) => (
        <Button
          key={i}
          size="large"
          variant="contained"
          onClick={btn.onClick}
          sx={{
            padding: "36px 54px",
            backgroundColor: "#FF5C35",
            "&:hover": {
              backgroundColor: "#12284C",
            },
          }}
        >
          <Typography sx={{ fontFamily: "Gotham Rounded B", fontSize: "2rem" }}>
            {btn.title}
          </Typography>
        </Button>
      ))}
    </Stack>
  );
}

// if(status === "authenticated") (
//return (
//       <>
//         Signed in as {session.user.name || session.user.gh} <br />
//         <button onClick={()=>signOut()}>Sign out</button>
//       </>
//     );
//   }
//   return (
//     <>
//       Not signed in <br />
//       <button onClick={()=>signIn()}>Sign in</button>
//     </>
//   );
// }

// if (status === "authenticated") {
// if (status === "authenticated") {
//   setIsLoggedIn(false);
//   console.log("***** SignOut***  loggedout");
//   console.log("Signed in as", session.user.name || session.user.gh);
//   signOut();
// } else {
//   const handleLogin = () => {
//     console.log("*******I am waiting for SingIn loggedIn");
//     //console.log("Signed in as", session.user.name || session.user.gh) { callbackUrl: "http://www.google.com" };

//   };
// }
