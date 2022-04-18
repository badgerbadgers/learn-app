import { getSession, signIn } from "next-auth/react";
import { useSession} from "next-auth/react";
import { Stack, Button, Typography } from "@mui/material/";
import GitHubIcon from '@mui/icons-material/GitHub';
import { useTheme } from '@mui/styles';


export default function LogIn () {
 const { data: session, status } = useSession();
 const theme = useTheme();

  const buttonData = [
    {
      title: "Log-In",
      onClick: () => {
        signIn("github", {
          callbackUrl: "/dashboard",
        });
      },
      icon: <GitHubIcon style={{fontSize:'32px'}}/>
    },
    {
      title: "Sign-Up",
      onClick: () => {
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
          <Typography sx={{fontSize: "1.2rem" }}>
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