import React from "react";
import {
  Grid,
  Typography,
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@mui/material";

// Create a theme which will resize the title font size based on the screen width.

//Create a Layout for the knowledge Pages. Add a max width of 1500px screen size

const KnowledgePageLayout = ({ title, index, body }) => {
  return (
    <div style={{ margin: "70px 30px 20px" }}>
      <Grid
        container
        p={0}
        m={0}
        sx={{ maxWidth: "1250px", margin: "auto" }}
        justify="center"
      >
        {/* div for Page Title */}
        <Grid
          item
          xs={12}
          sx={{
            align: "center",
            boxShadow: "0 4px 2px -2px #f1f1f2",
          }}
        >
          {/* Applying the theme for the Title */}
         
            <Typography
              variant="h3"
              sx={{
                textAlign: "center",
              }}
            >
              {title}
            </Typography>
       
        </Grid>
        {/* Content Body container (div) which has 2 sub divs 1.Index / Navigation with links 2.Display Body with top padding of 32px */}
        <Grid
          item
          container
          sx={{
            margin: 0,
            align: "center",
            textAlign: "center",
          }}
        >
          <Grid
            item
            container
            xs={12}
            md={3}
            sx={{
              paddingTop: 2,
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
