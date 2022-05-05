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
  Box,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import PrivateLayout from "../../components/PrivateLayout";
import styles from "../../styles/Knowledge.module.css"

import DOMPurify from "isomorphic-dompurify";

const checkItemsInfo = [
  "Track your hours every day: <a href='https://clockify.me/' target=_blank >Clockify</a>",
  "Request time off using <a href='https://www.hrvey.com/requests/new' target=_blank>Hrvey</a>",
  "Calendars - Make sure you are subscribed to the Google Calendars for your team",
  "Tech Stipend:<a href='https://docs.google.com/document/d/1IBj-5i_p7uEGZoe-BBUfwyGsggEok39VGik_uunWHro/edit' target=_blank>Tech Stipend Policy</a> // <a href='https://docs.google.com/forms/d/e/1FAIpQLSeEJOAWCmqQy2syuUw4RHphSX01KgtNmrGHbVvn7DIquOyFeg/viewform' target=_blank>Tech Stipend Request Form</a>",
  "Buying a new computer? <a href='https://docs.google.com/document/d/1ZMXFrzyrIDTTQOvR4rMK7t9NUnQwa7VKANhFqSCtMVc/edit' target=_blank>Here are the specs you should look for</a>."
]

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
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    ml: 3,
                    textAlign: "left",
                  }}
                >
                {checkItemsInfo.map((item) => 
                   (<FormControlLabel
                   className={styles.checklistLink}
                    control={<Checkbox />}
                    key={item}
                    label={
                      <div
                        dangerouslySetInnerHTML={{
                          __html: 
                            item
                          
                        }}
                      ></div>
                    }
                  />)
                 )}
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
