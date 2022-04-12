import { createContext } from "react";

export const ThemeContext = createContext({
  mode: "light",
  changeMode: () => {},
});

// export const themes = createTheme({
//   palette: {
//     light: "",
//     ...themeObj[mode],
//   },
//   overrides: {
//     MuiAppBar: {
//       backgroundColor: "transparent",
//       boxShadow: "0 2px 4px -1px #f1f1f2",
//     },
//   },
// });

// export const themes = createTheme({
//   components: {
//     MuiTypography: {
//       styleOverrides: {
//     navBar: {
//       fontFamily: "'Gotham Rounded A', 'Gotham Rounded B'",
//       fontSize: '1.5rem',
//       fontWeight: '400 !important',
//       textTransform: 'uppercase',
//     },
//     headers: {
//       fontFamily: "'Gotham Rounded A', 'Gotham Rounded B'",
//       fontSize: '4.2rem',
//       fontWeight: '900 !important',
//     },
//     subHeader: {
//       fontFamily: "'Gotham Rounded A', 'Gotham Rounded B'",
//       fontSize:  '3rem',
//       fontWeight: '500 !important',
//     },
//     body: {
//       fontFamily: "Montserrat",
//       fontSize: '1.8rem',
//       fontFamilySecondary: "'Gotham Rounded A'",
//     },
//   }}},
//   palette: {
//     primary: {
//       main: '#FF5C35',
//       main2: "#12284C"
//     },
//     secondary: {
//       main: "#f1f1f2",
//       main2: '#F3C300',
//     },
//   },
//   light: "",
//   dark: "white-content",

// })

// export const themes = createMuiTheme({
//   light: "",
//   dark: "white-content",

// });
