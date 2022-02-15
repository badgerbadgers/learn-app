import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import TagFacesIcon from "@mui/icons-material/TagFaces";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const PreviousIndustryCards = () => {
  const [experienceData, setExperienceData] = useState([
    { key: 0, label: "Manufacture" },
    { key: 1, label: "Customer Services" },
    { key: 2, label: "Frontend" },
  ]);

  const handleDelete = (experienceToDelete) => () => {
    setExperienceData((experiences) =>
      experiences.filter(
        (experience) => experience.key !== experienceToDelete.key
      )
    );
  };

  return (
    <Card item xs={12} sm={6} lg={3}>
      <CardContent>
        <Typography variant="h5" component="div">
          Previous Industry
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
          {experienceData.map((data) => {
            let icon;

            if (data.label === "Frontend") {
              icon = <TagFacesIcon />;
            }
            return (
              <ListItem key={data.key}>
                <Chip
                  icon={icon}
                  label={data.label}
                  onDelete={
                    data.label === "Frontend" ? undefined : handleDelete(data)
                  }
                />
              </ListItem>
            );
          })}
        </Paper>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default PreviousIndustryCards;
