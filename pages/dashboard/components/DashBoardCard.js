import React, { useState } from "react";
import MuiAlert from "@mui/material/Alert";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import PsychologyIcon from "@mui/icons-material/Psychology";
import styles from "../../../styles/Knowledge.module.css";
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

export default function DashBoardCard({ title, text, icon, href }) {
 
  console.log("icon", icon)
  return (
    <Grid item xs={12} md={6}>
      <Card
        sx={{
          minWidth: 280,
          backgroundColor: "#DFE2E8",
          padding: "16px",
          minHeight: 270
        }}
      >
       {/*  <TrackChangesIcon
          color="primary"
          style={{
            fontSize: "38px",
            top: "15px",
            position: "relative",
          }}
        /> */}
        <div className={styles.icon}>
        {icon}
        </div>
       
        <CardHeader title={title}></CardHeader>
        <CardContent>
          <Typography variant="body1">
           {text}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">
            <Link href={href}>Learn More</Link>
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
