import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import LinkedIn from "@mui/icons-material/LinkedIn";
import Twitter from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";
import styles from "../../../styles/Portfolio.module.css";

function ContactCard({ user }) {
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Card variant="outlined" sx={{ height: "100%", textAlign: "center" }}>
      <div className={styles.innerCard}>
        <Avatar
          sx={{ height: "150px", width: "150px", margin: "10px" }}
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
          <Typography variant="h6" component="div">
            Tech Stack: <br />
            {user.techStackArray.map((data) => {
              return (
                // Styling tech stack listing
                <Typography
                  variant="body1"
                  sx={{
                    textTransform: "none",
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
                    sx={{
                      backgroundColor: "background.contactIcon",
                      color: "#FFFFFF",
                      borderRadius: "5px",
                      maxWidth: "26px",
                      minWidth: "26px",
                      paddingRight: 0,
                    }}
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
                  sx={{
                    backgroundColor: "background.contactIcon",
                    color: "#FFFFFF",
                    borderRadius: "5px",
                    maxWidth: "26px",
                    minWidth: "26px",
                    paddingRight: 0,
                  }}
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
                    sx={{
                      backgroundColor: "background.contactIcon",
                      color: "#FFFFFF",
                      borderRadius: "5px",
                      maxWidth: "26px",
                      minWidth: "26px",
                      paddingRight: 0,
                    }}
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
                    sx={{
                      backgroundColor: "background.contactIcon",
                      color: "#FFFFFF",
                      borderRadius: "5px",
                      maxWidth: "26px",
                      minWidth: "26px",
                      paddingRight: 0,
                    }}
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
  );
}

export default ContactCard;
