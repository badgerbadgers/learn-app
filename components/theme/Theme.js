import { createTheme, responsiveFontSizes } from "@mui/material/styles";
// Auto adjust the typography fontSize to match the media breakpoints.
const baseTheme = responsiveFontSizes(
  createTheme({
    components: {
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            fontSize: "1em",
            backgroundColor: "black",
            color: "white",
          },
        },
      },
    },
    typography: {
      root: {
        fontFamily: "'gothamRoundedBold', 'gothamRoundedMedium'",
        fontFamilySecondary: "Montserrat",
      },
      h3: {
        //title of any page. Header
        fontSize: "3.2rem",
        fontWeight: "700 !important",
        fontFamily: "gothamRoundedBold",
      },
      h4: {
        //title of any page. Header
        fontSize: "2.2rem",
        fontFamily: "gothamRoundedBold",
      },

      h5: {
        //subheaders on the page
        fontSize: "1.6rem",
        fontFamily: "gothamRoundedMedium",
        fontWeight: "500 !important",
      },
      h6: {
        // Header Elements
        fontSize: "0.9rem",
        textTransform: "uppercase",
        fontFamily: "gothamRoundedMedium",
        overflowWrap: "break-word",
      },
      body1: {
        fontFamily: "Montserrat",
        fontSize: "1rem",
      },
      button: {
        fontFamily: "gothamRoundedMedium",
        fontSize: "1rem",
      },
    },
    components: {
      MuiLink: {
        styleOverrides: {
          root: {
            fontSize: "1rem",
            textTransform: "uppercase",
            fontFamily: "gothamRoundedMedium",
          },
        },
      },
    },
  })
);

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
    zone1: {
      main: '#FFEB99',
      contrastText: "#000",
    },
    zone2: {
      main: '#FFE270',
      contrastText: "#000",
    },
    zone3: {
      main: '#FFDA47',
      contrastText: "#000",
    },
    zone4: {
      main: '#FFD21F',
      contrastText: "#000",
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
    text: {
      primary: "#000",
    },
    zone1: {
      main: '#8D9DB9',
      contrastText: "#000",
    },
    zone2: {
      main: '#7488AA',
      contrastText: "#000",
    },
    zone3: {
      main: '#506891',
      contrastText: "#000",
    },
    zone4: {
      main: '#324A71',
      contrastText: "#000",
    },
  },
});

export { darkTheme, lightTheme };
