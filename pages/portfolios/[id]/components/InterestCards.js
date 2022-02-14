import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function InterestCards() {
  return (
    <Card sx={{ minWidth: 345 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Interest
        </Typography>
        
        <Typography variant="body2">
          well meaning and kindly.          
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}