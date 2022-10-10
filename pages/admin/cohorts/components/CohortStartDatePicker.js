import { useEffect, useState } from 'react';

import TextField from '@mui/material/TextField'
import { format } from "date-fns";

export default function CohortStartDatePicker({ cohort }) {
  // const [startDate, setStartDate] = useState(cohort.start_date);
  // useEffect(() => {
  //   setStartDate(cohort.start_date)

  // }, [])

  const startDate = cohort.start_date ? format(new Date(cohort.start_date), "yyyy-MM-dd") : format(new Date(), "yyyy-MM-dd") ;
  console.log(startDate)

  return (
    <TextField
      id="date"
      label="Start Date"
      type="date"
      defaultValue={startDate}
      sx={{ width: 220 }}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
}
