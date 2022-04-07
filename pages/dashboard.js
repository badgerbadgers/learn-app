import React, { useState } from "react";
import Footer from "../components/Footer";
import MuiAlert from "@mui/material/Alert";
import { styled } from "@mui/material/styles";
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

import { useSession } from "next-auth/react";
import Link from "next/link";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { useRouter } from "next/router";

let theme = createTheme();
theme = responsiveFontSizes(theme);

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'white-content' ? '#1A2027' : "#F4F5F7",
  maxWidth: 800,
}));

const Dashboard = () => {
    console.log(theme)
  const { data: session } = useSession();

  const [open, setOpen] = useState(false);

  /* const link = `/portfolios/${session.user.gh}`; */
  let router = useRouter();

  const handleShare = () => {
    let url = `https://labs.codethedream.org/portfolios/${session.user.gh}`;
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
            <Button sx={{backgroundColor: "#F4F5F7"}}>
              <Link href={`/portfolios/${encodeURIComponent(session.user.gh)}`}>
                Go to your Portfolio
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
        <ThemeProvider theme={theme}>
          <Typography variant="h3" gutterBottom>
            Visit out knowledge base section
          </Typography>
        </ThemeProvider>
        <StyledPaper
          sx={{
            my: 2,
            mx: "auto",
            p: 8,
          }}
        >
          <Grid
            container
            rowSpacing={2}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            sx={{ justifyContent: "center" }}
          >
            <Grid item >
              <Card sx={{ minWidth: 275, backgroundColor: "#DFE2E8", padding: '20px' }} >
                <CardHeader title="Skills Zones"></CardHeader>
                <CardContent>
                  <Typography>Find info about skills zoning</Typography>
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
            <Grid item>
              <Card sx={{ minWidth: 275, backgroundColor: "#CBCFD9", padding: '20px' }}>
                <CardHeader title="Pair Programming"></CardHeader>
                <CardContent><Typography>Find info about pair programming</Typography></CardContent>
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
        </StyledPaper>
      </Container>
      <Footer />
    </>
  );
};

export default Dashboard;
