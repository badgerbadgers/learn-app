import { Typography, Grid } from "@mui/material";

const ProjectHeader = () => {
  return (
    <Grid
    item
    xs={12}
    justify='center'
    sx={{
      align: "center",
      boxShadow: "0 4px 2px -2px #f1f1f2",
    }}
    >
    <Typography variant="h3" gutterBottom color="secondary" textAlign="center">
      My Projects
    </Typography>
    </Grid>
  );
};

export default ProjectHeader;