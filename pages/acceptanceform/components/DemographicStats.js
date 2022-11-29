import React from "react";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import InputField from "./FormFields/InputField";
import DatePickerField from "./FormFields/DatePickerField";
import SelectField from "./FormFields/SelectField";
import MultiSelectField from "./FormFields/MultiSelectField";
import RadioButtonGroup from "./FormFields/RadioButtonGroup";
import { useFormikContext } from "formik";

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
    value: "Black/Afro Descent",
    label: "Black/Afro Descent",
  },
  {
    value: "Hispanic/Latinx/a/o",
    label: "Hispanic/Latinx/a/o",
  },
  {
    value: "Native American",
    label: "Native American",
  },
  {
    value: "White/European Descent",
    label: "White/European Descent",
  },
  {
    value: "Bi-racial/Multi-racial",
    label: "Bi-racial/Multi-racial",
  },
  {
    value: "Other",
    label: "Other",
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
  const { values } = useFormikContext();

  const {
    formField: {
      dob,
      pronouns,
      genderIdentity,
      genderIdentitySelf,
      raceEthnicity,
      raceEthnicitySelf,
      education,
      spokenLanguages,
      employed,
      inSchool,
      lowIncome,
    },
  } = props;

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
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6} width="100%">
            <InputField
              name={pronouns.name}
              label={pronouns.label}
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6} width="100%">
            <MultiSelectField
              name={genderIdentity.name}
              label={genderIdentity.label}
              data={genderIdentities}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6} width="100%">
            {/* Conditionally shows the input field if "Other" in the previous Select is chosen */}
            {values.gender_identity.includes("Other") && (
              <InputField
                name={genderIdentitySelf.name}
                label={genderIdentitySelf.label}
                variant="outlined"
                fullWidth
              />
            )}
          </Grid>

          <Grid item xs={12} sm={6} width="100%">
            <SelectField
              name={raceEthnicity.name}
              label={raceEthnicity.label}
              data={ethnicities}
              fullWidth
            />
          </Grid>

          {/* Conditionally shows the input field if "Some other race, ethnicity, or origin" in the previous Select is chosen */}
          <Grid item xs={12} sm={6} width="100%">
            {values.race_ethnicity === "Other" && (
              <InputField
                name={raceEthnicitySelf.name}
                label={raceEthnicitySelf.label}
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
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6} width="100%">
            <InputField
              name={spokenLanguages.name}
              label={spokenLanguages.label}
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
            <FormLabel sx={{ mt: 2 }} id="demo-radio-buttons-group-label">
              Currently employed:
            </FormLabel>
            <RadioButtonGroup name={employed.name} label={employed.label} />
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
            <FormLabel sx={{ mt: 2 }} id="demo-radio-buttons-group-label">
              Currently in school:
            </FormLabel>
            <RadioButtonGroup name={inSchool.name} label={inSchool.label} />
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
            <FormLabel sx={{ mt: 2 }} id="demo-radio-buttons-group-label">
              Low income*:
            </FormLabel>
            <RadioButtonGroup
              name={lowIncome.name}
              label={lowIncome.label}
              required
            />
          </Grid>
        </Grid>
      </Grid>
    </FormControl>
  );
}

export default DemographicStats;
