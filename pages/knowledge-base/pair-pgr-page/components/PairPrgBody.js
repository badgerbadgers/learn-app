import Image from "next/image";
import TabPanel from "./TabPanel";
import styles from "../../../../styles/Knowledge.module.css";
import { Grid, Typography, List, ListItem, ListItemText } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

//function that takes an item/string and returns an html element,
//if item is an object - it maps througth this object
const renderingFunction = (item) => {
  if (item.subHeader) {
    const subHeader = <Typography variant="h6">{item.subHeader}</Typography>;
    let listOfItems = item.subcontent.map((content) => {
      return (
        <ListItem key={content}>
          <ListItemText primary={content} />
        </ListItem>
      );
    });
    return (
      <div role="test" key={item.subHeader.slice(0, 8)}>
        {subHeader}
        <List>{listOfItems}</List>
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
  const matches = useMediaQuery("(min-width:900px)");
  return (
    <>
      {pairProgrammingInfo &&
        pairProgrammingInfo.map((item, index) => (
          <TabPanel value={value} index={index} key={item.header}>
            <Typography
              sx={{
                backgroundColor: "#FF9D85",
                color: "white",
                fontFamily: "gothamRoundedMedium",
                lineHeight: "3.6rem",
              }}
              variant="h4"
            >
              {item.header}
            </Typography>
            <List>
              {item.content.map((p) => {
                return renderingFunction(p);
              })}
            </List>
            {/* check if object item has an key 'image' and render an image */}
            {item.img && (
              <div className={styles.ppImageBG}>
                <Image
                  alt=""
                  width={220}
                  height={150}
                  src={item.img}
                  layout={matches && "responsive"}
                />
              </div>
            )}

            {/* check if object item has a 'quote' key and render it */}
            {item.quote && (
              <Grid item sx={{ mt: 3 }}>
                <Typography
                  sx={{ fontFamily: "cursive", fontWeight: "bold", m: "1rem" }}
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
