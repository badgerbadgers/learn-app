import React, { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";

export default function Header({ courseData }) {
  console.log("HeaderPage",courseData)
  // mui dropdown
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
   
    <Grid
      item
      xs={12}
      lg={12}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "green",
      }}
    > 
      {/* {courseData.map(course => { 
        return (
          <h2 key={index}>{ course.course_name}</h2>
        )
      })}
      */}

      <Stack sx={{ display: "inline" }}>
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          endIcon={<ExpandMoreIcon />}
        >
          Course
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleClose}>Course 1</MenuItem>
          <MenuItem onClick={handleClose}>Course 2</MenuItem>
          <MenuItem onClick={handleClose}>Course 3</MenuItem>
        </Menu>
      </Stack>
    </Grid>
  );
}
