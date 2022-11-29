import React, { useContext } from "react";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputField from "./FormFields/InputField";

function PersonalInfo(props) {
  const {
    formField: { firstName, lastName, email, gitHub, phone },
  } = props;

  return (
    <FormControl>
      <Grid container p={3} justify="space-between">
        <Grid container spacing={2} justify="space-between">
          <Grid item xs={12} sm={6} width="100%">
            <InputField
              name={firstName.name}
              label={firstName.label}
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6} width="100%">
            <InputField
              name={lastName.name}
              label={lastName.label}
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6} width="100%">
            <InputField
              name={email.name}
              label={email.label}
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6} width="100%">
            <InputField name={gitHub.name} label={gitHub.label} fullWidth />
          </Grid>

          <Grid item xs={12} sm={12} width="100%">
            <InputField name={phone.name} label={phone.label} fullWidth />
          </Grid>
        </Grid>
      </Grid>
    </FormControl>
  );
}

export default PersonalInfo;
