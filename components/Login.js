import { getSession, signIn } from "next-auth/react";
import { useSession} from "next-auth/react";
import { Stack, Button, Typography } from "@mui/material/";

export default function LogIn () {
 const { data: session, status } = useSession();

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
        signIn("github", {
          callbackUrl: `${window.location.origin}/userform/${session.user.gh}`,
        });
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

export async function getServerSideProps(context) {


  return {
    props: {
      session: await getSession(context),
    },

  }
}