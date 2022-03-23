import React from "react";
import Card from "@mui/material/Card";
import { Grid, Button, ButtonGroup } from "@mui/material";
import Typography from "@mui/material/Typography";
import { LinkedIn, Twitter } from "@mui/icons-material";
import EmailIcon from "@mui/icons-material/Email";
import { makeStyles } from "@mui/styles";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import styles from "../../../../styles/Portfolio.module.css";
import DownloadIcon from "@mui/icons-material/Download";

const useStyles = makeStyles((theme) => ({
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
    <Grid item display="row" style={{ textAlign: "center" }}>
      <Card variant="outlined" sx={card}>
        <div className={styles.innerCard}>
          <Avatar
            className={classes.avatarImage}
            style={{ alignItems: "center" }}
            alt="Kodayi Temple"
            src={user.userAvatar}
          />
          <div className={styles.cardRight}>
            <Typography variant="h4" component="div" marginTop="15px">
              {user.firstName} {user.lastName}
            </Typography>
            <Typography sx={{ mb: 1.0 }} color="text.secondary">
              {user.pronouns}
            </Typography>
            <Typography variant="h5" component="div">
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
                    <strong>{data}</strong>
                  </Typography>
                );
              })}
            </Typography>
            <ButtonGroup>
              <Stack direction="row" spacing={0.5} m={1}>
                <Stack direction="row" spacing={0.5}>
                  <Button
                    size="small"
                    variant="contained"
                    color="secondary"
                    startIcon={<LinkedIn />}
                    style={{
                      borderRadius: "5px",
                      maxWidth: "26px",
                      minWidth: "26px",
                      paddingRight: 0,
                    }}
                    href={user.linkedin}
                    target="_blank"
                  />
                </Stack>
                <Stack direction="row" spacing={0.5}>
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    startIcon={<EmailIcon />}
                    style={{
                      borderRadius: "5px",
                      maxWidth: "26px",
                      minWidth: "26px",
                      paddingRight: 0,
                    }}
                    href={`mailto:${user.email}`}
                    target="_blank"
                  />
                </Stack>
                <Stack direction="row" spacing={0.5}>
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    startIcon={<Twitter />}
                    style={{
                      borderRadius: "5px",
                      maxWidth: "26px",
                      minWidth: "26px",
                      paddingRight: 0,
                    }}
                    href={user.twitter}
                    target="_blank"
                  />
                </Stack>
              </Stack>
            </ButtonGroup>
            <Grid item m={1}>
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
          </div>
        </div>
      </Card>
    </Grid>
  );
}

export default ContactCard;
