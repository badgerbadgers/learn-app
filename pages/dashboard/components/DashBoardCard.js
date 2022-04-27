import React from "react";
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

export default function DashBoardCard({ title, text, icon, href, style }) {
  return (
    <Grid item xs={12} md={6}>
      <Card
        sx={{
          backgroundColor: "background.card",
          ...style,
        }}
      >
        {icon}

        <CardHeader title={title}></CardHeader>
        <CardContent>
          <Typography variant="body1">{text}</Typography>
        </CardContent>
        <CardActions sx={{ marginTop: "auto", alignSelf: "flex-start" }}>
          <Button size="small">
            <Link
              href={href}
              aria-label="learn more link"
              sx={{ textDecoration: "none" }}
            >
              Learn More
            </Link>
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
