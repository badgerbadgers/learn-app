import * as React from "react";
import Card from "@mui/material/Card";
import { Button } from "@mui/material";
import { ButtonGroup } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Facebook, LinkedIn, Twitter } from "@mui/icons-material";
import EmailIcon from "@mui/icons-material/Email";
import { Grid } from "@mui/material";
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    background: 'linear-gradient(45deg, #2196F3 30%, #1FF4F1 90%)',
          
  }
}))

function ContactCards() {
  const { container } = useStyles()
  return (
    <Grid container direction="column" align="center" >
      <Grid item>
        <Card variant="outlined" className={container}>
          <CardContent>
            <Typography variant="h5" component="div">
              Firstname Lastname
            </Typography>
            <Typography sx={{ mb: 1.0 }} color="text.secondary">
              Pronouns
            </Typography>
            <Typography variant="h6" component="div">
              Tech Stack
            </Typography>
          </CardContent>
          <ButtonGroup display="flex" spacing={1} justify="center">
            <Button
              startIcon={<Facebook />}
              size="small"
              variant="contained"
              color="primary"
            ></Button>
            <Button
              endIcon={<LinkedIn />}
              size="small"
              variant="contained"
              color="secondary"
            ></Button>
            <Button
              startIcon={<EmailIcon />}
              size="small"
              variant="contained"
              color="primary"
            ></Button>
            <Button
              endIcon={<Twitter />}
              size="small"
              variant="contained"
              color="secondary"
            ></Button>
          </ButtonGroup>
          <Grid item m={2}>
            <Button
              type="submit"
              size="small"
              color="success"
              variant="outlined"
            >
              Download Resume
            </Button>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
}

export default ContactCards;