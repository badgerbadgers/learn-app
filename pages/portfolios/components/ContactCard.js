import React from "react";
import Card from "@mui/material/Card";
import { Grid, Button, ButtonGroup, Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { LinkedIn, Twitter } from "@mui/icons-material";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";
import { makeStyles } from "@mui/styles";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import styles from "../../../styles/Portfolio.module.css";
import DownloadIcon from "@mui/icons-material/Download";

const useStyles = makeStyles((theme) => ({
  avatarImage: {
    height: "150px",
    width: "150px",
    margin: "10px",
  },
  contactCardIcons: {
    backgroundColor: "#12284C",
    color: "#FFFFFF",
    borderRadius: "5px",
    maxWidth: "26px",
    minWidth: "26px",
    paddingRight: 0,
  },
  button: {
    textTransform: "none",
  },
}));

function ContactCard({ user }) {
  const classes = useStyles();
  if (!user) {
    return <div>Loading...</div>;
  }

  console.log("GitHub:", user.gh);

  return (
    <Grid item sx={{ textAlign: "center" }}>
      <Card variant="outlined" sx={{ height: "100%" }}>
        <div className={styles.innerCard}>
          <Avatar
            className={classes.avatarImage}
            style={{ alignItems: "center" }}
            alt="User Picture"
            src={user.image}
          />
          <div>
            <Typography variant="h4" component="div" marginTop="15px">
              {user.firstName} {user.lastName}
            </Typography>
            <Typography sx={{ mb: 1.0 }} color="text.secondary">
              {user.pronouns}
            </Typography>
            <Typography variant="h5" component="div">
              Tech Stack: <br />
              {user.techStackArray.map((data) => {
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
                    <strong>{data}</strong>
                  </Typography>
                );
              })}
            </Typography>
            <ButtonGroup
              sx={{
                "& .MuiButtonGroup-grouped": {
                  minWidth: "0px",
                },
              }}
            >
              <Stack direction="row" spacing={0.5} m={2}>
                {user.linkedin && (
                  <Box>
                    <Button
                      className={classes.contactCardIcons}
                      size="small"
                      variant="contained"
                      color="primary"
                      startIcon={<LinkedIn />}
                      href={`https://www.linkedin.com/in/${user.linkedin}`}
                      target="_blank"
                    />
                  </Box>
                )}
                <Box>
                  <Button
                    className={classes.contactCardIcons}
                    size="small"
                    variant="contained"
                    color="primary"
                    startIcon={<GitHubIcon />}
                    href={`https://github.com/${user.gh}`}
                    target="_blank"
                  />
                </Box>
                {user.email && (
                  <Box>
                    <Button
                      className={classes.contactCardIcons}
                      size="small"
                      variant="contained"
                      color="primary"
                      startIcon={<EmailIcon />}
                      href={`mailto:${user.email}`}
                      target="_blank"
                    />
                  </Box>
                )}
                {user.twitter && (
                  <Box>
                    <Button
                      className={classes.contactCardIcons}
                      size="small"
                      variant="contained"
                      startIcon={<Twitter />}
                      href={`https://twitter.com/${user.twitter}`}
                      target="_blank"
                    />
                  </Box>
                )}
              </Stack>
            </ButtonGroup>
            {/* <Grid item m={1}>
              <Button
                className={classes.button}
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
            </Grid> */}
          </div>
        </div>
      </Card>
    </Grid>
  );
}

export default ContactCard;
