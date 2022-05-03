import { Container, Paper, Grid } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import PrivateLayout from "../../components/PrivateLayout";

export default function ChecklistPage() {
  //use a query to adjust mobile view
  const matches = useMediaQuery("(min-width:600px)");
  return (
  <Container sx={{ textAlign: "center", p: !matches && 1 }}>
<Paper
      sx={{
        minWidth: 330,
        backgroundColor: "background.dbpaper",
        my: 2,
        mx: "auto",
        p: matches ? 8 : 1,
      }}
    >
      <Grid
        container
        rowSpacing={2}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{ justifyContent: "center" }}
      >
        {'children'} 
      </Grid>
    </Paper>
  </Container>
  );
}

ChecklistPage.getLayout = function getLayout(page) {
  return <PrivateLayout>{page}</PrivateLayout>;
};
