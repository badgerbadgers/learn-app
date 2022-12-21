import React from "react";
import { Box, Stack, IconButton } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

export default function Section({ sectionTitle }) {
  return (
    //   should the whole thing be in a form?
    <Box sx={{ display: "flex", alignItems: "center", mb: "2em" }}>
      <Box
        sx={{
          border: "0.5px solid #D9D9D9",
          p: "16px",
          width: "350px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {sectionTitle}
        <IconButton>
          <OpenInNewIcon />
        </IconButton>
      </Box>
      <Stack sx={{ flexDirection: "row", alignItems: "center" }}>
        <IconButton>
          <ModeEditIcon />
        </IconButton>
        <IconButton>
          <DeleteOutlinedIcon />
        </IconButton>
      </Stack>
    </Box>
  );
}
