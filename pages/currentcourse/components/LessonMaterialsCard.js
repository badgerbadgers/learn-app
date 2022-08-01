import * as React from "react";
import CircleIcon from '@mui/icons-material/Circle';
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import  CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Link from '@mui/material/Link'; 

export default function LessonMaterialsCard({materials}) {
  console.log(materials)
  return (
    <Card
      elevation={1}
      square
      sx={{
        backgroundColor: "#F4F5F7",
        mb: "1em",
      }}
    >
      <CardHeader title="Lesson Materials" sx={{ mb: -2 }} />
      <CardContent sx={{ my: -2 }}>
        <Typography variant="body1" component="div" sx={{}}>
          lesson materials intro text
          {/* should links go under actions? */}
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon sx={{ minWidth: "36px" }}>
              <CircleIcon sx={{ width: "8px" }} />
            </ListItemIcon>
            <div>
              {materials.map((material) => {
                return (
                  <div key={material.url}>
                    <Link href={material.url} sx={{textDecoration:"none", color: "#338AAF" }}>
                      <ListItemText>{material.materials_title}</ListItemText>
                    </Link>
                  </div>
                );
              })}
            </div>
          </ListItem>
        </List>
        {/* you will have to map through the list Items once we are hooked with airtable */}
      </CardContent>
    </Card>
  );
}
