import {
  Switch,
  Paper,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import "../styles/globals.css";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from "@mui/material";

function MyApp({ Component, pageProps }) {
  const [dark, setDark] = useState(false);

  const theme = createTheme({
    palette: {
      type: dark ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Paper style={{ height: '100vh' }}>
        <Switch checked={dark} onChange={() => setDark(!dark)} />
        <Typography variant="8">{dark ? "Dark Mode" : "Light Mode"}</Typography>
        <Component {...pageProps} />
      </Paper>
    </ThemeProvider>
  );
}

export default MyApp;
