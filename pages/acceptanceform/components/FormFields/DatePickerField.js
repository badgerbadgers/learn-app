import React, { useState, useEffect } from "react";
import { useField } from "formik";
import Grid from "@mui/material/Grid";
import FormHelperText from "@mui/material";
import { TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function DatePickerField(props) {
  const [field, meta, helper] = useField(props);
  const { touched, error } = meta;
  const { setValue } = helper;
  const isError = touched && error && true;
  const { value } = field;
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
      <LocalizationProvider dateAdapter={AdapterDayjs}>
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
