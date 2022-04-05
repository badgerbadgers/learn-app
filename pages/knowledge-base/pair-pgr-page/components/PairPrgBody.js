import Image from "next/image";
import TabPanel from "./TabPanel";

import { Grid, Typography, List, ListItem, ListItemText } from "@mui/material";

//function that takes an item/string and returns an html element,
//if item is an object - it maps througth this object
const renderingFunction = (item) => {

  if (item.subHeader) {
    const subHeader = (
      <Typography variant="h6" >
        {item.subHeader}
      </Typography>
    );
    let listOfItems = item.subcontent.map((content) => {
      return (
        <ListItem key={content} >
          <ListItemText  primary={content} />
        </ListItem>
      );
    });
    return (
      <div key={item.subHeader.slice(0,8)}>
        {subHeader}
        <List>
          {listOfItems}
        </List>
      </div>
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
        <TabPanel value={value} index={index} key={item.header}>
          <Grid item xs={9} >
            <Typography variant="h4">
              {item.header}
            </Typography>
            <List>
              {item.content.map((p) => {
                return renderingFunction(p);
              })}
            </List>
          </Grid>

          {/* check if object item has an key 'image' and render an image */}
          {item.img && (
            <Grid item xs={3}>
              <Image
                alt=""
                width={220}
                height={150}                
                src={item.img}
              />
            </Grid>
          )}
          {/* check if object item has a 'quote' key and render it */}
          {item.quote && (
            <Grid
              item
              sx={{ mt: 3 }}
            >
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
