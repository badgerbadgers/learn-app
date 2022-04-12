import { useState } from "react";
import ThemeContextWrapper from "../components/theme/ThemeContextWrapper";
import PrivateLayout from "../components/PrivateLayout";
import PublicLayout from "../components/PublicLayout";
import { ThemeProvider} from "@mui/material";
import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import { theme } from "../components/theme/MuiThemeContext";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
    <ThemeProvider theme={theme}>
    <ThemeContextWrapper>
        {Component.name === "Portfolio" && "Home" ? (
          <PublicLayout>
            <Component {...pageProps} />
          </PublicLayout>
        ) : (
          <PrivateLayout>
            <Component {...pageProps} />
          </PrivateLayout>
        )}
      </ThemeContextWrapper>
      </ThemeProvider>
    </SessionProvider>
  );
}

export default MyApp;
