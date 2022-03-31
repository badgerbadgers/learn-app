import Image from "next/image";

import {
  Grid,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

//create a Grid container to render content of a tab (body)
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <Grid
    key={`gridTab${index}`}
      item
      xs={12}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={1}  key={`boxTab${index}`}>
        {value === index && (
          <Grid container role="container to render TabPanel"  key={`gridTabcont${index}`}>
            {children}
          </Grid>
        )}
      </Box>
    </Grid>
  );
}

//function that takes an item/string and returns an html element,
//if item is an object - it maps througth this object
const renderingFunction = (item) => {
  if (item.subHeader) {
    const subHeader = (
      <Typography variant="h6" key={item.subHeader}>
        {item.subHeader}
      </Typography>
    );
    let arrayOfStrings = []; //empty array where will be stored each string as a list item to map through it
    item.subcontent.map((content) => {
      arrayOfStrings.push(
        <ListItem key={content}>
          <ListItemText primary={content} />
        </ListItem>
      );
    });
    return (
      <>
        {subHeader} <List key={subHeader}>{arrayOfStrings}</List>
      </>
    );
  } else {
    return (
      <ListItem key={item}>
        <ListItemText primary={item} />
      </ListItem>
    );
  }
};

const PairPrgBody = ({ pairProgrammingInfo, value }) => {
  return (
    <>
      {pairProgrammingInfo.map((item, index) => (
        <TabPanel value={value} index={index} key={-index}>
          <Grid role="container for text" item xs={9} key={`grid${index}`}>
            <Typography variant="h4" key={item.header}>
              {item.header}
            </Typography>
            <List key={`${index}ul`}>
              {item.content.map((p) => {
                return renderingFunction(p);
              })}
            </List>
          </Grid>

          {/* check if object item has an key 'image' and render an image */}
          {item.img && (
            <Grid role="container for img" item xs={3} key={`img${index}`}>
              <Image
                alt=""
                width={220}
                height={150}
                key={`${index}image`}
                src={item.img}
              />
            </Grid>
          )}
          {/* check if object item has a 'quote' key and render it */}
          {item.quote && (
            <Grid role="container for quote" item sx={{ mt: 3 }} key={item.quote}>
              <Typography
                sx={{ fontFamily: "cursive", fontWeight: "bold" }}
                align="center"
                variant="caption text"
                component="span"
              >
                {item.quote}
              </Typography>
            </Grid>
          )}
        </TabPanel>
      ))}
    </>
  );
};

export default PairPrgBody;
