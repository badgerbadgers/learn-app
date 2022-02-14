import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import { CardMedia } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ButtonGroup } from '@mui/material';
import { Facebook } from '@mui/icons-material';
import { Twitter } from '@mui/icons-material';
import { Grid } from '@mui/material';

const card = (
  <React.Fragment>
    <CardContent>
      {/* <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
        Code the Dream Logo
      </Typography> */}
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
    <Grid className='button-group'>
      <ButtonGroup>
        <Button
          startIcon={<Facebook />}
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
        <Button
          startIcon={<Facebook />}
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
    </Grid>
    <CardActions>
      <Button
        type="submit"
        size="small"
        variant="contained"
        color="primary"
      >
        Dowload Resume
      </Button>
    </CardActions>
  </React.Fragment>
);

function ContactCards() {
  return (
    <Box sx={{ minWidth: 345 }}>
      <Card variant="outlined" >{card}</Card>
    </Box>
  );
}

export default ContactCards;