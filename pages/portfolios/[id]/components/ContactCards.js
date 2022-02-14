import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { Button } from '@mui/material';
import { ButtonGroup } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Facebook, LinkedIn, Twitter } from '@mui/icons-material';
import EmailIcon from '@mui/icons-material/Email';
import { Grid } from '@mui/material';

const card = (
  <Grid item xs={12} sm={3} md={6}>
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
    <ButtonGroup display="flex" justifyContent="center" spacing={1}>
      <Button
        startIcon={<Facebook />}
        size="small"
        variant="contained"
        color="primary">
      </Button>
      <Button
        endIcon={<LinkedIn />}
        size="small"
        variant="contained"
        color="secondary">
      </Button>
      <Button
        startIcon={<EmailIcon />}
        size="small"
        variant="contained"
        color="primary">
      </Button>
      <Button
        endIcon={<Twitter />}
        size="small"
        variant="contained"
        color="secondary">
      </Button>
    </ButtonGroup>
    <CardActions>
      <Box>
        <Button
          type="submit"
          size="small"
          color="success"
          variant="outlined"
        >
          Dowload Resume
        </Button>
      </Box>
    </CardActions>
  </Grid>
);

function ContactCards() {
  return (
    <Box item xs={12} sm={3} md={6}>
      <Card variant="outlined" >{card}</Card>
    </Box>
  );
}

export default ContactCards;