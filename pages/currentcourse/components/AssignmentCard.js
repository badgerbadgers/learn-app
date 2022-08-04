import * as React from "react";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Card from "@mui/material/Card";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";

export default function AssignmentCard({ mindset, assignments, submit }) {
  console.log(assignments);
  return (
    <Card
      elevation={1}
      square
      sx={{
        backgroundColor: "#F4F5F7",
      }}
    >
      <CardHeader title="Assignments" subheader={<div>Due Date:</div>} />

      <CardContent>
        <Typography
          variant="h6"
          // sx={{ fontWeight: "500", fontfamily: "gothamRoundedMedium" }}
        >
          Coding Assignment
        </Typography>

        <CardActions>
          {assignments.map((assignment) => {
            return (
              <Box key={assignments.assignment_title}>
                <Link
                  href={assignment.link.url}
                  size="small"
                  sx={{ textDecoration: "none", color: "#338AAF" }}
                >
                  <Typography sx={{textTransform:"capitalize"}}>{assignment.assignment_title}</Typography>
                </Link>
              </Box>
            );
          })}
        </CardActions>

        <Typography variant="h6">Mindset Assignment</Typography>
        <Typography variant="body1">{mindset}</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          size="small"
          sx={{ backgroundColor: "#6BDF77" }}
          href={submit}
          aria-label="submit assignment button"
        >
          Submit Assignment
        </Button>
      </CardActions>
    </Card>
  );
}
