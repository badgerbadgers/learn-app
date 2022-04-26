import { signIn } from "next-auth/react";
import { Stack, Button, Typography } from "@mui/material/";
import GitHubIcon from '@mui/icons-material/GitHub';


export default function LogIn () {

  const buttonData = [
    {
      title: "Log-In",
      onClick: (e) => {
        // e.preventDefault();
        signIn("github", {
          callbackUrl: "/dashboard",
        });
      },
      icon: <GitHubIcon style={{fontSize:'32px'}}/>
    },
    {
      title: "Sign-Up",
      onClick: (e) => {
        // e.preventDefault();
        signIn("github", {
          callbackUrl: "/signup", 
        });
      },
      icon: <GitHubIcon style={{fontSize:'32px'}}/>
    },
  ];

  return (
    <Stack spacing={4} mt={6}>
      {buttonData.map((btn, i) => (
        <Button
          key={i}
          size="medium"
          variant="contained"
          onClick={btn.onClick}
          sx={{
            padding: "12px 64px",
            backgroundColor: "#12284C",
            "&:hover": {
              backgroundColor: "#FF5C35",
            },
          }}
          startIcon={btn.icon}
        >
          <Typography variant="h4">
            {btn.title}
          </Typography>
        </Button>
      ))}
    </Stack>
  );
}
