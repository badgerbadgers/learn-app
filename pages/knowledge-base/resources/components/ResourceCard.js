import React from "react";
import Card from "@mui/material/Card";
import { Grid } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
// import IconButton, { IconButtonProps } from "@mui/material/IconButton";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Button, CardActions, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";

// Setting the styles on the root element of ResourceCard component
const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 200,
    minHeight: 400,
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
    <Grid item xs={12} sm={6} md={4}>
      <Paper elevation={15} sx={{ height: "100%" }}>
        <Card
          className={classes.root}
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#CDDC39",
          }}
        >
          {/* CardActionArea's button will allow users to interact with the entirety 
              of its surface to trigger its main action */}
          <CardMedia
            component="img"
            height="300"
            image="../img/Kodayi-temple.jpg"
            alt="Temple"
          />
          <CardContent sx={{ height: "100%" }}>
            <Typography gutterBottom variant="h6" component="div">
              {resource.fields.Name}
            </Typography>
            <Button color="secondary">
              {resource.fields.Type}
            </Button>
            <Typography variant="body2" color="text.secondary">
              {resource.fields.Description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              color="primary"
              variant="outlined"
              className={classes.button}
            >
              {resource.fields["Name (from language)"]}
            </Button>
          </CardActions>
        </Card>
      </Paper>
    </Grid>
  );
}

export default ResourceCard;
