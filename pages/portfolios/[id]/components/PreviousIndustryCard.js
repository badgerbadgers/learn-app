import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
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

const PreviousIndustryCard = ({previousIndustry}) => {
  const classes = useStyles();

  if (!previousIndustry) {
    return <div>Loading...</div>;
  }
  return (
    <Card className={classes.container} sx={card}>
      <CardContent>
        <Typography variant="h5" component="div">
          Previous Industry
        </Typography>
        <Paper
          className={classes.container}
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
