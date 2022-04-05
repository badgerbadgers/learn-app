<<<<<<< HEAD
import React, { memo } from "react";
=======
import React from "react";
>>>>>>> 1ca9456f5e7315b8b8f61cebed36efb7c119188b
import {
  Grid,
  Typography,
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@mui/material";

<<<<<<< HEAD
// Create a theme which will resize the title font size based on the screen width.

let theme = createTheme();
theme = responsiveFontSizes(theme);

//Create a Layout for the knowledge Pages. Add a max width of 1500px screen size

const KnowledgePageLayout = ({ title, index, body }) => {
  return (
    <div style={{ margin: "70px 30px 0px" }}>
      <Grid
        container
        p={0}
        m={0}
        sx={{ maxWidth: "1500px", margin: "auto" }}
        justify="center"
      >
        {/* div for Page Title */}
=======
let theme = createTheme();
theme = responsiveFontSizes(theme);

//Create a Layout for the knowledge Pages.
//researched - memo hook doesn't work here ...?
const KnowledgePageLayout = ({ title, index, body }) => {
  return (
    <div style={{ margin: "70px 30px 0px" }}>
      <Grid container p={0} m={0} sx={{ maxWidth: "1500px", margin: "auto" }}>
        {/* They can see a (div) with Page Title */}
>>>>>>> 1ca9456f5e7315b8b8f61cebed36efb7c119188b
        <Grid
          item
          xs={12}
          sx={{
            align: "center",
            boxShadow: "0 4px 2px -2px #f1f1f2",
          }}
        >
<<<<<<< HEAD
          {/* Applying the theme for the Title */}
=======
>>>>>>> 1ca9456f5e7315b8b8f61cebed36efb7c119188b
          <ThemeProvider theme={theme}>
            <Typography
              variant="h2"
              sx={{
                textAlign: "center",
              }}
            >
              {title}
            </Typography>
          </ThemeProvider>
        </Grid>
        {/* Content Body container (div) which has 2 sub divs 1.Index / Navigation with links 2.Display Body with top padding of 32px */}
        <Grid
          item
          container
<<<<<<< HEAD
          sx={{
            margin: 0,
            align: "center",
            textAlign: "center",
          }}
=======
          sx={{ margin: 0, align: "center", textAlign: "center" }}
>>>>>>> 1ca9456f5e7315b8b8f61cebed36efb7c119188b
        >
          <Grid
            item
            container
            xs={12}
            md={3}
            sx={{
              paddingTop: 4,
              justifyContent: "center",
            }}
          >
            {index}
          </Grid>
          <Grid item container xs={12} md={9} sx={{ paddingTop: 4 }}>
            {body}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default KnowledgePageLayout;
