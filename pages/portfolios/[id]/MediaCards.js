import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

function MediaCards() {
  
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <CardMedia
          component="video"
          src="../video/video-2.mp4"
          height="280"
          alt="Kodayi Temple"
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