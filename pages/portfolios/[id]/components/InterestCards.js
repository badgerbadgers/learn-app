import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    background: 'linear-gradient(45deg, #2196F3 30%, #1FF4F1 90%)',
          
  }
}))

export default function InterestCards() {
  const { container } = useStyles()
  return (
    <Card item xs={12} sm={6} lg={3} className={container}>
      <CardContent>
        <Typography variant="h5" component="div">
          Interest
        </Typography>

        <Typography variant="body2">Fishing.</Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}