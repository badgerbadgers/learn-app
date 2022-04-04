import Image from "next/image";
import TabPanel from "./TabPanel";

import { Grid, Typography, List, ListItem, ListItemText } from "@mui/material";

//function that takes an item/string and returns an html element,
//if item is an object - it maps througth this object
const renderingFunction = (item) => {

  if (item.subHeader) {
    const subHeader = (
      <Typography variant="h6" key={item.subHeader}>
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
      <>
        {subHeader}
        <List key={`${item.subHeader.slice(0, 7)}`} role={"list"}>
          {listOfItems}
        </List>
      </>
    );
  } else {
    return (
      <ListItem key={item}>
        <ListItemText key={item.slice(0,8)} primary={item} />
      </ListItem>
    );
  }
};

const PairPrgBody = ({ pairProgrammingInfo, value }) => {
  return (
    <>
      {pairProgrammingInfo.map((item, index) => (
        <TabPanel value={value} index={index.header} key={-index}>
          <Grid item xs={9} key={`grid${index}`}>
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
            <Grid
              role="container for quote"
              item
              sx={{ mt: 3 }}
              key={item.quote}
            >
              <Typography
                sx={{ fontFamily: "cursive", fontWeight: "bold" }}
                align="center"
                variant="caption text"
                component="span"
                key={`${index}quote`}
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
