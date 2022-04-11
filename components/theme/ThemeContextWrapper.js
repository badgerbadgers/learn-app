import React, { useState, useEffect, useContext, useMemo } from "react";
import { ThemeContext, themes } from "./themeContext";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

function ThemeContextWrapper(props) {
  const [mode, setMode] = useState("light");

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

  return (
    <ThemeContext.Provider value={changeTheme}>
      <ThemeProvider theme={themes}>
        <CssBaseline />
        {props.children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

//  const [theme, setTheme] = useState(themes.light);

//   const changeTheme = (theme) => {
//     setTheme(theme);
//   };

//   useEffect(() => {
//     switch (theme) {
//       case themes.light:
//       default:
//         document.body.classList.remove("white-content");
//         break;
//       case themes.dark:
//         document.body.classList.add("white-content");
//         break;

//     }
//   }, [theme]);

//   return (
//     <ThemeContext.Provider
//       value={
//         { theme: theme, changeTheme: changeTheme }
//       }
//     >

//       {props.children}

//     </ThemeContext.Provider>
//   );
// }

export default ThemeContextWrapper;

//.
