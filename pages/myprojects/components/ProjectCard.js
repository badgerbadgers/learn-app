import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  Typography,
  Avatar,
  Link,
} from "@mui/material";
const ProjectCard = ({ projectData, headerColor }) => {

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
          height: "fit-content",
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
            <Grid
              item
              xs={12}
              sm={3}
              md={2}
              sx={{
                height: "100px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Avatar
                alt="App Logo"
                src={projectData.logo}
                variant="square"
                sx={{ height: "90px", width: "fit-content" }}
                component={Link}
                href={projectData.website}
                target="_blank"
                rel="noopener noreferrer"
              />
            </Grid>
            <Grid item xs={12} sm={9} md={10} pl={2}>
              <Typography variant="body1">{projectData.description}</Typography>
            </Grid>
          </Grid>

          {/* container for all the bottom details */}

          <Grid container flex-direction="column" mt={2}>
            {/* Container for Meetings Time CT#1*/}
            <Grid item container xs={12} md={4} mb={2}>
              <Grid
                item
                xs={12}
                display="flex"
                sx={{ flexDirection: { xs: "column", sm: "row" } }}
              >
                <Typography variant="h6" width="215px">
                  Daily Standup Time ET:
                </Typography>
                <Typography variant="body1">
                  11:30 am
                  {/* {projectData.dailyStandupTime} */}
                </Typography>
              </Grid>

              <Grid
                item
                xs={12}
                display="flex"
                sx={{ flexDirection: { xs: "column", sm: "row" } }}
              >
                <Typography variant="h6" width="215px">
                  Planning Meet Time ET:
                </Typography>
                <Typography variant="body1">
                  Wed 11:30 am
                  {/* {projectData.planningMeetTime} */}
                </Typography>
              </Grid>

              <Grid
                item
                xs={12}
                display="flex"
                sx={{ flexDirection: { xs: "column", sm: "row" } }}
              >
                <Typography variant="h6" width="215px">
                  Daily Scrum Time ET:
                </Typography>
                <Typography variant="body1">
                  11:00am
                  {projectData.dailyScrumTime}
                </Typography>
              </Grid>
            </Grid>
            {/* -------------- */}

            {/* Container for Repo & calendar Links CT#2*/}
            <Grid item container flex-direction="column" xs={12} md={2} mb={2}>
              {/* Repo */}
              <Grid item xs={6} md={12}>
                <Typography variant="h6">{projectData.repo}</Typography>
              </Grid>

              {/* Calendar */}
              <Grid item xs={6} md={12}>
                <Typography variant="h6">{projectData.calendarLink}</Typography>
              </Grid>
            </Grid>

            {/* Container for Team Members CT#3*/}
            <Grid item container flex-direction="column" xs={12} md={6}>
              <Grid
                item
                xs={12}
                display="flex"
                sx={{ flexDirection: { xs: "column", sm: "row" } }}
              >
                <Typography variant="h6" minWidth="60px">
                  PM:
                </Typography>
                <Typography variant="body1">
                  {projectData.projectManager}
                </Typography>
              </Grid>

              <Grid
                item
                xs={12}
                display="flex"
                sx={{ flexDirection: { xs: "column", sm: "row" } }}
              >
                <Typography variant="h6" minWidth="60px">
                  Team:
                </Typography>
                <Typography variant="body1">
                  {projectData.team.join(",  ")}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          {/* -------------- */}

          {/* Container for Project Types */}
          <Grid item container flex-direction="column" mt={2} xs={12}>
            <Grid item
            sx={{
                display: "flex",
                justifyContent: "center",
              }}>

              {projectData.type && projectData.type.map((type, i) =>  {
              return (            
                <CardMedia
                key={type + i}
                component="img"
                image={type}
                alt="Project Type"
                sx={{height: '50px', width: 'fit-content', padding: "2px"}}
                
              />
              )})}
              
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ProjectCard;
