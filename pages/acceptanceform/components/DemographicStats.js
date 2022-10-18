import React, { useContext } from "react";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import InputField from "./FormFields/InputField";
import DatePickerField from "./FormFields/DatePickerField";
import SelectField from "./FormFields/SelectField";
import { store } from "../../../store";

// Styling the chips for multi-select input
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const ethnicities = [
  {
    value: "Asian/Pacific Islander",
    label: "Asian/Pacific Islander",
  },
  {
    value: "Arab/Middle Eastern",
    label: "Arab/Middle Eastern",
  },
  {
    value: "Black/Afro Descent/African",
    label: "Black/Afro Descent/African",
  },
  {
    value: "Hispanic/Latinx/a/o",
    label: "Hispanic/Latinx/a/o",
  },
  {
    value: "Indigenous/Native American",
    label: "Indigenous/Native American",
  },
  {
    value: "White/European/European Descent",
    label: "White/European/European Descent",
  },
  {
    value: "Bi-racial/Multi-racial",
    label: "Bi-racial/Multi-racial",
  },
  {
    value: "Some other race, ethnicity, or origin",
    label: "Some other race, ethnicity, or origin",
  },
];

const genderIdentities = [
  {
    value: "Woman/Female",
    label: "Woman/Female",
  },
  {
    value: "Man/Male",
    label: "Man/Male",
  },
  {
    value: "Non-Binary",
    label: "Non-Binary",
  },
  {
    value: "Other",
    label: "Other",
  },
];

const degrees = [
  {
    value: "High School/equivalent",
    label: "High School/equivalent",
  },
  {
    value: "Tech/occupational certificate",
    label: "Tech/occupational certificate",
  },
  {
    value: "Some college coursework completed",
    label: "Some college coursework completed",
  },
  {
    value: "Bachelor degree",
    label: "Bachelor degree",
  },
  {
    value: "Master degree",
    label: "Master degree",
  },
  {
    value: "Doctorate",
    label: "Doctorate",
  },
  {
    value: "Other coursework/licensures/certifications",
    label: "Other coursework/licensures/certifications",
  },
];

function DemographicStats(props) {
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
      dob,
      pronouns,
      gender_identity,
      gender_identity_self,
      race_ethnicity,
      race_ethnicity_self,
      education,
      spoken_languages,
      employed,
      in_school,
      low_income,
    },
  } = props;

  // //Setting Menu items options for the Gender Identity multi-select list
  // const genderIdentities = ["Woman/Female", "Man/Male", "Non-Binary", "Other"];

  //Handles adding an option from the list to the multiple select input
  function handleGenderIdentityArrayChange(event) {
    const {
      target: { value },
    } = event;
    updateUserInfoData("gender_identity", value);
  }

  //Handles deleting of already added option from the multiple select input
  function handleDeleteGenderIdentity(value) {
    updateUserInfoData(
      "gender_identity",
      userInfoData.gender_identity.filter((item) => item !== value)
    );
  }

  return (
    <FormControl>
      <Grid container p={3} justify="space-between">
        <Grid container spacing={2} justify="space-between">
          <Grid item xs={12} sm={6} width="100%">
            <DatePickerField
              name={dob.name}
              label={dob.label}
              format="mm/dd//yyyy"
              views={["year", "month", "day"]}
              minDate={new Date("1850/01/01")}
              maxDate={new Date(Date.now())}
              variant="outlined"
              value={userInfoData.dob}
              onChange={(e) => updateUserInfoData("dob", e.target.value)}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6} width="100%">
            <InputField
              name={pronouns.name}
              label={pronouns.label}
              // value={userInfoData.physical_city}
              // onChange={(e) => updateUserInfoData("physical_city", e.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6} width="100%">
            <SelectField
              name={gender_identity.name}
              label={gender_identity.label}
              data={genderIdentities}
              multiple
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6} width="100%">
            {/* Conditionally shows the input field if "Other" in the previous Select is chosen */}
            {userInfoData.gender_identity.includes("Other") && (
              <InputField
                name={gender_identity_self.name}
                label={gender_identity_self.label}
                // value={userInfoData.gender_identity_self}
                // onChange={(e) => updateUserInfoData("gender_identity_self", e.target.value)}
                variant="outlined"
                fullWidth
              />
            )}
          </Grid>

          <Grid item xs={12} sm={6} width="100%">
            <SelectField
              name={race_ethnicity.name}
              label={race_ethnicity.label}
              data={ethnicities}
              // value={userInfoData.race_ethnicity}
              // onChange={(e) =>
              //   updateUserInfoData("race_ethnicity", e.target.value)
              // }
              fullWidth
            />
          </Grid>

          {/* Conditionally shows the input field if "Some other race, ethnicity, or origin" in the previous Select is chosen */}
          <Grid item xs={12} sm={6} width="100%">
            {userInfoData.race_ethnicity ===
              "Some other race, ethnicity, or origin" && (
              <InputField
                name={race_ethnicity_self.name}
                label={race_ethnicity_self.label}
                // value={userInfoData.race_ethnicity_self}
                // onChange={(e) => updateUserInfoData("race_ethnicity_self", e.target.value)}
                variant="outlined"
                fullWidth
              />
            )}
          </Grid>

          <Grid item xs={12} sm={6} width="100%">
            <SelectField
              name={education.name}
              label={education.label}
              data={degrees}
              // value={userInfoData.education}
              // onChange={(e) => updateUserInfoData("education", e.target.value)}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6} width="100%">
            <InputField
              name={spoken_languages.name}
              label={spoken_languages.label}
              // value={userInfoData.spoken_languages}
              // onChange={(e) => updateUserInfoData("spoken_languages", e.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid
            item
            xs={12}
            sm={4}
            width="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            direction="column"
            container
          >
            <FormLabel id="demo-radio-buttons-group-label">
              Currently employed:
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              value={userInfoData.employed}
              onChange={(e) => updateUserInfoData("employed", e.target.value)}
            >
              <FormControlLabel
                value="yes"
                control={<Radio size="small" />}
                label="Yes"
              />
              <FormControlLabel
                value="no"
                control={<Radio size="small" />}
                label="No"
              />
            </RadioGroup>
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            width="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            direction="column"
            container
          >
            <FormLabel id="demo-radio-buttons-group-label">
              Currently in school:
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              value={userInfoData.in_school}
              onChange={(e) => updateUserInfoData("in_school", e.target.value)}
            >
              <FormControlLabel
                value="yes"
                control={<Radio size="small" />}
                label="Yes"
              />
              <FormControlLabel
                value="no"
                control={<Radio size="small" />}
                label="No"
              />
            </RadioGroup>
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            width="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            direction="column"
            container
          >
            <FormLabel id="demo-radio-buttons-group-label" required>
              Low income:
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              required
              name={low_income.name}
              value={userInfoData.low_income}
              onChange={(e) => updateUserInfoData("low_income", e.target.value)}
            >
              <FormControlLabel
                value="yes"
                control={<Radio size="small" />}
                label="Yes"
              />
              <FormControlLabel
                value="no"
                control={<Radio size="small" />}
                label="No"
              />
            </RadioGroup>
          </Grid>
        </Grid>
      </Grid>
    </FormControl>
  );
}

export default DemographicStats;
