import * as React from 'react';
import Card from '@mui/material/Card';
import { Grid } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function PreviousIndustryCards() {
  return (
    <Card sx={{ minWidth: 345 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Previous Industry
        </Typography>
        <Grid sx={{display: `flex`, justifyContent: `space-between`}}>
          <Typography variant="body2">
            Manufacture          
          </Typography>
          <Typography variant="body2">
            Jun 2018 - Dec 2021          
          </Typography>
        </Grid>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}