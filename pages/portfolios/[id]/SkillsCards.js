import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';

export default function SkillsCards() {
  return (
    <Card sx={{ minWidth: 345 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Skills
        </Typography>
        <Grid sx={{display: `flex`, justifyContent: `space-between`}}>
          <Typography variant="body2">
            JavaScript          
          </Typography>
          <Typography variant="body2">
            Node.js          
          </Typography>
          <Typography variant="body2">
            React          
          </Typography>
          <Typography variant="body2">
            Next.js          
          </Typography>
        </Grid>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}