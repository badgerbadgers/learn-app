import React from "react";
import MenuHeader from "./MenuHeader";
import  Typography from "@mui/material/Typography";
import  Grid from "@mui/material/Grid";
import  MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import  Divider from "@mui/material/Divider";
import  Paper from "@mui/material/Paper";

export default function Menu({ lessonData,setSelectedLabel }) {
  
  return (
    <Grid item md={3}
    sx={{maxWidth:"100%"}}>
      <Paper
        variant="outlined"
        square
        sx={{
          height: "100%",
          backgroundColor: "#F4F5F7",
        }}
      >
        <MenuList dense sx={{}}>
          <MenuHeader />
          {/* ^^ component */}
          <MenuItem>
            <Typography variant="h6">Lessons</Typography>
          </MenuItem>
          {lessonData.map((lessons) => {
            return (
              <div key={lessons._id}>
                <MenuItem
                  onClick={() => {
                    console.log(lessons.lesson_label);
                    {setSelectedLabel(lessons.lesson_label)};
                  }}
                >
                  <Typography variant="body1" noWrap={true}>
                    {lessons.lesson_label}
                  </Typography>
                </MenuItem>
                <Divider />
              </div>
            );
          })}
        </MenuList>
      </Paper>
    </Grid>
  );
}
