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
                  backgroundColor: 'background.button',
                  borderColor: 'background.button',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  opacity: 0.9,
                  my: 1,
                  color: 'primary.contrastText',
                  maxWidth: 900,
                 
                  "&.Mui-selected": {
                    color: "#12284C",
                    backgroundColor: "white",
                    borderColor: 'background.button',
                  },
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
