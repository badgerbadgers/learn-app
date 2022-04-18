import { Grid, Card } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

//create a Grid container to render content of a tab (body)
export default function TabPanel(props) {
  const matches = useMediaQuery("(min-width:900px)");
  console.log(matches);
  const { children, value, index, ...other } = props;
  return (
    <>
      {value === index && (
        <Grid
          role="grid for tabpanel"
          key={`gridTab${index}`}
          container
          item
          xs={12}
          hidden={value !== index}
          id={`simple-tabpanel-${index}`}
          aria-labelledby={`simple-tab-${index}`}
          {...other}
          py={matches ? 1 : 0}
        >
          <Card
            role="card"
            sx={{
              width: "100%",
              position: "relative",
              marginLeft: matches ? 3 : 0,
            
            }}
          >
            {children}
          </Card>
        </Grid>
      )}
    </>
  );
}
