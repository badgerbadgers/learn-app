import React, { useState } from "react";
import MuiAlert from "@mui/material/Alert";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import PsychologyIcon from "@mui/icons-material/Psychology";
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
import { useEffect } from "react";
import DashBoardCardCopm from "../components/dashBoardCardCopm";

export default function DashBoardCard() {
  return (
    <Grid item xs={12} md={6}>
      <Card
        sx={{
          minWidth: 350,
          backgroundColor: "#DFE2E8",
          padding: "16px",
        }}
      >
        <TrackChangesIcon
          color="primary"
          style={{
            fontSize: "38px",
            top: "15px",
            position: "relative",
          }}
        />
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
  );
}
