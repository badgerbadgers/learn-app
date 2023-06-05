import { createTheme } from "@mui/material/styles";

const theme = createTheme();
const baseTheme = createTheme({
  typography: {
    h1: {
      fontSize: "3rem",
      fontWeight: 700,
      [theme.breakpoints.down("md")]: {
        fontSize: "2.5rem",
      },
      [theme.breakpoints.up("lg")]: {
        fontSize: "3rem", //48px
      },
    },
    h2: {
      fontSize: "2.25rem",
      fontWeight: 700,
      [theme.breakpoints.down("sm")]: {
        fontSize: "1.625rem", //26px
      },
      [theme.breakpoints.up("md")]: {
        fontSize: "2rem", //32px
      },
      [theme.breakpoints.up("lg")]: {
        fontSize: "2.25rem", //36px
      },
    },
    h3: {
      fontSize: "2rem",
      fontWeight: 700,
      [theme.breakpoints.down("sm")]: {
        fontSize: "1.5rem", //24px
      },
      [theme.breakpoints.up("md")]: {
        fontSize: "1.75rem", //28px
      },
      [theme.breakpoints.up("lg")]: {
        fontSize: "2rem", //32px
      },
    },
    h4: {
      fontSize: "1.125rem",
      fontWeight: 500,
    },
    [theme.breakpoints.up("xs")]: {
      fontSize: "1.125rem", //18px
    },
  },
  p: {
    fontSize: "1rem",
    fontWeight: 400,
  },
  button: {
    fontSize: "1rem",
  },
  caption: {
    fontSize: ".85rem",
    fontWeight: 400,
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          fontSize: "1rem",
          textTransform: "uppercase",
          fontFamily: "Roboto",
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: "1em",
          backgroundColor: "black",
          color: "#FFF",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        label: {
          fontFamily: "Roboto",
          fontSize: "1rem",
        },
      },
    },
  },
});

const darkTheme = createTheme({
  ...baseTheme,
  palette: {
    //contained buttons: Use the contrastText color as the text color and main color as the background color
    // text | outlined buttons: Use the main color (e.g. primary.main) as the text color.
    mode: "dark",
    primary: {
      main: "#FF5C35", //original orange from ctd pallete
      yellowCard: "#F3C300", //original yellow from ctd pallete
      greenCard: "#8BC34A", // light green
      contrastText: "#EBEBEB",
    },
    secondary: {
      main: "#F3C300", //original yellow from ctd pallete
      light: "#8BC34A", // light green
      contrastText: "#000",
    },
    zone1: {
      personal: "#FFEB99", // 2 shades lighter yellow than zone2
      tech: "#FF9D85",
      contrastText: "#000",
    },
    zone2: {
      personal: "#FFE270", //2 shades lighter blue than zone3
      tech: "#FF8D70",
      contrastText: "#000",
    },
    zone3: {
      personal: "#FFDA47", //2 shades lighter blue than zone4
      tech: "#FF7C5C",
      contrastText: "#000",
    },
    zone4: {
      personal: "#FFD21F", //2 shades lighter yellow than original
      tech: "#FA6F4C",
      contrastText: "#000",
    },

    text: {
      primary: "#EBEBEB",
    },
    background: {
      default: "#0B0C0C", //black
      paper: "#181919", //darkgray
      card: "#353638", //asphalt
      ctdcard: "#515152", //onyx gray
      button: "#FF5C35", //orange
      chip: "#FF6C47",
      contactIcon: "#F3C300",
      skillsChip: "#F3C300",
    },
    schedule: {
      text: "#FFF",
      background: "#444646",
    },
    syllabus: {
      card: "#353638",
      primary: "#FFF",
    },

    submission: {
      main: "#5da364",
    },
  },
});

const lightTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: "light",

    primary: {
      main: "#FF5C35", //original orange from CTD
      yellowCard: "#F3C300", //original yellow from ctd pallete
      contrastText: "#FFF", //white
      greenCard: "#8BC34A", // light green
    },
    secondary: {
      main: "#12284C", //original blue from CTD
      light: "#F3C300", //original yellow from ctd pallete
      contrastText: "#FFF",
    },
    text: {
      primary: "#31393C", //black
    },
    background: {
      default: "#FFF",
      dbpaper: "#F4F5F7",
      card: "#DFE2E8",
      ctdcard: "#FFF",
      button: "#FF5C35",
      chip: "#FF5C35",
      contactIcon: "#12284C",
      skillsChip: "#12284C",
    },
    zone1: {
      personal: "#8D9DB9", // 2 shades lighter blue than zone2
      tech: "#FF9D85", // 2 shades lighter orange than zone2
      contrastText: "#000", //black
    },
    zone2: {
      personal: "#7488AA", // 2 shades lighter blue than zone3
      tech: "#FF8D70", // 2 shades lighter orange than zone3
      contrastText: "#000",
    },
    zone3: {
      personal: "#506891", //2 shades lighter blue than zone4
      tech: "#FF7C5C", //2 shades lighter orange than zone4
      contrastText: "#000",
    },
    zone4: {
      personal: "#324A71", //2 shades lighter blue than original
      tech: "#FA6F4C", //2 shades lighter orange than original
      contrastText: "#000",
    },
    schedule: {
      text: "#181919", //2 shades lighter blue than zone4
      background: "#f5f5f5",
    },
    syllabus: {
      primary: "#000000",
      card: "#F4F5F7", //light gray
    },
    submission: {
      main: "#6BDF77",
    },
  },
});

export { darkTheme, lightTheme };
