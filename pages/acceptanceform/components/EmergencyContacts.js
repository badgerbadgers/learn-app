import React, { useContext } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
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
            {/* <TextField
              name="emergency_contact_1_name"
              placeholder="Type your person's 1 full name"
              label="Full Name"
              fullWidth
              required
              size="small"
              InputLabelProps={{ shrink: true }}
              value={userInfoData.emergency_contact_1_name}
              onChange={(e) =>
                updateUserInfoData("emergency_contact_1_name", e.target.value)
              }
            /> */}
          </Grid>
          <Grid item xs={12} sm={6} width="100%">
            <SelectField
              name={emergency_contact_1_relationship.name}
              label={emergency_contact_1_relationship.label}
              data={relationships}
              fullWidth
            />
            {/* <FormControl sx={{ width: "100%" }} size="small">
              <InputLabel required id="demo-select-small">
                Relationship
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                required
                label="Relationship"
                value={userInfoData.emergency_contact_1_relationship}
                onChange={(e) =>
                  updateUserInfoData(
                    "emergency_contact_1_relationship",
                    e.target.value
                  )
                }
              >
                <MenuItem value={10}>Parent/Mother/Father</MenuItem>
                <MenuItem value={20}>Sibling/Brother/Sister</MenuItem>
                <MenuItem value={30}>Spouse/Partner</MenuItem>
                <MenuItem value={40}>Friend</MenuItem>
                <MenuItem value={50}>Other</MenuItem>
              </Select>
            </FormControl> */}
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
            {/* <TextField
              name="emergency_contact_1_phone"
              placeholder="Type person's 1 phone number including country code"
              label="Phone"
              fullWidth
              required
              size="small"
              InputLabelProps={{ shrink: true }}
              value={userInfoData.emergency_contact_1_phone}
              onChange={(e) =>
                updateUserInfoData("emergency_contact_1_phone", e.target.value)
              }
            /> */}
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
            {/* <TextField
              name="emergency_contact_2_name"
              placeholder="Type person's 2 full name"
              label="Full Name"
              fullWidth
              required
              size="small"
              InputLabelProps={{ shrink: true }}
              value={userInfoData.emergency_contact_2_name}
              onChange={(e) =>
                updateUserInfoData("emergency_contact_2_name", e.target.value)
              }
            /> */}
          </Grid>
          <Grid item xs={12} sm={6} width="100%">
            <SelectField
              name={emergency_contact_2_relationship.name}
              label={emergency_contact_2_relationship.label}
              data={relationships}
              fullWidth
            />
            {/* <FormControl sx={{ width: "100%" }} size="small">
              <InputLabel required id="demo-select-small">
                Relationship
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                required
                label="Relationship"
                value={userInfoData.emergency_contact_2_relationship}
                onChange={(e) =>
                  updateUserInfoData(
                    "emergency_contact_2_relationship",
                    e.target.value
                  )
                }
              >
                <MenuItem value={10}>Parent/Mother/Father</MenuItem>
                <MenuItem value={20}>Sibling/Brother/Sister</MenuItem>
                <MenuItem value={30}>Spouse/Partner</MenuItem>
                <MenuItem value={40}>Friend</MenuItem>
                <MenuItem value={50}>Other</MenuItem>
              </Select>
            </FormControl> */}
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
            {/* <TextField
              name="emergency_contact_2_phone"
              placeholder="Type person's 2 phone number including country code"
              label="Phone"
              fullWidth
              required
              size="small"
              InputLabelProps={{ shrink: true }}
              value={userInfoData.emergency_contact_2_phone}
              onChange={(e) =>
                updateUserInfoData("emergency_contact_2_phone", e.target.value)
              }
            /> */}
          </Grid>
        </Grid>
      </Grid>
    </FormControl>
  );
}

export default EmergencyContacts;
