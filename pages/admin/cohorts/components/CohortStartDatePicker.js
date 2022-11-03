// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TextField from "@mui/material/TextField";
// import { format } from "date-fns";
// import { getTimezoneOffset } from 'date-fns-tz'
// import { format } from "date-fns-tz";
const {utcToZonedTime, format, toDate} = require('date-fns-tz')

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
        // const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const sDate =  e.target.value;
        const test = new Date(sDate).toISOString()
        setDate(new Date(sDate).toISOString())
        updateDate(new Date(test))

        // const sDateTz = utcToZonedTime(new Date(sDate), tz)
        // // const sDateTz = new Date(sDate);
        // setDate(sDateTz)
        console.log("new date", test);      
      }

      }
    />
  );
}
