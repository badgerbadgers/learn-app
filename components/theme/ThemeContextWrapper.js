import React, { useState, useEffect, useContext } from "react";
import { ThemeContext, themes } from "./themeContext";
//import {CssBaseline, ThemeProvider} from "@mui/material";


function ThemeContextWrapper(props) {
 const [theme, setTheme] = useState(themes.light);

  const changeTheme = (theme) => {
    setTheme(theme);
  };

  useEffect(() => {
    switch (theme) {
      case themes.light:
      default:
        document.body.classList.remove("white-content");
        break;
      case themes.dark:
        document.body.classList.add("white-content");
        break;
      
    }
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={
        { theme: theme, changeTheme: changeTheme }
      }
    >

  
      {props.children}
 
    </ThemeContext.Provider>
  );
}

export default ThemeContextWrapper;

//.