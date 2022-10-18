import React, { useContext } from "react";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import InputField from "./FormFields/InputField";
import SelectField from "./FormFields/SelectField";
import { store } from "../../../store";

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
  // Updating user info data through the global state provider
  const { state, dispatch } = useContext(store);
  const { userInfoData } = state;
  function updateUserInfoData(key, value) {
    dispatch({
      type: "UPDATE_PERSONAL_DETAILS",
      payload: { ...userInfoData, [key]: value },
    });
  }

  const {
    formField: {
      emergency_contact_1_name,
      emergency_contact_1_relationship,
      emergency_contact_1_phone,
      emergency_contact_2_name,
      emergency_contact_2_relationship,
      emergency_contact_2_phone,
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
              name={emergency_contact_1_name.name}
              label={emergency_contact_1_name.label}
              // value={userInfoData.emergency_contact_1_name}
              // onChange={(e) => updateUserInfoData("emergency_contact_1_name", e.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6} width="100%">
            <SelectField
              name={emergency_contact_1_relationship.name}
              label={emergency_contact_1_relationship.label}
              data={relationships}
              value={userInfoData.emergency_contact_1_relationship}
              onChange={(e) =>
                updateUserInfoData(
                  "emergency_contact_1_relationship",
                  e.target.value
                )
              }
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={12} width="100%">
            <InputField
              name={emergency_contact_1_phone.name}
              label={emergency_contact_1_phone.label}
              // value={userInfoData.emergency_contact_1_phone}
              // onChange={(e) => updateUserInfoData("emergency_contact_1_phone", e.target.value)}
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
              name={emergency_contact_2_name.name}
              label={emergency_contact_2_name.label}
              // value={userInfoData.emergency_contact_2_name}
              // onChange={(e) => updateUserInfoData("emergency_contact_2_name", e.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6} width="100%">
            <SelectField
              name={emergency_contact_2_relationship.name}
              label={emergency_contact_2_relationship.label}
              data={relationships}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={12} width="100%">
            <InputField
              name={emergency_contact_2_phone.name}
              label={emergency_contact_2_phone.label}
              // value={userInfoData.emergency_contact_2_phone}
              // onChange={(e) => updateUserInfoData("emergency_contact_2_phone", e.target.value)}
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
