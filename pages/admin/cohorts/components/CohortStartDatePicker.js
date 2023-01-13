import TextField from "@mui/material/TextField";

const {zonedTimeToUtc, format} = require('date-fns-tz')

export default function CohortStartDatePicker({date, setDate, updateDate}) {
  const defaultVal = date ? format(new Date(date), "yyyy-MM-dd") : "";

  return (
    <TextField
      id="date"
      label="Start Date"
      type="date"
      defaultValue={defaultVal}
      sx={{ width: 220 }}
      InputLabelProps={{
        shrink: true,
      }}
      onChange={ (e) =>{
        const startDate = zonedTimeToUtc(
          e.target.value,
          Intl.DateTimeFormat().resolvedOptions().timeZone
          ).toISOString();
          setDate(startDate)
          updateDate(new Date(startDate))
      }

      }
    />
  );
}
