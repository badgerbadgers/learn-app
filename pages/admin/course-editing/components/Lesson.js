import React from "react";
import { Box, Stack, IconButton, Grid } from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import AddIcon from "@mui/icons-material/Add";
export default function Lesson({ title }) {
  return (
    <Grid item lg={10} sx={{ display: "flex", mb: "2em", ml: "5em" }}>
      <Box
        sx={{
          border: "0.5px solid #D9D9D9",
          width: "50em",
          p: "16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {title}
        <IconButton>
          <OpenInNewIcon />
        </IconButton>
      </Box>

      <Stack sx={{ display: "flex", flexDirection: "row", p: "16px" }}>
        <IconButton>
          <ModeEditIcon />
        </IconButton>
        <IconButton>
          <DeleteOutlinedIcon />
        </IconButton>
        <IconButton>
          <AddIcon />
        </IconButton>
      </Stack>
    </Grid>
  );
}
