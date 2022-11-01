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
  ListItemText,
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
  const [field, meta] = useField(props);
  const { value: selectedValue } = field;
  const [touched, error] = at(meta, "touched", "error");
  const isError = touched && error && true;

  const [personName, setPersonName] = React.useState([]);

  // const handleChange = (event) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   setPersonName(
  //     // On autofill we get a stringified value.
  //     typeof value === "string" ? value.split(",") : value
  //   );
  // };

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
        // onChange={handleChange}
        // input={<OutlinedInput label="Tag" />}
        // renderValue={(selected) => selected.join(", ")}
        // MenuProps={MenuProps}
        // onChange={(e) => handleInputChange(e)}
        // value={userInfoData.department}
      >
        {data.map((item, index) => (
          <MenuItem key={index} value={item.value}>
            {/* <Checkbox checked={personName.indexOf(item.value) > -1} />
            <ListItemText primary={item.label} /> */}
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
