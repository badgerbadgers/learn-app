import React, { useState } from "react";
import MuiAlert from "@mui/material/Alert";

import HandymanIcon from "@mui/icons-material/Handyman";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { useRouter } from "next/router";

import {
  Link,
  Grid,
  Typography,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  IconButton,
  Snackbar,
} from "@mui/material";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CTDToolsCard({ style, user }) {
  //a state to managev a pop up alert window
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleShare = () => {
    if (user) {
      const url = `https://labs.codethedream.org/portfolios/${user.gh}`;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(url);
        setOpen(true);
      }
    }
  };

  //close success modal on click
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid item xs={12} md={6}>
      {user &&
        <Card
          sx={{
            backgroundColor: "background.ctdcard",
            ...style,
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
              Don&apos;t forget to update and share your portfolio.
            </Typography>
          </CardContent>
          <CardActions
            sx={{ marginTop: "auto", alignSelf: "flex-start", width: "100%" }}
          >
            <Link
              aria-label="link to portfolio page"
              sx={{ textDecoration: "none", flexGrow: 1, textAlign: "left" }}
              href={`/portfolios/${user.gh}`}
            >
              Visit your Student profile
            </Link>

            <IconButton
              title="edit user form"
              aria-label="edit user form icon"
              onClick={() => router.push(`/userform/${user.gh}`)}
            >
              <ModeEditOutlineIcon />
            </IconButton>
            <IconButton
              onClick={handleShare}
              title="copy the link to your portfolio"
              aria-label="copy the portfolio link icon"
            >
              <ContentCopyIcon />
            </IconButton>
          </CardActions>
        </Card>
      }
      {open ? (
        <Snackbar
          aria-label="alert window"
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
