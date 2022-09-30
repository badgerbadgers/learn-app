import * as React from "react";
import CircleIcon from "@mui/icons-material/Circle";
import CardHeader from "@mui/material/CardHeader";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

export default function LearningObjectivesCard({ objectives }) {
  return (
    <>
      <Card
        elevation={1}
        square
        sx={{
          backgroundColor: "#F4F5F7",
          mb: "2em",
          padding:"1em",
          boxShadow: "none" 
        }}
      >
        <CardHeader sx={{ mb: -3 }} title="Learning Objectives" />
        <CardContent sx={{ my: -2 }}>
          <List>
            {objectives.map((objective) => {
              return (
                <ListItem key={objective} sx={{py:"0"}}>
                  <ListItemIcon sx={{ minWidth: "36px" }}>
                    <CircleIcon sx={{ width: "8px" }} />
                  </ListItemIcon>
                  <ListItemText sx={{ display: "block" }}>
                    {objective}
                  </ListItemText>
                </ListItem>
              );
            })}
          </List>
        </CardContent>
      </Card>
    </>
  );
}
