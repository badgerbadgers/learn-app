import { Grid, Tabs, Tab } from "@mui/material";

//for accessibility porpose adds unique 'id' and 'aria-controls' to each tab
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const PairPrgNav = ({ value, handleChange, pairProgrammingInfo }) => {
  return (
    <Grid item xs={12} p={0} role="container for tabs">
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
            sx={{
              backgroundColor: "#ff5c35",
              opacity: 0.9,
              my: 1,
              maxWidth: 900,
              color: "white",
            }}
            label={item.label}
            {...a11yProps(index)}
          ></Tab>
        ))}
      </Tabs>
    </Grid>
  );
};
export default PairPrgNav;
