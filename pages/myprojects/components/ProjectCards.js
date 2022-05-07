import { Grid, Card, CardHeader, CardContent, Typography } from "@mui/material";

const ProjectCards = ({ project }) => {
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
            marginBottom: '20px',
          }}
        >
          <CardHeader
            sx={{
              backgroundColor: "primary.main",
              padding: "10px",
              textAlign: "center",
              color: "primary.contrastText",
            }}
            variant="h5"
            title={project['Project Name']}
            //title={project.projectName}
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
              <Grid item xs={2}>
                {(project.photo && project.photo.length > 0) && project.photo[0].url}
              </Grid>
              <Grid item xs={10}>
                {project.Project_Description && project.Project_Description}
                </Grid>
            </Grid>
            <Grid item container >
            {/* Container for MeetingTime */}
            <Grid item container flex-direction="column">
              <Grid item xs={12}>
              <Typography>Daily Standup Time ET: {""}
              {project['Daily Standup Time (ET)'] && project['Daily Standup Time (ET)']}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>Planning Meet Time ET: {""}
                {project['Monday Planning Meeting (ET)'] && project['Monday Planning Meeting (ET)']}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>Daily Scrum Time ET: {""}
                {project['daily scrum'] && project['daily scrum'] }</Typography>
                </Grid>
            </Grid>

            {/* Container for Repo & calendar Links */}
            <Grid item container flex-direction="column">
              <Grid item xs={6}></Grid>
              <Grid item xs={6}></Grid>
            </Grid>

            {/* Container for Team Members */}
            <Grid item container flex-direction="column">
              <Grid item xs={12}>{project['Project Manager'] && project['Project Manager']}</Grid>
              <Grid item xs={12}>{project.Developers}</Grid>
            </Grid>
            {/* Container for Project Types */}

            <Grid item container flex-direction="column">
              <Grid item xs={12}>{project.Type}</Grid>
            </Grid>
            </Grid>
          </CardContent>
        </Card>
    </Grid>
  );
};

export default ProjectCards;
