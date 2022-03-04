import React from "react";
import Card from "@mui/material/Card";
import { Grid, Button, ButtonGroup } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Facebook, LinkedIn, Twitter } from "@mui/icons-material";
import EmailIcon from "@mui/icons-material/Email";
import { makeStyles } from "@mui/styles";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import ListItem from "@mui/material";

const useStyles = makeStyles((theme) => ({
  container: {
    // background: "linear-gradient(45deg, #2196F3 30%, #1FF4F1 90%)",
  },
  avatarImage: {
    height: "150px",
    width: "150px",
    margin: "15px",
  },
}));

const card = {
  height: "100%",
};

function ContactCards({ user }) {
  console.log(user, "ContactCards - user");
  const classes = useStyles();
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Card variant="outlined" className={classes.container} sx={card}>
      <Grid item display="flex">
        <Avatar
          className={classes.avatarImage}
          alt="Kodayi Temple"
          src={user.userAvatar}
        />
        <CardContent>
          <Typography variant="h4" component="div">
            {user.firstName} {user.lastName}
          </Typography>
          <Typography sx={{ mb: 1.0 }} color="text.secondary">
            {user.pronouns}
          </Typography>
          <Typography variant="h6" component="div">
            Tech Stack: 
            {user.techStack.map((data) => {
              return <Typography key={data}>{data}</Typography>;
            })}
          </Typography>
        </CardContent>
      </Grid>
      <ButtonGroup display="flex" spacing={1} justify="center">
        <Button
          startIcon={<Facebook />}
          size="small"
          variant="contained"
          color="primary"
        ></Button>
        <Button
          endIcon={<LinkedIn />}
          size="small"
          variant="contained"
          color="secondary"
        ></Button>
        <Button
          startIcon={<EmailIcon />}
          size="small"
          variant="contained"
          color="primary"
        ></Button>
        <Button
          endIcon={<Twitter />}
          size="small"
          variant="contained"
          color="secondary"
        ></Button>
      </ButtonGroup>
      <Grid item m={2}>
        <Button type="submit" size="small" color="success" variant="outlined">
          Download Resume
        </Button>
      </Grid>
    </Card>
  );
}

export default ContactCards;
