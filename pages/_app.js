import { useState } from "react";
import ThemeContextWrapper from "../components/theme/ThemeContextWrapper";
import { ThemeContext, themes } from "../components/theme/themeContext";
import PrivateLayout from "../components/PrivateLayout";
import PublicLayout from "../components/PublicLayout";
import { Grid, Switch, Typography, Avatar, ThemeProvider} from "@mui/material";
import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";

function MyApp(props) {

  const {
    Component,
    pageProps: { session, ...pageProps },
  } = props;


  return (
    <ThemeContextWrapper> 
      <SessionProvider session={session}>
        {props.Component.name === "Portfolio" ? (
          <PublicLayout>
            <Component {...pageProps} />
          </PublicLayout>
        ) : (
          <PrivateLayout>
            <Component {...pageProps} />
          </PrivateLayout>
        )}
      </SessionProvider>   
   </ThemeContextWrapper>
  );
}

export default MyApp;

