import React from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import { Card, CardContent, Typography } from "@mui/material";

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
        <Typography variant="h5" component="div">
          Skills
        </Typography>
        <Paper
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
            let icon;
            if (data === "JavaScript" || data === "HTML" || data === "React") {
              //icon = <TagFacesIcon />;
            }
            return (
              <ListItem key={data}>
                <Chip
                  sx={{ backgroundColor: "#4285F4", color: "#FFFFFF" }}
                  icon={icon}
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
