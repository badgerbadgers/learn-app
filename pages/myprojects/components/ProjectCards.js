import { StayPrimaryLandscape } from "@mui/icons-material";
import { Grid, Card, CardHeader, CardContent } from "@mui/material";

const ProjectCards = () => {
  return (
    <Grid
      item
      container
      spacing={2}
      xs={12}
      sx={{
        paddingLeft: "20px",
        paddingRight: "20px",
        marginTop: "25px",
        marginBottom: "25px",
      }}
    >
      <Card
        elevation={15}
        sx={{
          border: "1px solid",
          borderColor: "primary.main",
          borderRadius: "0.25rem",
          height: "100%",
          width: "100%",
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
          title="VAMOS"
        />
        <CardContent
          sx={{
            margin: "0 auto",
            height: "100%",
            paddingTop: "0",
          }}
        >
          {/* Container for Logo and Description */}
          <Grid container xs={12}>
            <Grid item xs={2}></Grid>
            <Grid item xs={10}></Grid>
          </Grid>
          {/* Container for MeetingTime */}
          <Grid container xs={12}>
            <Grid item xs={12}></Grid>
            <Grid item xs={12}></Grid>
            <Grid item xs={12}></Grid>
          </Grid>
           {/* Container for Repo & calendar Links */}
           <Grid container xs={12}>
                <Grid item xs={6}></Grid>
                <Grid item xs={6}></Grid>
            </Grid>
          {/* Container for Team Members */}
          <Grid container xs={12}>
            <Grid item xs={12}></Grid>
            <Grid item xs={12}></Grid>
          </Grid>
          {/* Container for Project Types */}
          <Grid container xs={12}>
            <Grid item xs={12}></Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ProjectCards;
