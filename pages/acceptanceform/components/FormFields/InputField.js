import React from "react";
import { at } from "lodash";
import { useField } from "formik";
import TextField from "@mui/material/TextField";

function InputField(props) {
  const { errorText, ...rest } = props;

  // Formik's useField is a custom React hook returning array of 3 elements containing FieldProps, FieldMetaProps and FieldHelperProps
  const [field, meta, helper] = useField(props);

  // Formik tracks whether the field has been visited and returned an error message
  const [touched, error] = at(meta, "touched", "error");
  const isError = touched && error && true;

  function renderHelperText() {
    if (isError) {
      return error;
    }
  }

  return (
    <TextField
      type="text"
      error={meta.touched && meta.error && true}
      helperText={renderHelperText()}
      {...field}
      {...rest}
    />
  );
}

export default InputField;
