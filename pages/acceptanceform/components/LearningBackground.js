import React, { useContext } from "react";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import CheckboxField from "./FormFields/CheckboxField";
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

function LearningBackground(props) {
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
      learning_style,
      prior_coding_education,
      prior_coding_languages,
      work_commitment_consent,
      leave_notice_consent,
    },
  } = props;

  // //Setting Menu items options for the Prior Coding Languages multi-select list

  const priorCodingEducation = [
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

  const priorCodingLanguages = [
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

  const learningStyle = [
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
              name={prior_coding_education.name}
              label={prior_coding_education.label}
              data={priorCodingEducation}
              multiple
              value={userInfoData.prior_coding_education}
              onChange={(e) =>
                updateUserInfoData("prior_coding_education", e.target.value)
              }
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6} width="100%">
            <SelectField
              name={prior_coding_languages.name}
              label={prior_coding_languages.label}
              data={priorCodingLanguages}
              multiple
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={12} width="100%">
            <SelectField
              name={learning_style.name}
              label={learning_style.label}
              data={learningStyle}
              multiple
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={12} width="100%">
            <CheckboxField
              name={work_commitment_consent.name}
              label={work_commitment_consent.label}
            />
          </Grid>

          <Grid item xs={12} sm={12} width="100%">
            <CheckboxField
              name={leave_notice_consent.name}
              label={leave_notice_consent.label}
            />
          </Grid>
        </Grid>
      </Grid>
    </FormControl>
  );
}

export default LearningBackground;
