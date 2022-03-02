import React from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
//import TagFacesIcon from "@mui/icons-material/TagFaces";
import { Card, CardContent, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    // background: "linear-gradient(45deg, #2196F3 30%, #1FF4F1 90%)",
  },
}));

const card = {
  height: "100%",
};

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function SkillsCards({skills}) {
  const { container } = useStyles();

  if (!skills) {
    return <div>Loading...</div>;
  }
  return (
    <Card sx={card}>
      <CardContent>
        <Typography variant="h5" component="div">
          Skills
        </Typography>
        <Paper
          className={container}
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            listStyle: "none",
            p: 0.5,
            m: 0,
          }}
          component="ul"
        >
          {skills.map((data) => {
            return (
              <ListItem key={data}>
                <Chip
                  label={data}
                />
              </ListItem>
            );
          })}
        </Paper>
      </CardContent>
    </Card>
  );
}
