import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardHeader } from "@mui/material";
// import {globalStyles} from "../../../styles/globals.css"

export default function AssignmentCard() {
  return (
    <Card
      elevation={1}
      square
      sx={{
        backgroundColor: "#F4F5F7",
      }}
    >
      <CardHeader title="Assignments" subheader={<div>Date</div>} />

      <CardContent>
        <Typography
          variant="h6"
          // sx={{ fontWeight: "500", fontfamily: "gothamRoundedMedium" }}
        >
          Coding Assignment
        </Typography>
        <CardActions>
          <Button size="small" sx={{ color: "#338AAF" }}>
            Coding Assignment Link
          </Button>
          {/* where does link go? */}
        </CardActions>
        <Typography variant="h6">Mindset Assignment</Typography>
        <Typography variant="body1">Mindset Instructions</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          size="small"
          sx={{ backgroundColor: "#6BDF77" }}
        >
          Submit Assignment
        </Button>
      </CardActions>
    </Card>
  );
}
