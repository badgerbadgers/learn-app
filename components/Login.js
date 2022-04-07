import React, { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Stack, Button, Typography } from "@mui/material/";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  font: {
    font: "Gotham Rounded Bold A",
  },
  button: {
    backgroundColor: "#FF5C35",
    "&:hover": {
      backgroundColor: "#12284C",
    },
  },
});

export default function LogIn() {
  const { data: session, status } = useSession();
  const [loggedIn, setLoggedIn] = useState(false);

  const classes = useStyles();

  const handleLogin = () => {
    if (loggedIn === true) {
      console.log("***** SignOut***");
      signOut();
    } else {
      console.log("*******I am SingIn", loggedIn);
      signIn();
    }
  };

  console.log(loggedIn);

  const buttonData = [
    {
      title: loggedIn ? "Log-Out" : "Log-In",
      onClick: () => {
        handleLogin;
        setLoggedIn(!loggedIn);
      },
    },
    {
      title: "Sign-Up",
      onClick: () => {
        "";
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
            width: 300,
            height: 100,
            backgroundColor: "#FF5C35",
            "&:hover": {
              backgroundColor: "#12284C",
            },
          }}
        >
          <Typography font={classes.font}>{btn.title}</Typography>
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
