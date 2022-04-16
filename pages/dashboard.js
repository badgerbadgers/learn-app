import React, { useState } from "react";
import MuiAlert from "@mui/material/Alert";
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import PsychologyIcon from '@mui/icons-material/Psychology';
import {
  Button,
  Container,
  Grid,
  Typography,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  IconButton,
  Snackbar,
  Paper,
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@mui/material";

import { useSession, getSession } from "next-auth/react";
import Link from "next/link";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { useRouter } from "next/router";

let theme = createTheme();
theme = responsiveFontSizes(theme);

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Dashboard = () => {
  const { data: session } = useSession();
  console.log('SESSION', session)
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const handleShare = () => {
    const url = `https://labs.codethedream.org/portfolios/${session.user.gh}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setOpen(true);
    }
  };

  //close success window on any click
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Container sx={{ py: "2rem" }}>
        {session && (
          <>
            <Button sx={{ backgroundColor: "#F4F5F7" }}>
              <Link href={`/portfolios/${encodeURIComponent(session.user.gh)}`}>
                Visit your Portfolio page
              </Link>
            </Button>
            <IconButton
              onClick={() =>
                router.push(`/userform/${encodeURIComponent(session.user.gh)}`)
              }
            >
              <ModeEditOutlineIcon />
            </IconButton>
            <IconButton onClick={handleShare}>
              <ContentCopyIcon />
            </IconButton>
            {open ? (
              <Snackbar
                open={open}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                autoHideDuration={5000}
                onClose={handleClose}
                sx={{ backgroundColor: "green", justifyContent: "center" }}
              >
                <Alert
                  onClose={handleClose}
                  severity="success"
                  sx={{ width: "100%" }}
                >
                  The link was copied!
                </Alert>
              </Snackbar>
            ) : null}
          </>
        )}
      </Container>
      <Container sx={{ textAlign: "center" }}>
       
          <Typography variant="h3" gutterBottom color="secondary">
          <PsychologyIcon color="secondary" style={{
                  fontSize:'54px', position: 'relative', top: '8px'
                }}/>  Knowledge Base
          </Typography>
        <Paper
          sx={{
            backgroundColor: "#F4F5F7",
            // maxWidth: 800,
            my: 2,
            mx: "auto",
            p: 8,
          }}
          padding={{ xs: 1, md: 4, lg: 8 }}
        >
          <Grid
            container
            rowSpacing={2}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            sx={{ justifyContent: "center" }}
          >
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  minWidth: 350,
                  backgroundColor: "#DFE2E8",
                  padding: "16px",
                }}
              >
                <TrackChangesIcon color="primary" style={{
                  fontSize:'38px', top: '15px', position: 'relative'
                }}/>
                <CardHeader title="Skills Zones"></CardHeader>
                <CardContent>
                  <Typography variant="body1">
                   CTD Labs skills and zones rubric used for apprentice evaluations.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    onClick={() => router.push("/knowledge-base/zones")}
                  >
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  minWidth: 350,
                  backgroundColor: "#CBCFD9",
                  padding: "16px",
                }}
              >
                <ConnectWithoutContactIcon color="primary" style={{
                  fontSize:'38px', top: '15px', position: 'relative'
                }}/>
                <CardHeader title="Pair Programming">
                </CardHeader>
                <CardContent>
                  <Typography variant="body1">
                    Information and process about how CTD Labs implements pair programming.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    onClick={() => router.push("/knowledge-base/pair-pgr-page")}
                  >
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
};

export default Dashboard;

export async function getServerSideProps(context) {


  return {
    props: {
      session: await getSession(context),
    },

  }
}
