import React from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";


const card = {
  height: "100%",
};

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function SkillsCard({ skills }) {
  if (!skills) {
    return <div>Loading...</div>;
  }
  return (
    <Card sx={card}>
      <CardContent>
        <Typography variant="h6" component="div">
          Skills
        </Typography>
        <Paper
          sx={{
            display: "flex",
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
                  sx={{ backgroundColor: "background.skillsChip", color: "#FFFFFF" }}
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
