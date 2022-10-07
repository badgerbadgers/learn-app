import React, { useContext } from "react";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Checkbox from "@mui/material/Checkbox";
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

function DemographicStats() {
  // Updating user info data through the global state provider
  const { state, dispatch } = useContext(store);
  const { userInfoData } = state;
  function updateUserInfoData(key, value) {
    dispatch({
      type: "UPDATE_PERSONAL_DETAILS",
      payload: { ...userInfoData, [key]: value },
    });
  }

  //Setting Menu items options for the Gender Identity multi-select list
  const genderIdentities = ["Woman/Female", "Man/Male", "Non-Binary", "Other"];

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
    <Grid container p={3} justify="space-between">
      <Grid container spacing={2} justify="space-between">
        <Grid item xs={12} sm={6} width="100%">
          <TextField
            type="date"
            name="dob"
            placeholder="Type your date of birth"
            label="Date Of Birth"
            variant="outlined"
            fullWidth
            required
            size="small"
            InputLabelProps={{ shrink: true }}
            value={userInfoData.dob}
            onChange={(e) => updateUserInfoData("dob", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} width="100%">
          <TextField
            name="pronouns"
            placeholder="Type your pronouns"
            label="Pronouns"
            fullWidth
            size="small"
            InputLabelProps={{ shrink: true }}
            value={userInfoData.pronouns}
            onChange={(e) => updateUserInfoData("pronouns", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} width="100%">
          <FormControl sx={{ width: "100%" }} size="small">
            <InputLabel required id="demo-select-small">
              Gender Identity
            </InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-multiple-chip"
              name="gender_identity"
              placeholder="Select your gender identity"
              label="Gender Identity"
              required
              multiple
              variant="outlined"
              fullWidth
              size="small"
              value={userInfoData.gender_identity}
              onChange={handleGenderIdentityArrayChange}
              input={
                <OutlinedInput
                  id="select-multiple-chip"
                  label="Gender Identity"
                />
              }
              renderValue={(selected) => (
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 0.5,
                  }}
                >
                  {selected.map((value) => (
                    <Chip
                      key={value}
                      label={value}
                      onMouseDown={(event) => {
                        event.stopPropagation();
                      }}
                      onDelete={() => handleDeleteGenderIdentity(value)}
                      color="secondary"
                    />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {genderIdentities.map((value) => (
                <MenuItem key={value} value={value}>
                  <Checkbox
                    checked={userInfoData.gender_identity.indexOf(value) > -1}
                  />
                  {value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} width="100%">
          {/* Conditionally shows the input field if "Other" in the previous Select is chosen */}
          {userInfoData.gender_identity.includes("Other") && (
            <TextField
              name="gender_identity_self"
              placeholder="Type your gender identity"
              label="Gender Identity (self described)"
              fullWidth
              size="small"
              InputLabelProps={{ shrink: true }}
              disabled={
                userInfoData.gender_identity.includes("Other") ? false : true
              }
              value={userInfoData.gender_identity_self}
              onChange={(e) =>
                updateUserInfoData("gender_identity_self", e.target.value)
              }
            />
          )}
        </Grid>
        <Grid item xs={12} sm={6} width="100%">
          <FormControl sx={{ width: "100%" }} size="small">
            <InputLabel required id="demo-select-small">
              Race/Ethnicity
            </InputLabel>
            <Select
              name="race_ethnicity"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              required
              label="Race/Ethnicity"
              value={userInfoData.race_ethnicity}
              onChange={(e) =>
                updateUserInfoData("race_ethnicity", e.target.value)
              }
            >
              <MenuItem value={"Asian/Pacific Islander"}>
                Asian/Pacific Islander
              </MenuItem>
              <MenuItem value={"Arab/Middle Eastern"}>
                Arab/Middle Eastern
              </MenuItem>
              <MenuItem value={"Black/Afro Descent/African"}>
                Black/Afro Descent/African
              </MenuItem>
              <MenuItem value={"Hispanic/Latinx/a/o"}>
                Hispanic/Latinx/a/o
              </MenuItem>
              <MenuItem value={"Indigenous/Native American"}>
                Indigenous/Native American
              </MenuItem>
              <MenuItem value={"White/European/European Descent"}>
                White/European/European Descent
              </MenuItem>
              <MenuItem value={"Bi-racial/Multi-racial"}>
                Bi-racial/Multi-racial
              </MenuItem>
              <MenuItem value={"Some other race, ethnicity, or origin"}>
                Some other race, ethnicity, or origin
              </MenuItem>
              <MenuItem value={"Prefer not to say"}>Prefer not to say</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Conditionally shows the input field if "Some other race, ethnicity, or origin" in the previous Select is chosen */}
        <Grid item xs={12} sm={6} width="100%">
          {userInfoData.race_ethnicity ===
            "Some other race, ethnicity, or origin" && (
            <TextField
              name="race_ethnicity_self"
              placeholder="Type your race/ethnicity"
              label="Race/Ethnicity (self described)"
              fullWidth
              size="small"
              InputLabelProps={{ shrink: true }}
              value={userInfoData.race_ethnicity_self}
              onChange={(e) =>
                updateUserInfoData("race_ethnicity_self", e.target.value)
              }
            />
          )}
        </Grid>
        <Grid item xs={12} sm={6} width="100%">
          <FormControl sx={{ width: "100%" }} size="small">
            <InputLabel id="demo-select-small">
              Highest Level of Education
            </InputLabel>
            <Select
              name="education"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Higher Level of Education"
              value={userInfoData.education}
              onChange={(e) => updateUserInfoData("education", e.target.value)}
            >
              <MenuItem value={"High School/equivalent"}>
                High School/equivalent
              </MenuItem>
              <MenuItem value={"Tech/occupational certificate"}>
                Tech/occupational certificate
              </MenuItem>
              <MenuItem value={"Associate degree"}>Associate degree</MenuItem>
              <MenuItem value={"Some college coursework completed"}>
                Some college coursework completed
              </MenuItem>
              <MenuItem value={"Bachelor degree"}>Bachelor degree</MenuItem>
              <MenuItem value={"Master degree"}>Master degree</MenuItem>
              <MenuItem value={"Doctorate"}>Doctorate</MenuItem>
              <MenuItem value={"Other coursework/licensures/certifications"}>
                Other coursework/licensures/certifications
              </MenuItem>
              <MenuItem value={"None"}>None</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} width="100%">
          <TextField
            name="spoken_languages"
            placeholder="Type languages you speak"
            label="Spoken Languages"
            fullWidth
            size="small"
            InputLabelProps={{ shrink: true }}
            value={userInfoData.spoken_languages}
            onChange={(e) =>
              updateUserInfoData("spoken_languages", e.target.value)
            }
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
            name="radio-buttons-group"
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
  );
}

export default DemographicStats;
