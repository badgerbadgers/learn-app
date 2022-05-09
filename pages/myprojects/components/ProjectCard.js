import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Avatar,
} from "@mui/material";

const ProjectCard = ({ projectData, headerColor }) => {
  console.log(headerColor);
  return (
    <Grid
      item
      container
      justify="center"
      xs={12}
      sx={{
        align: "center",
        paddingLeft: "25px",
        paddingRight: "25px",
        marginTop: "25px",
        marginBottom: "25px",
      }}
    >
      <Card
        elevation={10}
        sx={{
          border: "1px solid",
          borderColor: "primary.main",
          borderRadius: "0.25rem",
          height: "100%",
          width: "100%",
          marginBottom: "20px",
        }}
      >
        <CardHeader
          sx={{
            backgroundColor: headerColor,
            padding: "10px",
            textAlign: "center",
            color: "primary.contrastText",
          }}
          variant="h5"
          title={projectData.projectName}
        />
        <CardContent
          sx={{
            margin: "0 auto",
            height: "100%",
            paddingTop: "0",
          }}
        >
          {/* Container for Logo and Description */}
          <Grid item container>
            <Grid item xs={12} sm={2}>
              <Avatar
                alt="App Logo"
                src={projectData.logo}
                variant="square"
                sx={{ height: "100%", width: "auto" }}
              />
            </Grid>
            <Grid item xs={12} sm={10}>
              {projectData.description}
            </Grid>
          </Grid>

          <Grid item container flex-direction="column">
            {/* Container for MeetingTime */}
            <Grid item container xs={12} sm={4}>
              <Grid item xs={12}>
                <Typography>
                  Daily Standup Time ET: {""}
                  {projectData.dailyStandupTime}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>
                  Planning Meet Time ET: {""}
                  {projectData.planningMeetTime}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>
                  Daily Scrum Time ET: {""}
                  {projectData.dailyScrumTime}
                </Typography>
              </Grid>
            </Grid>

            {/* Container for Repo & calendar Links */}
            <Grid item container flex-direction="column" xs={12} sm={4}>
              <Grid item xs={6} sm={12}>
                <Typography>
                  Repo Link: {""}
                  {projectData.repo}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={12}>
                <Typography>
                  Calendar Links: {""}
                  {projectData.calendarLink}
                </Typography>
              </Grid>
            </Grid>

            {/* Container for Team Members */}
            <Grid item container flex-direction="column" xs={12} sm={4}>
              <Grid item xs={12}>
                <Typography>
                  PM: {""}
                  {projectData.projectManager}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>
                  Team: {""}
                  {projectData.team}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          {/* Container for Project Types */}
          <Grid item container flex-direction="column" xs={12}>
            <Grid item xs={12}>
              {projectData.type}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ProjectCard;
