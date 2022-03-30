import React from "react";
import Image from "next/image";
import {
  CssBaseline,
  Grid,
  Tabs,
  Typography,
  Tab,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const quote =
  "For an idea to go from your head into the computer it MUST go through someone else's hands.";

//all content from pair programming page inside one object
const pairProgrammingInfo = [
  {
    label: "What is pair programming?",
    header: "What is pair programming?",
    content: [
      "Agile software development technique",
      "Two programmers work together to solve the same coding problem",
      "“Driver” writes the code while “Observer” reviews code as it's typed, switching roles frequently",
    ],
    img: "/img/pairProgrImages/1.png",
  },
  {
    label: "Our goals with pair programming",
    header: "Our goals with pair programming",
    content: [
      "Better code",
      "Fewer bugs and mistakes",
      "Team collaboration and understanding of what we are building/working on together",
      "Learn from each other",
    ],
    quote: quote,
  },
  {
    label: "Some tools you could use",
    header: "Some tools you could use",
    content: [
      "Zoom/Slack - regular screen-sharing",
      "Visual Studio Live Share - easiest with VS IDE, but you can also use VS Web",
      "Codepen - copy-paste files to collaborate one",
      "Sublime Remote - both people must have Sublime IDE",
      "Code Sandbox - import Github URL and work on files",
    ],
    img: "/img/pairProgrImages/2.png",
  },
  {
    label: "The process each week",
    header: "The process each week",
    content: [
      "01: Pairs among project teammates are selected using a random round robin generator. In the case of an uneven number of teammates, one person will not be pair programming each week",
      "02: Meet twice during the week, for at least 3 hours each session. You may choose to work either on one of your tickets for both sessions, or do one ticket per session",
      "03: Additionally, if one person has been assigned a PR on Github, you should pair peer-review it on Friday",
    ],
  },
  {
    label: "A pair programming session",
    header: "A pair programming session...",
    content: [
      {
        subHeader: "01 Plan & Prepare",
        subcontent: [
          "Choose tickets to work on",
          "Write or comment out a brief plan of attack",
          "Discuss plan as a team",
        ],
      },
      {
        subHeader: "02 Program",
        subcontent: [
          "Driver codes and talks through what is being coded",
          "Observer looks out for mistakes, asks questions, and stops the group if further conversation or thought is needed ",
        ],
      },
    ],
  },
  {
    label: "Important to know",
    header: `And most importantly.... Have a learning mindset`,
    content: [
      "If you are more experienced, encourage your partner to ask questions and come up with more solutions",
      "If you are less experienced don't hesitate to stop to ask lots of questions",
      "Be patient",
      "Never be discouraging or derisive to your partner",
      "Feel free to change it up more frequently and do 30 min driver/observer sessions",
    ],
    img: "/img/pairProgrImages/4.png",
  },
  {
    label: "Feedback",
    header: "Feedback",
    content: [
      "This is going to be a constantly-evolving process. In order to make it the best it can be, we ask that you fill out a feedback form every week letting us know how your experience was.",
      "Link to the form",
    ],
    img: "/img/pairProgrImages/3.png",
  },
];

//create a Grid container to render content of tab (body)
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <Grid
      item
      
      xs={8}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={1}>{value === index && <Grid container role="testing">{children}</Grid>}</Box>
    </Grid>
  );
}

//for accessibility porpose add 'id' and 'aria-controls' to each tab
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
//function that takes an item/string and returns an html element,
//if item is an object - it maps througth this object
const renderingFunction = (item, index) => {
  if (item.subHeader) {
    const subHeader = <h3 key={item.subHeader}>{item.subHeader}</h3>;
    let ul = [];
    item.subcontent.map((content) => {
      ul.push(<ListItem key={content}><ListItemText primary={content} /></ListItem>);
    });
    return (
      <>
        {subHeader} <List key={subHeader}>{ul}</List>
      </>
    );
  } else {
    return <ListItem key={item}><ListItemText primary={item} /></ListItem>;
  }
};

const PairProgrammingPage = () => {
  const [value, setValue] = React.useState(0);

  //functon to set an active tab
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <CssBaseline />
      <Typography variant="h2" align="center" gutterBottom>
        A guide to Pair Programming
      </Typography>
      <Grid container role="container for all camponents" spacing={1}>
        <Grid item xs={4} role="container for tabs">
          <Tabs
            role="tabs"
            value={value}
            onChange={handleChange}
            aria-label="tabs to navigate through the page"
            orientation="vertical"
            sx={{ height: "100%" }} //do I need height here?
          >
            {pairProgrammingInfo.map((item, index) => (
              <Tab
                role="tab"
                key={index}
                sx={{ backgroundColor: "#ff5c35", opacity: 0.9, my: 1 }}
                label={item.label}
                {...a11yProps(index)}
              ></Tab>
            ))}
          </Tabs>
        </Grid>

        {pairProgrammingInfo.map((item, index) => (
          
            <TabPanel value={value} index={index} key={-index}>
              <Grid role="container for text" item xs={9}>
                <Typography variant="h4" key={item.header}>
                  {item.header}
                </Typography>
                <List key={`${index}ul`}>
                  {item.content.map((p, index) => {
                    return renderingFunction(p, index);
                  })}
                </List>
              </Grid>
              {/* check if object item has an key 'image' and render an image */}
              <Grid role="container for img" item xs={3}>
                {item.img && (
                  <Image
                    alt=""
                    width={200}
                    height={100}
                    key={`${index}image`}
                    src={item.img}
                  />
                )}
              </Grid>
              {/* check if object item has a 'quote' key and render it */}
              {item.quote && (
                <Typography
                  sx={{ fontFamily: "cursive" }}
                  variant="caption text"
                  component="span"
                >
                  {item.quote}
                </Typography>
              )}
            </TabPanel>
          
        ))}
      </Grid>
    </>
  );
};

export default PairProgrammingPage;
