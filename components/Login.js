import React, { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Stack, Button, Typography } from "@mui/material/";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  // font: {
  //   fontSize: "Gotham Rounded",
  // },
  button: {
    backgroundColor: "#FF5C35",
    "&:hover": {
      backgroundColor: "#12284C",
    },
  },
});

export default function LogIn() {
  const { data: session, status } = useSession();
  const [isloggedIn, setIsLoggedIn] = useState(false);

  const classes = useStyles();

  const handleLogin = () => {
    // if (status === "authenticated") {
    if (status === "authenticated") {
      setIsLoggedIn(false);
      console.log("***** SignOut***  loggedout");
      // console.log("Signed in as", session.user.name || session.user.gh);
      signOut();
    } else {
      console.log("*******I am waiting for SingIn loggedIn");
      console.log("Signed in as", session.user.name || session.user.gh);
      signIn();
      setIsLoggedIn(true);
    }

    // }
  };

  console.log(isloggedIn, "*****loggedIn status");

  const buttonData = [
    {
      title: isloggedIn ? "Log-Out" : "Log-In",
      onClick: () => {
        signIn();
      },
    },
    {
      title: "Sign-Up",
      onClick: () => {
        {
          `/userform/${encodeURIComponent(session.user.gh)}`;
        }
      },
    },
  ];

  return (
    <>
      <Stack spacing={8} mt={6}>
        {buttonData.map((btn, i) => (
          <Button
            key={i}
            size="large"
            variant="contained"
            onClick={btn.onClick}
            sx={{
              width: 300,
              height: 100,
              backgroundColor: "#FF5C35",
              "&:hover": {
                backgroundColor: "#12284C",
              },
            }}
          >
            <Typography>{btn.title}</Typography>
          </Button>
        ))}
      </Stack>
    </>
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
