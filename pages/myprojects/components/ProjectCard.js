import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Avatar,
  Link,
} from "@mui/material";
import DOMPurify from "isomorphic-dompurify";

const ProjectCard = ({ projectData, headerColor }) => {
  console.log(headerColor);
  const sanitize = DOMPurify.sanitize();
  const htmlTarget = "target='_blank'";

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
            
            <Grid item xs={12} md={1}>
              <Avatar
                alt="App Logo"
                src={projectData.logo}
                variant="square"
                sx={{ height: "auto" }}
              />
            </Grid>
            <Grid item xs={12} md={11}>
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
            <Grid item container xs={12} sm={4}>

              <Grid item xs={12} display="flex">
                <Typography variant="h6">Daily Standup Time ET:</Typography>

                <Typography variant="body1">
                  11:30 am
                  {projectData.dailyStandupTime}
                </Typography>

              </Grid>
                          {/* -------------- */}
              <Grid item xs={12}>
                <Typography>
                  Planning Meet Time ET: {""}
                  {projectData.planningMeetTime}
                </Typography>
              </Grid>
                          {/* -------------- */}
              <Grid item xs={12}>
                <Typography>
                  Daily Scrum Time ET: {""}
                  {projectData.dailyScrumTime}
                </Typography>
              </Grid>

            </Grid>

            {/* Container for Repo & calendar Links */}
            
            <Grid item container flex-direction="column" xs={12} sm={4}>
              {/* Repo */}
              <Grid item xs={6} sm={12}>
                <Typography variant="h6"
                  dangerouslySetInnerHTML={{
                    __html: sanitize(projectData.repo, {
                      transformTags: {
                      'a': sanitize.simpleTransform('a', {target: '_blank'})
                    }}),
                  }}
                >
                </Typography>
                
              </Grid>

              {/* Calendar */}
              <Grid item xs={6} sm={12}>
                <Typography>
                  Calendar Links: {""}
                  {projectData.calendarLink}
                </Typography>
              </Grid>

            </Grid>
                    {/* -------------- */}
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
