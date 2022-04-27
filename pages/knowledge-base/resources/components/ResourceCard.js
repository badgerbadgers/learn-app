import React from "react";
import Card from "@mui/material/Card";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { Grid, Chip } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActions } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import {
  DeveloperMode,
  CategoryOutlined,
  DescriptionRounded,
  FitnessCenter,
  StyleOutlined,
  CodeOffOutlined,
  AdjustOutlined,
} from "@mui/icons-material";

// Setting the styles on the root element of ResourceCard component
const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 200,
    minHeight: "auto",
  },
}));

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

// Defining the array of objects for resources type, color and icon
const resourcesColorIcon = [
  { key: "docs", color: "#F1C40F", icon: <DescriptionRounded /> },
  { key: "Other", color: "#E67E22", icon: <CategoryOutlined /> },
  { key: "concepts", color: "#D35400", icon: <DeveloperMode /> },
  { key: "cheatsheet", color: "#8BC34A", icon: <StyleOutlined /> },
  { key: "coding", color: "#CDDC39", icon: <CodeOffOutlined /> },
  { key: "exercises", color: "#FFC107", icon: <FitnessCenter /> },
];

function ResourceCard({ resource }) {
  const classes = useStyles();
  const topic = resource.fields["Name (from topic)"];
  const language = resource.fields["Name (from language)"];

  const resourcesNavBarColor = () => {
    // The function will change color based on resource type
    const elColor = resourcesColorIcon.find(
      (elColor) => elColor.key === resource.fields.Type
    );
    if (elColor) {
      return elColor.color;
    } else {
      return "#12284C";
    }
  };
  // The function will display the resources type icon
  const resourcesTypeIcon = () => {
    const elIcon = resourcesColorIcon.find(
      (elIcon) => elIcon.key === resource.fields.Type
    );
    if (elIcon) {
      return elIcon.icon;
    } else {
      return <AdjustOutlined />;
    }
  };

  return (
    <Grid item xs={12} sm={6}>
      <Card
        elevation={15}
        className={classes.root}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardContent sx={{ padding: 0 }}>
          <AppBar
            position="static"
            sx={{ backgroundColor: resourcesNavBarColor() }}
          >
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
              >
                {/* Icons to display in NavBar per type item */}
                {resourcesTypeIcon()}
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                {resource.fields.Type}
              </Typography>
            </Toolbar>
          </AppBar>
          <Typography sx={{ m: 3 }} variant="h6" component="div">
            {resource.fields.Name}
          </Typography>
          <Grid
            direction="row"
            spacing={1}
            size="small"
            sx={{
              display: "flex",
              justifyContent: "start",
              flexWrap: "wrap",
              listStyle: "none",
              p: 0.5,
              ml: 2,
            }}
          >
            {/* Will map the resource type: language */}
            {language &&
              language.map((item) => {
                return (
                  <div key={resource.id}>
                    <ListItem>
                      <Chip
                        variant="outlined"
                        key={item}
                        label={item}
                        sx={{
                          color: "primary.main",
                          borderColor: "primary.main",
                        }}
                      />
                    </ListItem>
                  </div>
                );
              })}
          </Grid>
          <Typography variant="body2" sx={{ m: 3 }} fontFamily="inherit">
            {resource.fields.Description}
          </Typography>
        </CardContent>
        <CardActions sx={{ marginTop: "auto" }}>
          <Stack
            className="stack-chips-link"
            direction="flex"
            spacing={1}
            size="small"
            marginBottom="15px"
            sx={{
              display: "flex",
              width: "100%",
              alignItems: "end",
              justifyContent: "space-between",
              flexWrap: "nowrap",
              listStyle: "none",
              p: 0.5,
              ml: 1,
            }}
          >
            {/* Will map the resource by topic */}
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {topic &&
                topic.map((item) => {
                  return (
                    <div className="chip-for-topic" key={resource.id}>
                      <ListItem>
                        <Chip
                          key={item}
                          label={item}
                          sx={{ backgroundColor: "#12284C", color: "#FFFFFF" }}
                        />
                      </ListItem>
                    </div>
                  );
                })}
            </div>
            {/* The link will allow to access the resource in new tab  */}
            <Button
              size="small"
              color="secondary"
              sx={{ borderRadius: "30px" }}
              href={resource.fields.URL}
              target="_blank"
            >
              Link
            </Button>
          </Stack>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default ResourceCard;
