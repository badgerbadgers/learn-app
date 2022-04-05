import React from "react";
import {
  Grid,
  Typography,
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@mui/material";

let theme = createTheme();
theme = responsiveFontSizes(theme);

//Create a Layout for the knowledge Pages.
//researched - memo hook doesn't work here ...?
const KnowledgePageLayout = ({ title, index, body }) => {
  return (
    <div style={{ margin: "70px 30px 0px" }}>
      <Grid container p={0} m={0} sx={{ maxWidth: "1500px", margin: "auto" }}>
        {/* They can see a (div) with Page Title */}
        <Grid
          item
          xs={12}
          sx={{
            align: "center",
            boxShadow: "0 4px 2px -2px #f1f1f2",
          }}
        >
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
        {/* Content Body container (div) which has 2 sub grids 1.Index / Navigation with links 2.Display Body */}
        <Grid
          item
          container
          sx={{ margin: 0, align: "center", textAlign: "center" }}
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
