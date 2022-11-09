import TextField from "@mui/material/TextField";
import { format } from "date-fns";

export default function CohortStartDatePicker({id, startDate}) {
  const defaultVal = startDate ? format(new Date(startDate), "yyyy-MM-dd") : "";

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
    />
  );
}
