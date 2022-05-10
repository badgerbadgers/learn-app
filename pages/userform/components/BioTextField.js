import React, {useState} from "react";
import { Typography, Grid, TextField } from "@mui/material";

const BioTextField = ({bio}) => {
    const [bioInput, setBioInput] = useState(bio)

  return (
    <Grid item xs={12}>
      <Typography variant="body1" mt={2} gutterBottom>
        <strong>Summary: </strong>
      </Typography>
      <TextField
        placeholder="Tell us about yourself, why you are a software developer, and what your goals are in the next 3-5 years"
        fullWidth
        name="bio"
        multiline
        required
        //rows={2}
        maxRows={2}
        aria-label="bio text field"
        label='Tell us about yourself...'
        inputProps={{ maxLength: 220 }}
        value={bioInput}
        onChange={(e)=>setBioInput(e.target.value)}
      ></TextField>
    </Grid>
  );
};

export default BioTextField;
