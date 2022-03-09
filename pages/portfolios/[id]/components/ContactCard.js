import React from "react";
import Card from "@mui/material/Card";
import { Grid, Button, ButtonGroup } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Facebook, LinkedIn, Twitter } from "@mui/icons-material";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";
import { makeStyles } from "@mui/styles";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import DownloadIcon from "@mui/icons-material/Download";

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

function ContactCard({ user }) {
  const classes = useStyles();
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Card variant="outlined" className={classes.container} sx={card}>
      {/* Grid for avatar and card content styling */}
      <Grid
        item
        display="flex"
        style={{
          textAlign: "center",
        }}
      >
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
            Tech Stack: <br />
            {user.techStack.map((data) => {
              return (
                // Styling tech stack listing
                <Typography
                  sx={{
                    display: "inline",
                    justifyContent: "center",
                    listStyle: "none",
                    flexWrap: "wrap",
                    p: 0.5,
                  }}
                  key={data}
                >
                  {data}
                </Typography>
              );
            })}
          </Typography>
        </CardContent>
      </Grid>
      {/* Grid for button group styling */}
      <Grid
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ButtonGroup>
          <Stack direction="row">
            <Button
              size="small"
              variant="contained"
              color="primary"
              startIcon={<Facebook />}
              style={{ borderRadius: "10px" }}
              href={user.facebook}
              target="_blank"
            />
            <Button
              size="small"
              variant="contained"
              color="secondary"
              startIcon={<LinkedIn />}
              style={{ borderRadius: "10px" }}
              href={user.linkedin}
              target="_blank"
            />
            <Button
              size="small"
              variant="contained"
              color="primary"
              startIcon={<EmailIcon />}
              style={{ borderRadius: "10px" }}
              href={user.email}
              target="_blank"
            />
            <Button
              size="small"
              variant="contained"
              color="secondary"
              startIcon={<GitHubIcon />}
              style={{ borderRadius: "10px" }}
              href={user.github}
              target="_blank"
            />
            <Button
              size="small"
              variant="contained"
              color="primary"
              startIcon={<Twitter />}
              style={{ borderRadius: "10px" }}
              href={user.twitter}
              target="_blank"
            />
          </Stack>
        </ButtonGroup>
      </Grid>
      {/* Grid for Download button styling */}
      <Grid
        item
        m={2}
        style={{
          textAlign: "center",
        }}
      >
        <Button
          variant="outlined"
          color="success"
          startIcon={<DownloadIcon />}
          href={user.resume}
          type="download"
          size="small"
          target="_blank"
        >
          Download Resume
        </Button>
      </Grid>
    </Card>
  );
}

export default ContactCard;
