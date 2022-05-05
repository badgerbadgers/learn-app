import {
  Card,
  CardContent,
  Typography,
  Grid,
  CardHeader,
  List,
  ListItem,
  useMediaQuery,
} from "@mui/material";


const DisplayZones = ({ skillData }) => {
  let zoneArr = [];

  const isDesktop = useMediaQuery("(min-width:900px)");

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
              ? "zone1.tech"
              : "zone1.personal",
          borderColor:
            doc.fields["Single Select"] == "Tech Skills"
            ? "primary.main"
            : "secondary.main",
        },
        {
          head: "Zone 2",
          data: doc.fields.Zone2.replace(/^\s+|\s+$/g, "").replace(/\.$/, ""),
          bgColor:
            doc.fields["Single Select"] == "Tech Skills"
              ? "zone2.tech"
              : "zone2.personal",
          borderColor:
            doc.fields["Single Select"] == "Tech Skills"
            ? "primary.main"
            : "secondary.main",
        },
        {
          head: "Zone 3",
          data: doc.fields.Zone3.replace(/^\s+|\s+$/g, "").replace(/\.$/, ""),
          bgColor:
            doc.fields["Single Select"] == "Tech Skills"
              ? "zone3.tech"
              : "zone3.personal",
          borderColor:
            doc.fields["Single Select"] == "Tech Skills"
            ? "primary.main"
            : "secondary.main",
        },
        {
          head: "Zone 4",
          data: doc.fields.Zone4.replace(/^\s+|\s+$/g, "").replace(/\.$/, ""),
          bgColor:
            doc.fields["Single Select"] == "Tech Skills"
              ? "zone4.tech"
              : "zone4.personal",
          borderColor:
            doc.fields["Single Select"] == "Tech Skills"
            ? "primary.main"
            : "secondary.main",
        },
        {
          head: "Zone 5",
          data: doc.fields.Zone5.replace(/^\s+|\s+$/g, "").replace(/\.$/, ""),
          bgColor:
            doc.fields["Single Select"] == "Tech Skills"
              ? "primary.main"
              : "secondary.main",
          borderColor:
            doc.fields["Single Select"] == "Tech Skills"
              ? "primary.main"
              : "secondary.main",
        }
      )
    );

  return (
    <>
      {skillData && skillData.map((doc) => (
      
        <Grid item container p={0} marginBottom={3} marginTop={-4} key={doc.id} sx={{ paddingTop: "0", paddingLeft: isDesktop && "16px" }} >
          <Grid
            item
            container
            rowSpacing={2}
            columnSpacing={{ xs: 1, sm: 2, md: 2 }}
            m={0}
          >
            {zoneArr.map((doc) => (
              <Grid item xs={12} md={6} key={doc.head}>
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
                      padding: "10px",
                      color: "secondary.contrastText",
                    }}
                   variant='h5'
                    title={doc.head}
                  />
                  <CardContent
                    sx={{
                      margin: "0 auto",
                      height: "100%",
                      paddingTop: '0'
                    }}
                  >
                    <List sx={{ width: "100%", listStyle:'square', listStylePosition: 'inside'  }} aria-label="zone data ul">
                      {doc.data.split(".").map((li, i) => (
                        <Typography variant="body1" key={i * 3}>
                        <ListItem
                          aria-label="zone data li"
                          
                          sx={{ display: "list-item" }}
                        >      
                          {li}
                          
                        </ListItem>
                        </Typography>
                      ))}
                    </List>
                  
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
