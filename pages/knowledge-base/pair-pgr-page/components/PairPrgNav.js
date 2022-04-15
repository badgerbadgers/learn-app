import { Grid, Tabs, Tab } from "@mui/material";

//for accessibility porpose adds unique 'id' and 'aria-controls' to each tab
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const PairPrgNav = ({ value, handleActiveTab, pairProgrammingInfo }) => {
  return (
    <>
      {pairProgrammingInfo && (
        <Grid item xs={12} p={0}>
          <Tabs
            value={value}
            onChange={handleActiveTab}
            aria-label="tabs to navigate through the page"
            orientation="vertical"
          >
            {pairProgrammingInfo.map((item, index) => (
              <Tab
                key={item.label}
                sx={{
                  backgroundColor: "#ff5c35",
                  opacity: 0.9,
                  my: 1,
                  maxWidth: 900,
                  color: "white",
                  "&.Mui-selected": {
                    color: '#12284C',
                    backgroundColor: "white",
                    border: '1px orange solid'
                  }
                }}
                label={item.label}
                {...a11yProps(index)}
              ></Tab>
            ))}
          </Tabs>
        </Grid>
      )}
    </>
  );
};
export default PairPrgNav;
