import { Grid } from "@mui/material";

//create a Grid container to render content of a tab (body)
export default function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <>
      {value === index && (
        <Grid
          key={`gridTab${index}`}
          container
          item
          xs={12}
          hidden={value !== index}
          id={`simple-tabpanel-${index}`}
          aria-labelledby={`simple-tab-${index}`}
          {...other}
          p={1}         
        >
          {children}
        </Grid>
      )}
    </>
  );
}
