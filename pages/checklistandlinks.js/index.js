import {
  Container,
  Paper,
  Grid,
  Card,
  Typography,
  CardHeader,
  CardContent,
  Checkbox,
  FormControlLabel,
  Box
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import PrivateLayout from "../../components/PrivateLayout";


import DOMPurify from 'isomorphic-dompurify';
export default function ChecklistPage() {
  //use a query to adjust mobile view
  const matches = useMediaQuery("(min-width:600px)");
  return (
    //layout
    <Container sx={{ textAlign: "center", p: !matches && 1 }}>
      <Paper
        sx={{
          //minWidth: 330,
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
          {/* card starts */}
          <Grid item xs={6} pb={1} mt={-1}>
            <Card
              sx={{
                width: "100%",
                position: "relative",
                marginLeft: matches ? 3 : 0,
                minHeight: "220px",
              }}
            >
              <CardHeader
                title="Check list for new Apprentices"
                sx={{
                  backgroundColor: "primary.main",
                  //opacity: 0.9,
                  color: "primary.contrastText",
                }}
              ></CardHeader>
              <CardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3, textAlign: "left" }}>
                <FormControlLabel control={<Checkbox />} label={<div
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize("Track your hours every day: <a href='https://app.clockify.me/' >Clockify</a>") }}> 
                  </div>} />
                <FormControlLabel label="Request time off using Hrvey" control={<Checkbox />} />{" "}
                <FormControlLabel label="Calendars- Make sure you are subscribed to the Google Calendars for your team (LINK)" control={<Checkbox />} />{" "}
                <FormControlLabel label="Tech Stipend: Tech Stipend Policy // Tech Stipend Request Form" control={<Checkbox />} />{" "}
                <FormControlLabel label="Buying a new computer? Here are the specs you should look for." control={<Checkbox />} />{" "}
                
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

ChecklistPage.getLayout = function getLayout(page) {
  return <PrivateLayout>{page}</PrivateLayout>;
};
