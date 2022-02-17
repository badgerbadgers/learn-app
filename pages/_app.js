import { useState } from "react";
import ThemeContextWrapper from "./api/theme/ThemeContextWrapper";
import { ThemeContext, themes } from "./api/theme/thmeContext";
import { Switch, Typography } from "@mui/material";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [darkMode, setDarkMode] = useState(true);
  
  return (
    <ThemeContextWrapper>
      <ThemeContext.Consumer>
        {({ changeTheme }) => (
          <>
            <Switch
              checked={darkMode}
              onClick={() => {
                setDarkMode(!darkMode);
                changeTheme(darkMode ? themes.light : themes.dark);
              }}
            />
            <Typography variant="8">
              {darkMode ? "Dark Mode" : "Light Mode"}
            </Typography>
          </>
        )}
      </ThemeContext.Consumer>
      <Component {...pageProps} />
    </ThemeContextWrapper>
  );
}

export default MyApp;
