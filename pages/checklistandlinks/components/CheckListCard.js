import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Checkbox,
  FormControlLabel,
  Box,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

import DOMPurify from 'isomorphic-dompurify';

const checkItemsInfo = [
  "Track your hours every day: <a href='https://clockify.me/' target=_blank >Clockify</a>",
  "Request time off using <a href='https://www.hrvey.com/requests/new' target=_blank>Hrvey</a>",
  "Calendars - Make sure you are subscribed to the Google Calendars for your team",
  "Tech Stipend:<a href='https://docs.google.com/document/d/1IBj-5i_p7uEGZoe-BBUfwyGsggEok39VGik_uunWHro/edit' target=_blank>Tech Stipend Policy</a> // <a href='https://docs.google.com/forms/d/e/1FAIpQLSeEJOAWCmqQy2syuUw4RHphSX01KgtNmrGHbVvn7DIquOyFeg/viewform' target=_blank>Tech Stipend Request Form</a>",
  "Buying a new computer? <a href='https://docs.google.com/document/d/1ZMXFrzyrIDTTQOvR4rMK7t9NUnQwa7VKANhFqSCtMVc/edit' target=_blank>Here are the specs you should look for</a>.",
]

const CheckListCard = () => {
  const sanitize = DOMPurify.sanitize
  const matches = useMediaQuery("(min-width:600px)");
  return (
  <Grid item xs={12} md={6} pb={1} mt={-1}>
    <Card
      sx={{
        height: "100%",
        width: "100%",
        position: "relative",
        margin: '0 auto',
       
      }}
    >
      <CardHeader
        title="Check list for new Apprentices"
        sx={{
          minHeight: "80px",
          backgroundColor: "secondary.main",
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
          {checkItemsInfo.map((item) => (
            <FormControlLabel
              //className={styles.checklistLink}
              control={<Checkbox />}
              key={item}
              label={
                <div
                  dangerouslySetInnerHTML={{
                    __html: sanitize(item),
                  }}
                ></div>
              }
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  </Grid>
  )
};

export default CheckListCard;
