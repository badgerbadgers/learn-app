import React from "react";
import { Box, Stack, IconButton } from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import AddIcon from "@mui/icons-material/Add";
export default function Lesson({ title }) {
  return (
    <Box sx={{ display: "flex", mb: "2em", ml: "5em" }}>
      <Box sx={{ border: "0.5px solid #D9D9D9", width: "800px", p: "16px" }}>
        {title}
        {/* <IconButton>
          <OpenInNewIcon />
        </IconButton> */}
      </Box>

      <Stack sx={{ display: "flex", flexDirection: "row" }}>
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
    </Box>
  );
}
