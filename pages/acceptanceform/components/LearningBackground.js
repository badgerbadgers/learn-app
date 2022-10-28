import React, { useContext } from "react";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import CheckboxField from "./FormFields/CheckboxField";
import SelectField from "./FormFields/SelectField";
import MultiSelectField from "./FormFields/MultiSelectField";
import { store } from "../../../store";

// Styling the chips for multi-select input
// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

function LearningBackground(props) {
  // Updating user info data through the global state provider
  // const { state, dispatch } = useContext(store);
  // const { userInfoData } = state;
  // function updateUserInfoData(key, value) {
  //   dispatch({
  //     type: "UPDATE_PERSONAL_DETAILS",
  //     payload: { ...userInfoData, [key]: value },
  //   });
  // }

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

  // //Handles adding an option from the list to the multiple select input
  // function handlePriorCodingLanguagesArrayChange(event) {
  //   const {
  //     target: { value },
  //   } = event;
  //   updateUserInfoData("prior_coding_languages", value);
  // }

  // //Handles deleting of already added option from the multiple select input
  // function handleDeletePriorCodingLanguages(value) {
  //   updateUserInfoData(
  //     "prior_coding_languages",
  //     userInfoData.prior_coding_languages.filter((item) => item !== value)
  //   );
  // }

  // //Handles adding an option from the list to the multiple select input
  // function handleLearningStyleArrayChange(event) {
  //   const {
  //     target: { value },
  //   } = event;
  //   updateUserInfoData("learning_style", value);
  // }

  // //Handles deleting of already added option from the multiple select input
  // function handleDeleteLearningStyle(value) {
  //   updateUserInfoData(
  //     "learning_style",
  //     userInfoData.learning_style.filter((item) => item !== value)
  //   );
  // }

  return (
    <FormControl>
      <Grid container p={3} justify="space-between">
        <Grid container spacing={2} justify="space-between">
          <Grid item xs={12} sm={6} width="100%">
            {/* <FormControl sx={{ width: "100%" }} size="small">
              <InputLabel id="demo-select-small">
                Prior Coding Languages/Frameworks
              </InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-multiple-chip"
                name="prior_coding_education"
                placeholder="Prior Coding Languages/Frameworks"
                label="Prior Coding Languages/Frameworks"
                required
                multiple
                variant="outlined"
                fullWidth
                size="small"
                value={userInfoData.prior_coding_languages}
                onChange={handlePriorCodingLanguagesArrayChange}
                input={
                  <OutlinedInput
                    id="select-multiple-chip"
                    label="Prior Coding Languages/Frameworks"
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
                        onDelete={() => handleDeletePriorCodingLanguages(value)}
                        color="secondary"
                      />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {priorCodingLanguages.map((value) => (
                  <MenuItem key={value} value={value}>
                    <Checkbox
                      checked={
                        userInfoData.prior_coding_languages.indexOf(value) > -1
                      }
                    />
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl> */}
            <SelectField
              name={priorCodingEducation.name}
              label={priorCodingEducation.label}
              data={education}
              // value={userInfoData.prior_coding_education}
              // onChange={(e) =>
              //   updateUserInfoData("prior_coding_education", e.target.value)
              // }
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
            {/* <FormControl sx={{ width: "100%" }} size="small">
              <InputLabel id="demo-select-small">Learning Style</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-multiple-chip"
                name="learning_style"
                placeholder="Learning Style"
                label="Learning Style"
                required
                multiple
                variant="outlined"
                fullWidth
                size="small"
                value={userInfoData.learning_style}
                onChange={handleLearningStyleArrayChange}
                input={
                  <OutlinedInput
                    id="select-multiple-chip"
                    label="Learning Style"
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
                        onDelete={() => handleDeleteLearningStyle(value)}
                        color="secondary"
                      />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {learningStyles.map((value) => (
                  <MenuItem key={value} value={value}>
                    <Checkbox
                      checked={userInfoData.learning_style.indexOf(value) > -1}
                    />
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl> */}
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
