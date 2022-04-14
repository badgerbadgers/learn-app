import { createTheme, responsiveFontSizes } from "@mui/material/styles";
// Auto adjust the typography fontSize to match the media breakpoints. 
const baseTheme = responsiveFontSizes(createTheme({
    typography: {
        root: {
        fontFamily: ['Gotham Rounded A', 'Gotham Rounded B', 'sans-serif'].join(','),
        fontFamilySecondary: ["Montserrat", 'sans-serif'].join(','),
        },
        h3: {
            //title of any page. Header
            fontSize: '2rem',
            fontWeight: '700 !important',
            fontFamily: ['Gotham Rounded A', 'Gotham Rounded B', 'sans-serif'].join(','),
            },
        h5: {
            //subheaders on the page
            fontSize:  '1.6rem',
            fontFamily: ['Gotham Rounded A', 'Gotham Rounded B', 'sans-serif'].join(','),
            fontWeight: '500 !important',
            },
        h6: {
            // NavBar Elements
            fontSize: '0.9rem',
            fontWeight: '500 !important',
            textTransform: 'uppercase',
           fontFamily: ['Gotham Rounded A', 'Gotham Rounded B', 'sans-serif'].join(','),
            },
        body1: {
            fontFamily: ["Montserrat", 'sans-serif'].join(','),
            fontSize: '1.1rem',
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
            main: '#FF5C35',
            contrastText: "#fff",
        },
        secondary: {
            main: '#F3C300',
            contrastText: "#000",
        },
        text: {
            primary: "#fff"
          },
    },
})

const lightTheme = createTheme({
    ...baseTheme,
    palette: {
      mode: "light",

      primary: {
        main: '#FF5C35',
        contrastText: "#fff",
    },
    secondary: {
        main: '#12284C',
        contrastText: "#fff",
    },
},
})


export { darkTheme, lightTheme };