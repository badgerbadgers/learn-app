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
    if (resource) {
      const elColor = resourcesColorIcon.find(
        (elColor) => elColor.key === resource.fields.Type
      );
      if (elColor) {
        return elColor.color;
      } else {
        return "#12284C";
      }
    }
  };

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
          <Typography variant="body2" color="text.secondary" sx={{ m: 3 }}>
            {resource.fields.Description}
          </Typography>
        </CardContent>
        <CardActions sx={{ marginTop: "auto" }}>
          <Stack
            direction="row"
            spacing={1}
            size="small"
            marginBottom="15px"
            sx={{
              display: "flex",
              justifyContent: "start",
              flexWrap: "wrap",
              listStyle: "none",
              p: 0.5,
              ml: 1,
            }}
          >
            {topic &&
              topic.map((item) => {
                return (
                  <div key={resource.id}>
                    <ListItem key={item}>
                      <Chip
                        key={item}
                        label={item}
                        sx={{ backgroundColor: "#12284C", color: "#FFFFFF" }}
                      />
                    </ListItem>
                  </div>
                );
              })}
            {language &&
              language.map((item) => {
                return (
                  <div key={resource.id}>
                    <ListItem key={item}>
                      <Chip
                        key={item}
                        label={item}
                        sx={{ backgroundColor: "#FF5C35", color: "#FFFFFF" }}
                      />
                    </ListItem>
                  </div>
                );
              })}
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
