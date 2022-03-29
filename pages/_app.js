import { useState } from "react";
import ThemeContextWrapper from "../components/theme/ThemeContextWrapper";
import { ThemeContext, themes } from "../components/theme/thmeContext";
import { Grid, Switch, Typography, Avatar } from "@mui/material";
import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <SessionProvider session={session}>
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
        <Component {...pageProps} />
      </ThemeContextWrapper>
    </SessionProvider>
  );
}

export default MyApp;
