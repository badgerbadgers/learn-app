import { useState } from "react";
import ThemeContextWrapper from "../components/theme/ThemeContextWrapper";
import { ThemeContext, themes } from "../components/theme/themeContext";
import PrivateLayout from "../components/PrivateLayout";
import PublicLayout from "../components/PublicLayout";
import { Grid, Switch, Typography, Avatar } from "@mui/material";
import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import { useRouter } from "next/router";

function MyApp(props) {
  const {
    Component,
    pageProps: { session, ...pageProps },
  } = props;

  const router = useRouter();

  const [darkMode, setDarkMode] = useState(true);

  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
    <ThemeContextWrapper>
        {props.Component.name === ("Portfolio" && "Home") ? (
          <PublicLayout>
            <Component {...pageProps} />
          </PublicLayout>
        ) : (
          <PrivateLayout>
            <Component {...pageProps} />
          </PrivateLayout>
        )}
      </ThemeContextWrapper>
    </SessionProvider>
  );
}

export default MyApp;