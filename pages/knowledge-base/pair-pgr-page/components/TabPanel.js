import { Grid } from "@mui/material";

//create a Grid container to render content of a tab (body)
export default function TabPanel(props) {
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

          {value === index && (
            <Grid
              container
              p={1}
              role="container to render TabPanel"
              key={`gridTabcont${index}`}
            >
              {children}
            </Grid>
          )}
        
      </Grid>
    );
  }