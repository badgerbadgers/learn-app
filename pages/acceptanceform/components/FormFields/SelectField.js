import React from "react";
import PropTypes from "prop-types";
import { at } from "lodash";
import { useField } from "formik";
import {
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";

function SelectField(props) {
  const { label, data, ...rest } = props;

  // Formik's useField is a custom React hook returning array of 3 elements containing FieldProps, FieldMetaProps and FieldHelperProps
  const [field, meta] = useField(props);
  const { value: selectedValue } = field;

  // Formik tracks whether the field has been visited and returned an error message
  const [touched, error] = at(meta, "touched", "error");
  const isError = touched && error && true;

  function renderHelperText() {
    if (isError) {
      return <FormHelperText>{error}</FormHelperText>;
    }
  }

  return (
    <FormControl {...rest} error={isError}>
      <InputLabel>{label}</InputLabel>
      <Select
        {...field}
        value={selectedValue ? selectedValue : ""}
        label={label}
        variant="outlined"
        fullWidth
      >
        {data.map((item, index) => (
          <MenuItem key={index} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
      {renderHelperText()}
    </FormControl>
  );
}

SelectField.defaultProps = {
  data: [],
};

SelectField.propTypes = {
  data: PropTypes.array.isRequired,
};

export default SelectField;
