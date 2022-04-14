import React from "react";
import Card from "@mui/material/Card";
import { Grid } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Button, CardActionArea, CardActions, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";

// Setting the styles on the root element of ResourceCard component
const useStyles = makeStyles((theme) => ({
  button: {
    textTransform: "none",
    borderRadius: "30px",
    marginLeft: "10px",
    marginBottom: "8px",
  },
  cardContentArea: {
    background: "#CDDC39",
  },
}));

function ResourceCards() {
  const classes = useStyles();

  return (
      <Grid item display="flex" m={2}>
        <Paper elevation={15}>
        <Card
          sx={{ maxWidth: 300 }}
        >
            {/* CardActionArea's button will allow users to interact with the entirety 
              of its surface to trigger its main action */}
            <CardActionArea>
              <CardMedia
                component="img"
                height="300"
                image="../img/Kodayi-temple.jpg"
                alt="Temple"
              />
            </CardActionArea>
            <Paper className={classes.cardContentArea}>
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  Coding style guige (Google)
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Coding style/conventional that Google developers want you to
                  have/follow.
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  variant="outlined"
                  className={classes.button}
                >
                  JavaScript
                </Button>
              </CardActions>
            </Paper>
          </Card>
        </Paper>
      </Grid>
  );
}

export default ResourceCards;
