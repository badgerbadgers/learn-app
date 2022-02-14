import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

function MediaCards() {
  return (
    <Card item xs={12} sm={3} md={6}>
      <CardContent>
        <CardMedia
          component="iframe"
          image="https://www.youtube.com/embed/muuK4SpRR5M"
          height="auto"
          controls 
        />
        <Typography sx={{ fontSize: 12 }} color="text.secondary">
        Source:
        </Typography>
      </CardContent>
    </Card>
  );
}

export default MediaCards;