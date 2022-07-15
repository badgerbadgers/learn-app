import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CircleIcon from '@mui/icons-material/Circle';
import { CardHeader,List,
  ListItem,
  ListItemIcon,
  ListItemText, } from "@mui/material";

export default function LearningObjectivesCard() {
  return (
    <>

      <Card
        elevation={1}
        square
        
        sx={{
          backgroundColor: "#F4F5F7",mb:"1em"
        }}
      >
        <CardHeader sx={{ mb: -3 }} title="Learning Objectives" />
        <CardContent sx={{ my: -2 }}>
          <Typography variant="body2"></Typography>
          <List >
            <ListItem >
              <ListItemIcon sx={{minWidth:"36px"}}><CircleIcon sx={{ width:"8px"}}/></ListItemIcon>
              <ListItemText primary="Lesson bullet points" />
              </ListItem>
          </List>
        </CardContent>
      </Card>
    </>
  );
}
