import { getSession, signIn } from "next-auth/react";
import { useSession} from "next-auth/react";
import { Stack, Button, Typography } from "@mui/material/";
import GitHubIcon from '@mui/icons-material/GitHub';


export default function LogIn () {
 const { data: session, status } = useSession();
 

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
          callbackUrl: `${window.location.origin}/userform/${session.user.gh}`,
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

export async function getServerSideProps(context) {


  return {
    props: {
      session: await getSession(context),
    },

  }
}