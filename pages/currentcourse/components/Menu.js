import React from "react";
import {
  Typography,
  Grid,
  MenuList,
  MenuItem,
  Paper,
  Divider,
} from "@mui/material";
import MenuHeader from "./MenuHeader";

export default function Menu( lessonData ) {
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
          {/* {lessonData.map((lessons) => {
            return (
              <>
                <div>
                  <MenuItem key={lessons.id}>
                    {console.log(lessons.id, "hi")}
                    <Typography variant="body1" noWrap={true}>
                      {lessons.fields.Label}
                    </Typography>
                  </MenuItem>
                  <Divider />
                </div>
              </>
            );
          })} */}
        </MenuList>
      </Paper>
    </Grid>
  );
}
