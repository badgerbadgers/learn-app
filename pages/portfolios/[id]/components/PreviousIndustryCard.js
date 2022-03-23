import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const card = {
  height: "100%",
};

const PreviousIndustryCard = ({ previousIndustry }) => {
  if (!previousIndustry) {
    return <div>Loading...</div>;
  }

  return (
    <Card sx={card}>
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
          {previousIndustry.map((data) => {
            return (
              <ListItem key={data}>
                <Chip
                  sx={{ backgroundColor: "#4285F4", color: "#FFFFFF" }}
                  label={data}
                />
              </ListItem>
            );
          })}
        </Paper>
      </CardContent>
    </Card>
  );
};

export default PreviousIndustryCard;
