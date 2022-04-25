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

function ResourceCard({ resource }) {
  const classes = useStyles();
  const topic = [resource.fields["Name (from topic)"]];
  const language = [resource.fields["Name (from language)"]];
  const type = [resource.fields.Type];
  // console.log("RESOURCES:", resource);

  const resourcesColorTheme = [
    { key: "docs", color: "#F1C40F" },
    { key: "Other", color: "#E67E22" },
    { key: "concepts", color: "#D35400" },
    { key: "cheatsheet", color: "#8BC34A" },
    { key: "coding", color: "#CDDC39" },
    { key: "exercises", color: "#FFC107" },
  ];

  const bkColor = () => {
    resourcesColorTheme.map((data) => {
      if (data.key === "coding") {
        return data.color;

      }
    })
  }
  //   resourcesColorTheme.map((data) => {
  //     console.log(data);
  //     if (data.key == resource.fields.Type) {
  //       console.log(resource.fields.Type);
  //       console.log(data.key);
  //       return data.color;
  //     }
  //   });
  // };
  console.log(bkColor());

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
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
              >
                {/* Icons to display in NavBar per type item */}
                {type.map((data) => {
                  if (data === "coding") {
                    return <CodeOffOutlined />;
                  } else if (data === "concepts") {
                    return <DeveloperMode />;
                  } else if (data === "exercises") {
                    return <FitnessCenter />;
                  } else if (data === "docs") {
                    return <DescriptionRounded />;
                  } else if (data === "cheatsheet") {
                    return <StyleOutlined />;
                  } else if (data === "Other") {
                    return <CategoryOutlined />;
                  } else {
                    return <AdjustOutlined />;
                  }
                })}
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
            spacing={2}
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
            // component="ul"
          >
            {topic.map((item) => {
              // console.log("ITEM:", item);
              // console.log('Topic:', topic)
              return (
                <div key={resource.id}>
                  <ListItem key={item}>
                    {topic.map((item) => (
                      <Chip
                        key={item}
                        label={item}
                        sx={{ backgroundColor: "#12284C", color: "#FFFFFF" }}
                      />
                    ))}
                  </ListItem>
                </div>
              );
            })}

            {language.map((item) => {
              return (
                <div key={resource.id}>
                  <ListItem key={item}>
                    {language.map((item) => (
                      <Chip
                        key={item}
                        label={item}
                        sx={{ backgroundColor: "#FF5C35", color: "#FFFFFF" }}
                      />
                    ))}
                  </ListItem>
                </div>
              );
            })}
            {/* <Button
              size="small"
              color="primary"
              variant="contained"
              sx={{
                textTransform: "none",
                borderRadius: "30px",
              }}
            >
              {resource.fields["Name (from language)"]}
            </Button> */}
            <Button
              size="small"
              color="secondary"
              // variant="outlined"
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
