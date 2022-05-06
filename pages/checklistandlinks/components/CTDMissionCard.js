import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import DiamondIcon from '@mui/icons-material/Diamond';
import useMediaQuery from "@mui/material/useMediaQuery";

const missionInfo = [""];

const vissionInfo = [];

const CTDMissionCard = () => {
  const matches = useMediaQuery("(min-width:600px)");
  return (
    <Grid container item xs={12} pb={1} mt={-1}>
      <Card
        sx={{
          height: "100%",
          width: "100%",
          position: "relative",
          margin: "0 auto",
          display: "flex",
        }}
      >
        <Grid container item xs={12}>
          <CardHeader
          action={<DiamondIcon />}
            title="CTD Mission Statement & Vision Statement"
            md={12}
            sx={{
              backgroundColor: "primary.yellowCard",
              color: "primary.contrastText",
              flexGrow: "1",
            }}
          ></CardHeader>

          <Grid container item>
            <Grid item sm={6} xs={12}>
              <CardContent>
                <Typography variant="h6">
                  Code the Dream Mission Statement
                </Typography>
                <Typography varian="body1" textAlign="left">
                  Code the Dream creates opportunity that changes lives, builds
                  technology that benefits our communities, and supports the
                  diversity that drives a more just and innovative world.
                </Typography>
              </CardContent>
            </Grid>

            <Grid item sm={6} xs={12}>
              <CardContent>
                <Typography variant="h6">
                  Code the Dream Vision Statement
                </Typography>
                <Typography variant="body1" textAlign="left">
                  Code the Dream envisions a world in which tech innovation
                  comes from all of us and benefits all of us.
                </Typography>
              </CardContent>
            </Grid>
          </Grid>
          <Grid item xs={12} mb={4}>
            <CardContent>
              <Typography variant="h6">
                Diversity, Equity & Inclusion
              </Typography>
              <Typography varian="body1">
                4 Ways to Make Your Workplace Equitable for Trans People
                <a href="https://www.npr.org/2020/06/02/867780063/4-ways-to-make-your-workplace-equitable-for-trans-people">
                  {" "}
                  Link
                </a>
                .
              </Typography>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};
export default CTDMissionCard;
