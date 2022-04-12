import { useState } from "react";
import ThemeContextWrapper from "../components/theme/ThemeContextWrapper";
import PrivateLayout from "../components/PrivateLayout";
import PublicLayout from "../components/PublicLayout";
import { ThemeProvider} from "@mui/material";
import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import { theme } from "../components/theme/MuiThemeContext";

function MyApp(props) {

  const {
    Component,
    pageProps: { session, ...pageProps },
  } = props;

  return (
    <ThemeProvider theme={theme}>
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
   </ThemeProvider> 
  );
}

export default MyApp;

