
import { Paper, Grid } from "@mui/material";

const CardsLayoutDashbrd = ({matches, children}) => {
  
  return (
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
        {children}
      </Grid>
    </Paper>
  );
};

export default CardsLayoutDashbrd;
