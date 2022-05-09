import styles from "../../../styles/Knowledge.module.css";
import { Container, Paper, Grid } from "@mui/material";

const CheckListLayout = ({ matches, children }) => {
  return (
    <Container
      role="container"
      className={styles.checklistLink}
      sx={{ textAlign: "center", p: !matches && 1 , mb: 4}}
    >
      <Paper
        sx={{
          backgroundColor: "background.dbpaper",
          p: matches ? 8 : 2,
        }}
      >
        <Grid
          container
          rowSpacing={2}
          m={0}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          sx={{ justifyContent: "center" }}
        >
          {children}
        </Grid>
      </Paper>
    </Container>
  );
};

export default CheckListLayout;
