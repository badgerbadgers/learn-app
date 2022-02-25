import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import { Typography } from "@mui/material";
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

export default function SkillsCards() {
  const { container } = useStyles();
  const [skillsData, setSkillsData] = useState([
    { key: 0, label: "HTML" },
    { key: 1, label: "JavaScript" },
    { key: 2, label: "CSS" },
    { key: 3, label: "React" },
    { key: 5, label: "Teamwork" },
  ]);

  const handleDelete = (skillsToDelete) => () => {
    setSkillsData((skills) =>
      skills.filter((skill) => skill.key !== skillsToDelete.key)
    );
  };

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
          {skillsData.map((data) => {
            let icon;

            if (data.label === "React") {
              icon = <TagFacesIcon />;
            }

            return (
              <ListItem key={data.key}>
                <Chip
                  icon={icon}
                  label={data.label}
                  onDelete={
                    data.label === "React" ? undefined : handleDelete(data)
                  }
                />
              </ListItem>
            );
          })}
        </Paper>
      </CardContent>
    </Card>
  );
}
