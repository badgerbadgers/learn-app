// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TextField from "@mui/material/TextField";
// import { format } from "date-fns";
// import { getTimezoneOffset } from 'date-fns-tz'
// import { format } from "date-fns-tz";
const {zonedTimeToUtc, format} = require('date-fns-tz')

export default function CohortStartDatePicker({id, date, setDate, updateDate}) {
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
