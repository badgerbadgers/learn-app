import * as React from "react";
import CircleIcon from '@mui/icons-material/Circle';
import {
  CardHeader,
  Typography,
  CardContent,
  Card,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
 
} from "@mui/material";

export default function LessonMaterialsCard() {
  return (
    <Card
      elevation={1}
      square
      sx={{
        backgroundColor: "#F4F5F7",mb:"1em"
      }}
    >
      <CardHeader title="Lesson Materials" sx={{ mb: -2 }} />
      <CardContent sx={{ my: -2 }}>
        <Typography variant="body1" component="div" sx={{}}>
          lesson materials intro text
          {/* should links go under actions? */}
          
        </Typography>
        <List >
            <ListItem >
              <ListItemIcon sx={{minWidth:"36px"}}><CircleIcon sx={{ width:"8px"}}/></ListItemIcon>
              <ListItemText primary="Lesson bullet points" />
              </ListItem>
          </List>
          {/* you will have to map through the list Items once we are hooked with airtable */}
      </CardContent>
    </Card>
  );
}
