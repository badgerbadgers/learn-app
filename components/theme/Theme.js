import { createTheme, responsiveFontSizes } from "@mui/material/styles";
// Auto adjust the typography fontSize to match the media breakpoints.
const baseTheme = responsiveFontSizes(
  createTheme({
    typography: {
      root: {
        fontFamily: "'gothamRoundedBold', 'gothamRoundedMedium'",
        fontFamilySecondary: "Montserrat",
        },
        h3: {
            //title of any page. Header
            fontSize: '3.2rem',
            fontWeight: '700 !important',
            fontFamily: 'gothamRoundedBold',
            },
            
        h5: {
            //subheaders on the page
            fontSize:  '1.6rem',
            fontFamily: 'gothamRoundedMedium',
            fontWeight: '500 !important',
            },
        h6: {
            // Header Elements
            fontSize: '0.9rem',
            textTransform: 'uppercase',
           fontFamily: 'gothamRoundedMedium',
           overflowWrap: 'break-word',
            },
        body1: {
            fontFamily: "Montserrat",
            fontSize: '1rem',
            },
        button: {
          fontFamily: "gothamRoundedMedium",
          fontSize: "1rem",
        },
    },
   
}));  

const darkTheme = createTheme({
  ...baseTheme,
  palette: {
    //contained buttons: Use the contrastText color as the text color and main color as the background color
    // text | outlined buttons: Use the main color (e.g. primary.main) as the text color.
    mode: "dark",
    primary: {
      main: "#FF5C35",
      contrastText: "#fff",
    },
    secondary: {
      main: "#F3C300",
      contrastText: "#000",
    },
    text: {
      primary: "#fff",
    },
  },
});

const lightTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: "light",

    primary: {
      main: "#FF5C35",
      contrastText: "#fff",
    },
    secondary: {
      main: "#12284C",
      contrastText: "#fff",
    },
  },
});

export { darkTheme, lightTheme };
