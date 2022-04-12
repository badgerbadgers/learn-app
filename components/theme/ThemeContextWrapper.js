import React, { useState, useEffect, useContext, useMemo } from "react";
import { ThemeContext, themes } from "./themeContext";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";


function ThemeContextWrapper(props) {
  const [mode, setMode] = useState("light");



  useEffect(() => {
    const localStorage = window.localStorage;
    const theme = localStorage.getItem("preferred-theme");
    if (theme) {
      if (theme === "dark") {
        setMode("dark");
      } else {
        setMode("light");
      }
    }
    // } else {
    //   localStorage.setItem("preferred-theme", "light");
    //   setMode("light");
    // }
    console.log(localStorage.getItem("preferred-theme"));
  }, []);

  const themes = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  const changeTheme = useMemo(
    () => ({
      // The dark mode switch would invoke this method
      changeTheme: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
     
      mode,
    }),
    [mode]
  );
  // mode === 'dark'
  //       ? window.localStorage.setItem("preferred-theme", "dark")
  //       : window.localStorage.setItem("preferred-theme", "light")

  return (
    <ThemeContext.Provider value={changeTheme}>
      <ThemeProvider theme={themes}>
        <CssBaseline />
        {props.children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default ThemeContextWrapper;

//.
