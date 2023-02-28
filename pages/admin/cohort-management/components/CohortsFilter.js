import { Grid } from "@mui/material";
import { MenuItem, FormControl, Select } from "@mui/material";

export default function CohortsFilter({
  courseOption,
  courseOptions,
  statusOption,
  statusOptions,
  handleCourseChange,
  handleStatusChange,
}) {
  return (
    <Grid sx={{ textAlign: "start" }}>
      <FormControl>
        <Select
          value={courseOption}
          onChange={handleCourseChange}
          sx={{ width: 180 }}
        >
          {courseOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <Select
          value={statusOption}
          onChange={handleStatusChange}
          sx={{ width: 180 }}
        >
          {statusOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
}
