import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import useMediaQuery from "@mui/material/useMediaQuery";

const questionsInfo = [
  "Question about your project or code? Ask a teammate, your team’s project manager, or your lead mentor.",
  "Sick or need to request time off? Communicate with Alex Rodriguez, <a href='https://app.slack.com/client/T07EHJ738/D01R8M1S02V/user_profile/U65NVG78F' target=_blank> @Arod </a> on Slack, or <a href='mailto:alex@codethedream.org'>alex@codethedream.org</a>.",
  "Question about the apprenticeship in general, or other issues related to Code the Dream’s programs? Communicate with Lori, <a href='https://app.slack.com/client/T07EHJ738/D024S9SK3CG/user_profile/ULAJMU5CJ' target=_blank> @Lori </a> on Slack, or <a href='mailto:lori@codethedream.org'>lori@codethedream.org</a>.",
  "Address change or stipend/pay/tax question? Communicate with Lucy, <a href='https://app.slack.com/client/T07EHJ738/D037R1LSTTM/user_profile/U01GKHRAN78' target=_blank> @Lucy Martinez </a> on Slack, or <a href='mailto:lucy@codethedream.org'>lucy@codethedream.org</a>."
];

const directoryInfo = [
  "Team Directory – <a href='https://airtable.com/shr0myah6gY1NTbQ3/tbl6BlIjU9xtYPc3h' target=_blank >List view</a>",
  "Team Directory – <a href='https://airtable.com/shrz73FjB1dL0G96b/tbl6BlIjU9xtYPc3h' target=_blank >Gallery view</a>",
  "Need to fill out the Team Directory? <a href='https://airtable.com/shrzddLFtiSBXRE70' target=_blank >Here&apos;s the form</a>.",
  "Need to make a change to your entry? Please contact Lucy, <a href='https://app.slack.com/client/T07EHJ738/D037R1LSTTM/user_profile/U01GKHRAN78' target=_blank> @Lucy Martinez </a>, <a href='mailto:lucy@codethedream.org'>lucy@codethedream.org</a>."

]

const CTDAdminCard = () => {
  const matches = useMediaQuery("(min-width:600px)");
  return (
    <Grid container item xs={12} pb={1} mt={-1}>
      <Card
        sx={{
          height: "100%",
          width: "100%",
          position: "relative",
          margin: "0 auto",
          display: "flex",
          backgroundColor: "background.ctdcard"
        }}
      >
        <Grid container item xs={12}>
          <CardHeader
          action={<AdminPanelSettingsIcon />}
            title="Admin"
            md={12}
            sx={{
              minHeight: "80px",
              backgroundColor: "primary.main",
              opacity: 0.9,
              color: "primary.contrastText",
              flexGrow: "1",
            }}
          ></CardHeader>

          <Grid container item>
            <Grid  item md={6} xs={12}>
              <CardContent sx={{px: 0}}>
                <List>
                  {questionsInfo.map((item) => (
                    <ListItem key={item}>
                      <ListItemText
                        primary={
                          <div
                            dangerouslySetInnerHTML={{
                              __html: item,
                            }}
                          ></div>
                        }
                      />
                     </ListItem>
                  ))}
                </List>
              </CardContent>
            </Grid>

            <Grid item md={6} xs={12}>
              <CardContent>
                <List>
                  {directoryInfo.map((item) => (
                    <ListItem key={item}>
                      <ListItemText
                        primary={
                          <div
                            dangerouslySetInnerHTML={{
                              __html: item,
                            }}
                          ></div>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export default CTDAdminCard;
