import React from "react";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import CheckboxField from "./FormFields/CheckboxField";
import SelectField from "./FormFields/SelectField";
import MultiSelectField from "./FormFields/MultiSelectField";

function LearningBackground(props) {
  const {
    formField: {
      learningStyle,
      priorCodingEducation,
      priorCodingLanguages,
      workCommitmentConsent,
      leaveNoticeConsent,
    },
  } = props;

  //Setting Menu items options for Select lists

  const education = [
    {
      value: "A few hours",
      label: "A few hours",
    },
    {
      value: "A few days",
      label: "A few days",
    },
    {
      value: "A few weeks",
      label: "A few weeks",
    },
    {
      value: "A few months",
      label: "A few months",
    },
    {
      value: "A year or two",
      label: "A year or two",
    },
    {
      value: "Several years",
      label: "Several years",
    },
  ];

  const languages = [
    {
      value: "HTML",
      label: "HTML",
    },
    {
      value: "CSS",
      label: "CSS",
    },
    {
      value: "JavaScript",
      label: "JavaScript",
    },
    {
      value: "Ruby",
      label: "Ruby",
    },
    {
      value: "Rails",
      label: "Rails",
    },
    {
      value: "React",
      label: "React",
    },
    {
      value: "Node",
      label: "Node",
    },
    {
      value: "Express",
      label: "Express",
    },
    {
      value: "Other",
      label: "Other",
    },
  ];

  const styles = [
    {
      value: "Watching",
      label: "Watching",
    },
    {
      value: "Listening",
      label: "Listening",
    },
    {
      value: "Reading",
      label: "Reading",
    },
    {
      value: "Not sure",
      label: "Not sure",
    },
  ];

  return (
    <FormControl>
      <Grid container p={3} justify="space-between">
        <Grid container spacing={2} justify="space-between">
          <Grid item xs={12} sm={6} width="100%">
            <SelectField
              name={priorCodingEducation.name}
              label={priorCodingEducation.label}
              data={education}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6} width="100%">
            <MultiSelectField
              name={priorCodingLanguages.name}
              label={priorCodingLanguages.label}
              data={languages}
              multiple
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={12} width="100%">
            <MultiSelectField
              name={learningStyle.name}
              label={learningStyle.label}
              data={styles}
              multiple
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={12} width="100%">
            <CheckboxField
              name={workCommitmentConsent.name}
              label={workCommitmentConsent.label}
            />
          </Grid>

          <Grid item xs={12} sm={12} width="100%">
            <CheckboxField
              name={leaveNoticeConsent.name}
              label={leaveNoticeConsent.label}
            />
          </Grid>
        </Grid>
      </Grid>
    </FormControl>
  );
}

export default LearningBackground;
