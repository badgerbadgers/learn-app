import React from "react";
import { at } from "lodash";
import { useField } from "formik";
import TextField from "@mui/material/TextField";

function InputField(props) {
  const { errorText, ...rest } = props;
  const [field, meta] = useField(props);
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
