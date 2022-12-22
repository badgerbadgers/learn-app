import React from "react";
import { Box, Stack, IconButton, Button, Grid } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "@emotion/react";

export default function Section({ sectionTitle }) {
  const theme = useTheme();
  return (
    <Grid item lg={10}>
      <Stack>
        <Box
          sx={{
            borderBottom: "0.5px solid #D9D9D9",
            maxWidth: "50em",
            ml: "5em",
          }}
        ></Box>

        <Button
          size="small"
          variant="outlined"
          sx={{
            border: "1px solid #D9D9D9",
            borderRadius: "20px",
            position: "relative",
            left: "67.5em",
            bottom: "23px",
            maxWidth: "130px",
            p: "9px", 
            "&:hover": {
              backgroundColor: theme.palette.background.ctdcard,
              fontWeight: "normal",
              borderColor: theme.palette.primary,
            },
          }}
          startIcon={<AddIcon />}
        >
          Section
        </Button>
      </Stack>

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
    </Grid>
  );
}
