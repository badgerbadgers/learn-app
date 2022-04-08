import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import LogIn from "../components/Login";
import {
  Typography,
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@mui/material";

let theme = createTheme();
theme = responsiveFontSizes(theme);

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();

  return (
    <>
      {/* {isLoading ? (
        <Image width={240} height={240} src="/img/loading.gif" alt="loading" />
      ) : ( */}
      <>
        <ThemeProvider theme={theme}>
          <Typography
            variant="h2"
            sx={{
              textAlign: "center",
              fontFamily: "Gotham Rounded B",
              fontSize: "42px",
            }}
          >
            Code the Dream Apprentice Landing Page
          </Typography>
        </ThemeProvider>
        <LogIn />
      </>
      {/* )} */}
    </>
  );
}

{
  /* <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        {session && (
          <>
            <li>
              <Link href={`/portfolios/${encodeURIComponent(session.user.gh)}`}>
                View Portfolio Page
              </Link>
            </li>
            <li>
              <Link href={`/userform/${encodeURIComponent(session.user.gh)}`}>
                Edit Portfolio Page
              </Link>
            </li>
          </>
        )}
      </ul> */
}
