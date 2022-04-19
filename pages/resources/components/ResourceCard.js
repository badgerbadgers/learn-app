import React from "react";
import Card from "@mui/material/Card";
import { Grid, Box } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
// import IconButton, { IconButtonProps } from "@mui/material/IconButton";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Button, CardActionArea, CardActions, Paper } from "@mui/material";
import { makeStyles, ThemeProvider } from "@mui/styles";
import { height } from "@mui/system";
// import { createTheme } from "@mui/material";
// Setting the styles on the root element of ResourceCard component

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 200,
    minHeight: 550,
  },
  button: {
    textTransform: "none",
    borderRadius: "30px",
    marginLeft: "10px",
    marginBottom: "8px",
  },
}));

function ResourceCard({ resource }) {
  const classes = useStyles();
  console.log("RESOURCE:", resource);

  return (
    <Paper elevation={15} >
      <Card className={classes.root}>
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
        <Grid sx={{
          background: "#CDDC39",
          justifySelf: "stretch",
          // height: "100%"
        }}>
          <CardContent sx={{height: "100%"}}>
            <Typography gutterBottom variant="h6" component="div">
              {resource.fields.Name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {resource.fields.Description}
            </Typography>
          </CardContent>
          <ThemeProvider
          // theme={myTheme}
          >
            <Button
              size="small"
              color="primary"
              variant="outlined"
              className={classes.button}
            >
              {resource.fields["Name (from language)"]}
            </Button>
          </ThemeProvider>
        </Grid>
      </Card>
    </Paper>
  );
}

export default ResourceCard;
