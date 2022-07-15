import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import Search from "./Search";
import Link from "@mui/material/Link";
import { styled, Typography, Box } from "@mui/material";
import { yellow } from "@mui/material/colors";
import MenuHeader from "./MenuHeader";
import { Grid } from "@mui/material";

export default function Menu({ lessonData }) {
  const Responsive = styled("div")(({ theme }) => ({
    [theme.breakpoints.down("sm")]: {
      color: yellow[700],
    },
  }));
  // changing the color of the menu when below 700 res

  const handleClick = (e) => {
    console.log(e.target.innerHTML);
  };

  return (
    <Grid item md={3}>
      <Paper
        variant="outlined"
        square
        sx={{
          height: "100%",
          backgroundColor: "#F4F5F7",
        }}
      >
        <MenuList dense>
          <MenuHeader />
          {/* ^^ component */}
          <MenuItem>
            <Typography variant="h6">Lessons</Typography>
          </MenuItem>
          {lessonData.map((lessons) => {
            return (
              <>
                <div>
                  <MenuItem key={lessons.id} onClick={(e)=>handleClick(e)}>
                    {console.log(lessons.id,"hi")}
                    <Typography variant="body1" noWrap={true}>
                      {lessons.fields.Label}
                    </Typography>
                  </MenuItem>
                  <Divider />
                </div>
              </>
            );
          })}
        </MenuList>
      </Paper>
    </Grid>
  );
}
