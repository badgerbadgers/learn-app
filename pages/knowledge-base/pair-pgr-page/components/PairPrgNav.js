import { Grid, Tabs, Tab } from "@mui/material";
import { useTheme } from "@emotion/react";

//for accessibility porpose adds unique 'id' and 'aria-controls' to each tab
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const PairPrgNav = ({ value, handleActiveTab, pairProgrammingInfo }) => {

  const {
    palette: { primary },
  } = useTheme();

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
                  backgroundColor: primary.main,
                  opacity: 0.9,
                  my: 1,
                  color: primary.contrastText,
                  maxWidth: 900,
                  border: `1px ${primary.main} solid`,
                  "&.Mui-selected": {
                    color: "#12284C",
                    backgroundColor: "white",
                    border: `1px ${primary.main} solid`,
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
