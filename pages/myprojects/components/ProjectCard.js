import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Avatar,
  Link,
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
          border: "3px solid",
          borderColor: headerColor,
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
          }}
        >
          {/* Container for Logo and Description */}
          <Grid item container>
            <Grid item xs={12} sm={3} md={2} sx={{height: '100px', display: 'flex', justifyContent: "center" }}>
              <Avatar
                alt="App Logo"
                src={projectData.logo}
                variant="square"
               sx={{ height: '90px', width: 'fit-content'}}
                component={Link}
                href={projectData.website}
                target='_blank'
                rel="noopener noreferrer"
              />
            </Grid>
            <Grid item xs={12} sm={9} md={10} pl={2}>
              <Typography variant="body1">
                {projectData.description}
                Upstate is a web-app that tracks legislation in the North
                Carolina General Assembly. Advocates, legislators, and lobbyists
                have subscriptions to keep track of bills but there is also a
                free subscription for non-profits; as well as a free version
                that has limited features. It allows the user to pick the
                different bills that you want to follow and also look for them
                specifically for what you would like to look for, also, manage
                your bills and be able to add tags for easy following. There are
                also committee meetings that are scheduled so you are able to
                track when the committee meeting will be happening. It is an
                easy way and an organized way to track the pending legislation
                in NC.
              </Typography>
            </Grid>
          </Grid>

          {/* container for all the bottom details */}

          <Grid container flex-direction="column" mt={2}>
            {/* Container for Meetings Time */}
            <Grid item container xs={12} md={4} mb={2}>
              <Grid item xs={12} display="flex">
                <Typography variant="h6" width="60%">Daily Standup Time ET:</Typography>
                <Typography variant="body1" textAlign="center">
                  11:30 am
                  {projectData.dailyStandupTime}
                </Typography>
              </Grid>

              {/* -------------- */}

              <Grid item xs={12} display="flex">
                <Typography variant="h6" width="60%">Planning Meet Time ET:</Typography>
                <Typography variant="body1" textAlign="center" >
                  11:30 am
                  {projectData.planningMeetTime}
                </Typography>
              </Grid>

              {/* -------------- */}

              <Grid item xs={12} display="flex">
                <Typography variant="h6" width="60%">Daily Scrum Time ET:</Typography>
                <Typography variant="body1" textAlign="center" >
                  11:30 am
                  {projectData.dailyScrumTime}
                </Typography>
              </Grid>
            </Grid>

            {/* Container for Repo & calendar Links */}
            <Grid item container flex-direction="column" xs={12} md={2}>
              {/* Repo */}
              <Grid item xs={6} md={12}>
                <Typography variant="h6" >{projectData.repo}</Typography>
              </Grid>

              {/* Calendar */}
              <Grid item xs={6} md={12}>
                <Typography variant="h6" >{projectData.calendarLink} Calendar Link</Typography>
              </Grid>
            </Grid>

            {/* Container for Team Members */}
            <Grid item container flex-direction="column" xs={12} md={6} mt={2}>
              <Grid item xs={12} display="flex">
              <Typography variant="h6" width="40%">PM:</Typography>
                <Typography variant="body1" >
                  Rachel
                  {projectData.projectManager}
                </Typography>
              </Grid>

              <Grid item xs={12} display="flex">
              <Typography variant="h6" width="40%">Team:</Typography>
                <Typography variant="body1">
                {projectData.team.join(",  ")}, Alezandra, Mohammad Razi Rizvi, 
                </Typography>
              </Grid>

            </Grid>
          </Grid>
          {/* -------------- */}

          {/* Container for Project Types */}
          <Grid container flex-direction="column" mt={2}>
            <Grid item xs={12}>
              {projectData.type} React, React Native, Rails
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ProjectCard;
