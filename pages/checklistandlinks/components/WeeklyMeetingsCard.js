import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import WifiCalling3Icon from "@mui/icons-material/WifiCalling3";
import DOMPurify from "isomorphic-dompurify";

const weeklymeetingInfo = [
  "Weekly Café- Tuesdays at 12:00pm ET. Time occasionally varies depending on the speaker. <a href='https://zoom.us/' target=_blank >Zoom link here</a>.",
  "Skill-IT Workshops- Fridays at 12:00pm ET <a href='https://airtable.com/shruhvUMkELkgUUhI/tblDZrxU8LJyTwmSt?date=undefined&mode=undefined' target=_blank >see calendar here</a>",
  "<a href='https://docs.google.com/document/d/1L4ocxHJH9L5ED2_qcQux6qx3nuuo9L3oMNhQls9-BN4/edit' target=_blank >Apprentice Orientation document</a> ",
  "<a href='https://docs.google.com/document/d/1oyrEq1NnbUTSYWopDcj76vazbJSOOx6Hszd__bCd858/edit' target=_blank >2022 CTD Holidays</a>",
];

const WeeklyMeetingsCard = () => {

  const sanitize = DOMPurify.sanitize;

  return (
    <Grid item xs={12} md={6} pb={1} mt={-1}>
      <Card
        sx={{
          height: "100%",
          width: "100%",
          position: "relative",
          margin: "0 auto",
          backgroundColor: "background.ctdcard",
        }}
      >
        <CardHeader
          action={<WifiCalling3Icon />}
          title="Don&apos;t Forget! Weekly meetings"
          sx={{
            minHeight: "80px",
            backgroundColor: "primary.greenCard",
            opacity: 0.9,
            color: "primary.contrastText",
          }}
        ></CardHeader>
        <CardContent>
          <List>
            {weeklymeetingInfo.map((item) => (
              <ListItem key={item}>
                <ListItemText
                  primary={
                    <div
                      dangerouslySetInnerHTML={{
                        __html: sanitize(item),
                      }}
                    ></div>
                  }
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Grid>
  );
};
export default WeeklyMeetingsCard;