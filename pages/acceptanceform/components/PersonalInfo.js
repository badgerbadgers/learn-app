import React, { useContext } from "react";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputField from "./FormFields/InputField";
import { store } from "../../../store";

function PersonalInfo(props) {
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
    formField: { first_name, last_name, email, gitHub, phone },
  } = props;

  return (
    <FormControl>
      <Grid container p={3} justify="space-between">
        <Grid container spacing={2} justify="space-between">
          <Grid item xs={12} sm={6} width="100%">
            <InputField
              name={first_name.name}
              label={first_name.label}
              // value={userInfoData.first_name}
              // onChange={(e) => updateUserInfoData("first_name", e.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6} width="100%">
            <InputField
              name={last_name.name}
              label={last_name.label}
              // value={userInfoData.last_name}
              // onChange={(e) => updateUserInfoData("last_name", e.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6} width="100%">
            <InputField
              name={email.name}
              label={email.label}
              // value={userInfoData.email}
              // onChange={(e) => updateUserInfoData("email", e.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6} width="100%">
            <InputField
              name={gitHub.name}
              label={gitHub.label}
              // value={userInfoData.gitHub}
              // onChange={(e) => updateUserInfoData("gitHub", e.target.value)}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={12} width="100%">
            <InputField
              name={phone.name}
              label={phone.label}
              // value={userInfoData.phone}
              // onChange={(e) => updateUserInfoData("phone", e.target.value)}
              fullWidth
            />
          </Grid>
        </Grid>
      </Grid>
    </FormControl>
  );
}

export default PersonalInfo;
