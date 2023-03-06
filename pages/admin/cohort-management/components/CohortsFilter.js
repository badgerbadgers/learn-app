import { Grid } from "@mui/material";
import { MenuItem, TextField } from "@mui/material";

export default function CohortsFilter({
  courseOption,
  courseOptions,
  statusOption,
  statusOptions,
  handleCourseChange,
  handleStatusChange,
}) {
  return (
    <Grid item xs={10} sx={{ textAlign: "start" }}>
      <TextField
        id="outlined-course-filter"
        select
        value={courseOption}
        onChange={handleCourseChange}
        sx={{ width: 180 }}
      >
        {courseOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        id="outlined-status-filter"
        select
        value={statusOption}
        onChange={handleStatusChange}
        sx={{ width: 180 }}
      >
        {statusOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </Grid>
  );
}
