import * as React from "react";
import CircleIcon from "@mui/icons-material/Circle";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Link from "@mui/material/Link";

export default function LessonMaterialsCard({ materials }) {
  return (
    <Card
      elevation={1}
      square
      sx={{
        backgroundColor:"background.lessonCard",
        mb: "2em",
        padding:"1em",
        boxShadow: "none" 
      }}
    >
      <CardHeader title="Lesson Materials" sx={{ mb: -2 }} />
      <CardContent sx={{ my: -2 }}>
        <Typography variant="body1" component="div">
          Go to each link in this list and read through the content on that
          page. If there are links you are redirected to as you read/work
          through the content, follow those links as well and read the content
          there also.
        </Typography>
        <List>
          {materials.map((material) => {
            return (
              <ListItem key={material._id} sx={{py:"0"}}>
                <ListItemIcon  sx={{ minWidth: "36px" }}>
                  <CircleIcon  sx={{ width: "8px" }} />
                </ListItemIcon>
                <Link
                  target="_blank"
                  href={material.url}
                  sx={{ textDecoration: "none", color: "#338AAF" }}
                >
                  <ListItemText sx={{ textTransform: "capitalize" }}>
                    {material.materials_title}
                  </ListItemText>
                </Link>
              </ListItem>
            );
          })}
        </List>
      </CardContent>
    </Card>
  );
}
