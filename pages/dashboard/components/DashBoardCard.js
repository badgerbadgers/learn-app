import React from "react";
import styles from "../../../styles/Knowledge.module.css";
import {
  Button,
  Link,
  Grid,
  Typography,
  Card,
  CardHeader,
  CardContent,
  CardActions,
} from "@mui/material";

export default function DashBoardCard({ title, text, icon, href }) {
  return (
    <Grid item xs={12} md={6}>
      <Card
        sx={{
        
          minWidth: 280,
          backgroundColor: "#DFE2E8",
          padding: "16px",
          minHeight: 275,
        }}
      >
        {icon}

        <CardHeader title={title}></CardHeader>
        <CardContent>
          <Typography variant="body1">{text}</Typography>
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
