import { useEffect, useState } from 'react';

import TextField from '@mui/material/TextField'
import { format } from "date-fns";

export default function CohortStartDatePicker({ cohort }) {
  const startDate = cohort.start_date ? format(new Date(cohort.start_date), "yyyy-MM-dd") : "";

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
