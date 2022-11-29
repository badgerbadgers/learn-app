import React, { useState, useEffect } from "react";
import { useField } from "formik";
import Grid from "@mui/material/Grid";
import { TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function DatePickerField(props) {
  // Formik's useField is a custom React hook returning array of 3 elements containing FieldProps, FieldMetaProps and FieldHelperProps
  const [field, meta, helper] = useField(props);
  const { value } = field;

  // Formik's setValue helper function to change the field's value
  const { setValue } = helper;

  // Formik tracks whether the field has been visited and returned an error message
  const { touched, error } = meta;
  const isError = touched && error && true;

  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    if (value) {
      const date = new Date(value);
      setSelectedDate(date);
    }
  }, [value]);

  function onChange(date) {
    if (date) {
      setSelectedDate(date);
      try {
        const ISODateString = date.toISOString();
        setValue(ISODateString);
      } catch (error) {
        setValue(date);
      }
    } else {
      setValue(date);
    }
  }

  return (
    <Grid container>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          {...field}
          {...props}
          value={selectedDate}
          onChange={onChange}
          invalidDateMessage={isError && error}
          renderInput={(params) => (
            <TextField
              {...params}
              helperText={isError && error}
              error={isError}
            />
          )}
        />
      </LocalizationProvider>
    </Grid>
  );
}

export default DatePickerField;
