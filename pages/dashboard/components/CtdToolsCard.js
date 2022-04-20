import React, { useState } from "react";
import MuiAlert from "@mui/material/Alert";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import HandymanIcon from "@mui/icons-material/Handyman";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import PsychologyIcon from "@mui/icons-material/Psychology";
import styles from "../../../styles/Knowledge.module.css";
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";

import {
  Button,
  Link,
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

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CtdTooldCard() {
  //a state to manage pop up alert window
  const [open, setOpen] = useState(false);

  const { data: session } = useSession();

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
    <Grid item xs={12} md={6}>
      <Card
        sx={{
          minWidth: 280,
          backgroundColor: "#Dd2E8",
          padding: "16px",
          minHeight: 275,
        }}
      >
        <HandymanIcon
          color="secondary"
          style={{
            fontSize: "38px",
            top: "15px",
            position: "relative",
          }}
        />

        <CardHeader title={"CTD Tools"}></CardHeader>
        <CardContent>
          <Typography variant="body1">
            Don&apos;t forget to update your portfolio
          </Typography>
        </CardContent>
        <CardActions>
          
            <Link sx={{flexGrow: 1}} href={`/portfolios/${encodeURIComponent(session.user.gh)}`}>
              Visit your Portfolio page
            </Link>
          
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
        </CardActions>
      </Card>
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
    </Grid>
  );
}
