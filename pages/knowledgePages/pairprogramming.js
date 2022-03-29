import React from "react";
import Image from "next/image";
import { CssBaseline, Grid, Tabs, Typography, Tab, Box } from "@mui/material";
import PropTypes from "prop-types";

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
        subLabel: "01 Plan & Prepare",
        subcontent: [
          "Choose tickets to work on",
          "Write or comment out a brief plan of attack",
          "Discuss plan as a team",
        ],
      },
      {
        subLabel: "02 Program",
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
//container to render content of tab
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  /* console.log(children) */
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
      {value === index && (
        <Box sx={{ px: 3 }} role="box">
          {children}
        </Box>
      )}
    </Grid>
  );
}

/* TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  }; */

//for accessibility porpose
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const renderingFunction = (item) => {
  console.log("rendeting from function");
  if (item.subLabel) {
    console.log("sublabel detected");
   return item.subcontent.map((content) => {
      console.log("content", content);

      return <li>{content}</li>;
    });
  } else {
    return <li>{item}</li>;

  }
};

const PairProgrammingPage = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  /*  pairProgrammingInfo.map(item => (
      item.content.map(sub => {
console.log('sub', sub)
          if(sub.subLabel) {
            console.log("it is sublabel")
            console.log(sub)
            sub.subcontent.map(item => (
                console.log(<p>{item}</p>)
            ))
          }
      })
  )) */

  return (
    <>
      <CssBaseline />
      <Typography variant="h2" align="center" gutterBottom>
        A guide to Pair Programming
      </Typography>
      <Grid container>
        <Grid item xs={4}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="tabs to navigate through the page"
            orientation="vertical"
            sx={{ backgroundColor: "#ff5c35", height: "100%" }}
          >
            {pairProgrammingInfo.map((item, index) => (
              <Tab key={index} label={item.label} {...a11yProps(index)}></Tab>
            ))}
          </Tabs>
        </Grid>

        {pairProgrammingInfo.map((item, index) => (
          <>
            <TabPanel value={value} index={index} key={-index}>
              <h2 key={item.header}>{item.header}</h2>
              {/* we want to check if item has sublabels for a content inside content key */}
              {/*  {item.content.map(subItem => (
                subItem.subLabel && <p>{subItem.subLabel}</p>
              ))} */}
              <ul>
                {item.content.map((p, index) => {
                  {/* console.log("p", p);
                  console.log("p.sublable", p.subLabel); */}

                  {
                    /* {p.subLabel ? (p.subcontent.map((item, index)=> {
                    console.log("item", item)
                      return <p key={index}>{item}</p>
                    })) : <li key={p}>{p}</li>} */
                  }
                 
                  return renderingFunction(p);
                  {
                    /* return <li key={p}>{p}</li> */
                  }
                })}
              </ul>
              {/* check if item has an key image and render an image */}
              {item.img && (
                <Image
                  alt=""
                  width={200}
                  height={100}
                  key={`${index}image`}
                  src={item.img}
                />
              )}
              {/* check if item has a quote key and render it */}
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
          </>
        ))}
      </Grid>
    </>
  );
};

export default PairProgrammingPage;
