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
    } else {
      localStorage.setItem("preferred-theme", "light");
      setMode("light");
    }
   
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
      changeTheme: (prevMode) => {
        const newMode = prevMode === "light" ? "dark" : "light";
        setMode(newMode);
  
        window.localStorage.setItem("preferred-theme", newMode);
         
      },
     
      mode,
    }),
    [mode]
  );


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
