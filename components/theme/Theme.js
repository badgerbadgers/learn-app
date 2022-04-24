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
      personal: '#FFEB99',
      tech: '#FF9D85',
      contrastText: "#000",
    },
    zone2: {
      personal: '#FFE270',
      tech: "#FF8D70",
      contrastText: "#000",
    },
    zone3: {
      personal: '#FFDA47',
      tech: "#FF7C5C",
      contrastText: "#000",
    },
    zone4: {
      personal: '#FFD21F',
      tech: "#FA6F4C",
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
      personal: '#8D9DB9',
      tech: '#FF9D85',
      contrastText: "#000",
    },
    zone2: {
      personal: '#7488AA',
      tech: "#FF8D70",
      contrastText: "#000",
    },
    zone3: {
      personal: '#506891',
      tech: "#FF7C5C",
      contrastText: "#000",
    },
    zone4: {
      personal: '#324A71',
      tech: "#FA6F4C",
      contrastText: "#000",
    },
  },
});

export { darkTheme, lightTheme };
