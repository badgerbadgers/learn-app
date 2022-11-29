import React from "react";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import InputField from "./FormFields/InputField";
import SelectField from "./FormFields/SelectField";

const relationships = [
  {
    value: "Parent/Mother/Father",
    label: "Parent/Mother/Father",
  },
  {
    value: "Sibling/Brother/Sister",
    label: "Sibling/Brother/Sister",
  },
  {
    value: "Spouse/Partner",
    label: "Spouse/Partner",
  },
  {
    value: "Friend",
    label: "Friend",
  },
  {
    value: "Other",
    label: "Other",
  },
];

function EmergencyContacts(props) {
  const {
    formField: {
      emergencyContact1Name,
      emergencyContact1Relationship,
      emergencyContact1Phone,
      emergencyContact2Name,
      emergencyContact2Relationship,
      emergencyContact2Phone,
    },
  } = props;

  return (
    <FormControl>
      <Grid container p={3} justify="space-between">
        <Grid container spacing={2} justify="space-between">
          <Grid item xs={12} sm={12} width="100%">
            <Typography variant="body1" gutterBottom>
              <strong>Person 1: </strong>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} width="100%">
            <InputField
              name={emergencyContact1Name.name}
              label={emergencyContact1Name.label}
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6} width="100%">
            <SelectField
              name={emergencyContact1Relationship.name}
              label={emergencyContact1Relationship.label}
              data={relationships}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={12} width="100%">
            <InputField
              name={emergencyContact1Phone.name}
              label={emergencyContact1Phone.label}
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={12} width="100%">
            <Typography variant="body1" gutterBottom>
              <strong>Person 2: </strong>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} width="100%">
            <InputField
              name={emergencyContact2Name.name}
              label={emergencyContact2Name.label}
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6} width="100%">
            <SelectField
              name={emergencyContact2Relationship.name}
              label={emergencyContact2Relationship.label}
              data={relationships}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={12} width="100%">
            <InputField
              name={emergencyContact2Phone.name}
              label={emergencyContact2Phone.label}
              variant="outlined"
              fullWidth
            />
          </Grid>
        </Grid>
      </Grid>
    </FormControl>
  );
}

export default EmergencyContacts;
