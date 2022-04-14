import {
  Card,
  Paper,
  CardContent,
  Typography,
  Grid,
  CardHeader,
  List,
  ListItem,
} from "@mui/material";

const DisplayZones = ({ skillData }) => {
  let zoneArr = [];

  /*
  1. pushing the individual zone data as object into an array to help iterate over the zone data to create
  Cards and also to give conditional card header and border color between Technical and Personal skills. 
  
  2. Replaced the blank space from front and end of the data along with the dots to create Li */

  skillData &&
    skillData.map((doc) =>
      zoneArr.push(
        {
          head: "Zone 1",
          data: doc.fields.Zone1.replace(/^\s+|\s+$/g, "").replace(/\.$/, ""),
          bgColor:
            doc.fields["Single Select"] == "Tech Skills"
              ? "#FF9D85"
              : "#8D9DB9",
          borderColor:
            doc.fields["Single Select"] == "Tech Skills"
              ? "#FF5C35"
              : "#12284C",
        },
        {
          head: "Zone 2",
          data: doc.fields.Zone2.replace(/^\s+|\s+$/g, "").replace(/\.$/, ""),
          bgColor:
            doc.fields["Single Select"] == "Tech Skills"
              ? "#FF8D70"
              : "#7488AA",
          borderColor:
            doc.fields["Single Select"] == "Tech Skills"
              ? "#FF5C35"
              : "#12284C",
        },
        {
          head: "Zone 3",
          data: doc.fields.Zone3.replace(/^\s+|\s+$/g, "").replace(/\.$/, ""),
          bgColor:
            doc.fields["Single Select"] == "Tech Skills"
              ? "#FF7C5C"
              : "#506891",
          borderColor:
            doc.fields["Single Select"] == "Tech Skills"
              ? "#FF5C35"
              : "#12284C",
        },
        {
          head: "Zone 4",
          data: doc.fields.Zone4.replace(/^\s+|\s+$/g, "").replace(/\.$/, ""),
          bgColor:
            doc.fields["Single Select"] == "Tech Skills"
              ? "#FA6F4C"
              : "#324A71",
          borderColor:
            doc.fields["Single Select"] == "Tech Skills"
              ? "#FF5C35"
              : "#12284C",
        },
        {
          head: "Zone 5",
          data: doc.fields.Zone5.replace(/^\s+|\s+$/g, "").replace(/\.$/, ""),
          bgColor:
            doc.fields["Single Select"] == "Tech Skills"
              ? "#FF5C35"
              : "#12284C",
          borderColor:
            doc.fields["Single Select"] == "Tech Skills"
              ? "#FF5C35"
              : "#12284C",
        }
      )
    );

  return (
    <>
      {skillData && skillData.map((doc) => (
      
        <Grid item container role="grid" p={0} marginBottom={3} key={doc.id}>
          <Grid item xs={12} pl={0}>
            <Typography
              variant="h5"
              sx={{
                textAlign: "center",
              }}
            >
              {doc.fields.Name} 
            </Typography>
          </Grid>
          <Grid item xs={12} pt={4}>
            <Typography variant="body1">
              {doc.fields.Description.replace(/^\s+|\s+$/g, "")}
            </Typography>
          </Grid>
          <Grid
            item
            container
            rowSpacing={2}
            columnSpacing={{ xs: 1, sm: 2, md: 2 }}
            p={2}
            pt={4}
            m={0}
          >
            {zoneArr.map((doc) => (
              <Grid item xs={12} md={4} key={doc.head} sx={{}} >
                <Card
                  sx={{
                    border: "1px solid",
                    borderColor: doc.borderColor,
                    borderRadius: "0.25rem",
                    margin: "0 auto",
                    height: "100%",
                  
                  }}
                >
                  <CardHeader
                    sx={{
                      backgroundColor: doc.bgColor,
                      color: "#fff",
                      padding: "10px",
                    }}
                   variant='h5'
                    title={doc.head}
                  />
                  <CardContent
                    sx={{
                      border: "1px solid",
                      borderColor: doc.borderColor,
                      borderRadius: "0.25rem",
                      margin: "0 auto",
                      height: "100%",
                    }}
                  >
                    <Typography variant="body1">
                    <List sx={{ width: "100%" }} aria-label="zone data ul">
                      {doc.data.split(".").map((li, i) => (
                        <ListItem
                          aria-label="zone data li"
                          key={i * 3}
                          sx={{ display: "list-item" }}
                        >
                          {li}
                        
                        </ListItem>
                      ))}
                    </List>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
        
      ))}
    </>
  );
};

export default DisplayZones;
