import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

const qnaInfo = [
  
];

const directoryInfo = [
  "Team Directory – List view",
  "Team Directory – Gallery view",
  "Need to fill out the Team Directory? Here`&apsf;`s the form.",
  "Need to make a change to your entry? Please contact Lucy, @Lucy Martinez, lucy@codethedream.org."

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
        }}
      >
        <Grid container item xs={12}>
          <CardHeader
            title="Admin"
            md={12}
            sx={{
              backgroundColor: "primary.main",
              //opacity: 0.9,
              color: "primary.contrastText",
              flexGrow: "1",
            }}
          ></CardHeader>

          <Grid container item>
            <Grid sx={{ width: "500px" }} item sm={6} xs={12}>
              <CardContent>
                <List>
                  {/* {weeklymeetingInfo.map((item) => (
                    <ListItem key={item}>
                      <ListItemText
                        primary={
                          <div
                            dangerouslySetInnerHTML={{
                              __html: item,
                            }}
                          ></div>
                        }
                      /> */}
            {/*         </ListItem>
                  ))} */}
                </List>
              </CardContent>
            </Grid>

            <Grid sx={{ width: "500px" }} item sm={6} xs={12}>
              <CardContent>
                <List>
                  {/* {weeklymeetingInfo.map((item) => (
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
                  ))} */}
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
