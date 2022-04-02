import { useState } from "react";
import ThemeContextWrapper from "../components/theme/ThemeContextWrapper";
import { ThemeContext, themes } from "../components/theme/themeContext";
import PrivateLayout from "../components/PrivateLayout";
import PublicLayout from "../components/PublicLayout";
import { Grid, Switch, Typography, Avatar } from "@mui/material";
import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <ThemeContextWrapper>
      <ThemeContext.Consumer>
        {({ changeTheme }) => (
          <Grid item display="flex" m={4}>
            <Avatar alt="Code the Deam" src="../img/ctd-logo.png">
              CD
            </Avatar>
            <Switch
              checked={darkMode}
              onClick={() => {
                setDarkMode(!darkMode);
                changeTheme(darkMode ? themes.light : themes.dark);
              }}
            />
            <Typography variant="8" alignSelf="center">
              {darkMode ? "Dark Mode" : "Light Mode"}
            </Typography>
          </Grid>
        )}
      </ThemeContext.Consumer>
      <SessionProvider session={session}>
        {props.Component.name === "Cards" ? (
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
