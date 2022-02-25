import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    // background: "linear-gradient(45deg, #2196F3 30%, #1FF4F1 90%)",
  },
}));

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const card = {
  height: "100%",
};

const PreviousIndustryCards = () => {
  const { container } = useStyles();
  const [experienceData, setExperienceData] = useState([
    { key: 0, label: "Manufacture" },
    { key: 1, label: "Customer Services" },
    { key: 2, label: "Health Care" },
    { Key: 3, label: "Oil and Gas" },
  ]);

  const handleDelete = (experienceToDelete) => () => {
    setExperienceData((experiences) =>
      experiences.filter(
        (experience) => experience.key !== experienceToDelete.key
      )
    );
  };

  return (
    <Card className={container} sx={card}>
      <CardContent>
        <Typography variant="h5" component="div">
          Previous Industry
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
          {experienceData.map((data) => {
            return (
              <ListItem key={data.key}>
                <Chip
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
    </Card>
  );
};

export default PreviousIndustryCards;
