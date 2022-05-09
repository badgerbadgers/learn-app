import { signIn } from "next-auth/react";
import { Stack, Button, Typography } from "@mui/material/";
import GitHubIcon from '@mui/icons-material/GitHub';


export default function LogIn () {

  const buttonData = [
    {
      title: "Log-In",
      onClick: () => {
        signIn("github", {
          callbackUrl: "/dashboard",
        });
      },
      icon: <GitHubIcon style={{fontSize:'28px'}}/>
    },
    {
      title: "Sign-Up",
      onClick: () => {
        signIn("github", {
          callbackUrl: "/dashboard",
        });
      },
      icon: <GitHubIcon style={{fontSize:'28px'}}/>
    },
  ];

  return (
    <Stack spacing={4} mt={6} alignItems="center">
      {buttonData.map((btn, i) => (
        <Button
          key={btn.title}
          size="medium"
          variant="contained"
          onClick={btn.onClick}
          sx={{
            width: '280px',
            margin: '0 auto',
            padding: "12px 48px",
            backgroundColor: "#12284C",
            "&:hover": {
              backgroundColor: "#FF5C35",
            },
          }}
          startIcon={btn.icon}
        >
          <Typography variant="h5">
            {btn.title}
          </Typography>
        </Button>
      ))}
    </Stack>
  );
}
