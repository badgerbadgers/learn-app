import React from "react";
import TextField from "@mui/material/TextField";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import AddIcon from "@mui/icons-material/Add";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

export default function Section() {
  return (
    // maybe split up section and lessons
    <Box sx={{m:"0 auto"}} >
      <Grid item lg={9} sx={{ display: "flex" }}>
        <FormControl>
          {/* section header */}
          <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        </FormControl>
        <Stack sx={{ display: "flex", flexDirection: "row" }}>
          <IconButton>
            <ModeEditIcon />
          </IconButton>
          <IconButton>
            <DeleteOutlinedIcon />
          </IconButton>
        </Stack>
      </Grid>

      <Grid item xs={12} lg={12} sx={{ display: "flex" }}>
        {/* lessons */}
        <FormControl>
          <TextField
            id="outlined-basic"
            label="Outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="open view in new page">
                    <OpenInNewIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            variant="outlined"
          />
        </FormControl>
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

        <Divider></Divider>
        {/* <Box
        sx={{
          width: "100%",
          height: "50%",
          display: "flex",
          borderBottom: "0.5px solid green",
          position: "absolute",
        }}
      /> */}
      </Grid>
      {/* you need another grid item */}
      {/* don't forget hover button */}
      <Button
        sx={{ border: "1px solid #D9D9D9", borderRadius: "20px" }}
        startIcon={<AddIcon />}
      >
        Section
      </Button>
    </Box>
  );
}
