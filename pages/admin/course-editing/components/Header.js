import React, { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import { Divider, Typography } from "@mui/material";
import Link from "next/link";

export default function Header({ courseTitle, allCourses }) {
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
        alignItems: "center",
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontFamily: "Gotham Rounded",
          fontWeight: "100",
          color: "#FF5C35",
          fontSize: "36px",
        }}
      >
        {courseTitle}
      </Typography>

      <Stack sx={{ display: "inline" }}>
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          endIcon={<ExpandMoreIcon />}
          sx={{ textTransform: "capitalize" }}
        >
          Courses
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
          {allCourses.map((course, index) => {
            return (
              <Stack key={course._id}>
                <Link
                  href={`/admin/course-editing/${course.slug}`}
                  // forces link to send href to children
                  passHref
                >
                  <MenuItem
                    onClick={handleClose}
                    sx={{
                      color:
                        course.course_name === courseTitle ? "#FF5C35" : "",
                    }}
                  >
                    {course.course_name}
                  </MenuItem>
                </Link>

                <Divider
                  sx={{
                    visibility:
                      index === allCourses.length - 1 ? "hidden" : "visible",
                  }}
                />
              </Stack>
            );
          })}
        </Menu>
      </Stack>
    </Grid>
  );
}
