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
  Checkbox,
} from "@mui/material";

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

function MultiSelectField(props) {
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
        multiple
        renderValue={(selected) => selected.join(", ")}
        MenuProps={MenuProps}
      >
        {data.map((item, index) => (
          <MenuItem key={index} value={item.value}>
            <Checkbox checked={selectedValue.indexOf(item.value) > -1} />
            {item.label}
          </MenuItem>
        ))}
      </Select>
      {renderHelperText()}
    </FormControl>
  );
}

MultiSelectField.defaultProps = {
  data: [],
};

MultiSelectField.propTypes = {
  data: PropTypes.array.isRequired,
};

export default MultiSelectField;
