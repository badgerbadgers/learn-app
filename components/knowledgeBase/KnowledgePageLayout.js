import React, { memo } from "react";
import { Grid, Typography } from "@mui/material";

//Create a Layout for the knowledge Pages. Add a max width of 1500px screen size

const KnowledgePageLayout = memo(({ title, index, body }) => {
  return (
    <div style={{ margin: "70px 47px 0px 47px" }}>
      <Grid container p={0} m={0} sx={{ maxWidth: "1500px", margin: "auto" }}>
        {/* div for Page Title */}
        <Grid
          item
          role="title container"
          xs={12}
          sx={{
            align: "center",
            boxShadow: "0 4px 2px -2px #f1f1f2",
          }}
        >
          <Typography
            variant="h2"
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
            role="index container"
            xs={12}
            md={3}
            sx={{
              paddingTop: 4,
              justifyContent: "center",
            }}
          >
            {index}
          </Grid>
          <Grid
            item
            container
            role="body container"
            xs={12}
            md={9}
            sx={{ paddingTop: 4 }}
          >
            {body}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
});

export default KnowledgePageLayout;
