import { Grid, Card } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

//create a Grid container to render content of a tab (body)
export default function TabPanel(props) {
  const { children, value, index, ...other } = props;
  
  const matches = useMediaQuery("(min-width:900px)");
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
          py={1}
          mt={-2}
        >
          <Card
            sx={{
              width: "100%",
              position: "relative",
              marginLeft: matches ? 3 : 0,
              minHeight: "220px"
            }}
          >
            {children}
          </Card>
        </Grid>
      )}
    </>
  );
}
