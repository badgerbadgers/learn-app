import React from "react";
import { at } from "lodash";
import { useField } from "formik";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";

export default function RadioButtonGroup(props) {
  const { label, ...rest } = props;

  // Formik's useField is a custom React hook returning array of 3 elements containing FieldProps, FieldMetaProps and FieldHelperProps
  const [field, meta, helper] = useField(props);

  // Formik's setValue helper function to change the field's value
  const { setValue } = helper;

  // Formik tracks whether the field has been visited and returned an error message
  const [touched, error] = at(meta, "touched", "error");
  const isError = touched && error && true;

  function renderHelperText() {
    if (isError) {
      return <FormHelperText>{error}</FormHelperText>;
    }
  }

  function onChange(e) {
    setValue(e.target.value);
  }

  return (
    <FormControl {...rest}>
      <RadioGroup {...field} onChange={onChange} row value={field.checked}>
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
      {renderHelperText()}
    </FormControl>
  );
}
