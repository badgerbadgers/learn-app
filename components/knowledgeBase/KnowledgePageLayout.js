import React, { memo } from "react";
import { Grid, Typography } from "@mui/material";

//Create a Layout for the knowledge Pages.
//researched - memo hook doesn't work here ...?
const KnowledgePageLayout = memo(({ title, index, body }) => {
  return (
    <div style={{ margin: "70px 47px 0px 47px" }}>
      <Grid container p={0} m={0}>
        {/* They can see a (div) with Page Title */}
        <Grid
          item
          xs={12}
          sx={{
            align: "center",
            boxShadow: "0 2px 2px -2px #f1f1f2",
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
        {/* Content Body container (div) which has 2 sub grids 1.Index / Navigation with links 2.Display Body */}
        <Grid
          container
          spacing={2}
          sx={{ margin: 0, align: "center", textAlign: "center" }}
        >
          <Grid
            item
            xs={12}
            md={3}
            sx={{
              borderRight: "1px solid #f1f1f1",
            }}
          >
            {index}
          </Grid>
          <Grid item xs={12} md={9}>
            {body}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
});

export default KnowledgePageLayout;
