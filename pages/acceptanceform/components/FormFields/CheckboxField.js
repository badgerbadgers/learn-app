import React from "react";
import { at } from "lodash";
import { useField } from "formik";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";

export default function CheckboxField(props) {
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
    setValue(e.target.checked);
  }

  return (
    <FormControl {...rest}>
      <FormControlLabel
        value={field.value}
        checked={field.value}
        control={<Checkbox {...field} onChange={onChange} />}
        label={label}
      />
      {renderHelperText()}
    </FormControl>
  );
}
