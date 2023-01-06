import { useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Grid } from "@mui/material";

export default function StudentsFilter({ cohorts, changeHandler }) {
  const filters = useRef({ cohort: "", course: "", role: "" });
  // const [filterValue, setFilterValue] = useState("");

  function handleFilterChange(event, key, selectedOption) {
    const newFilter = filters;
    filters.current[key] = !selectedOption ? "" : selectedOption.value; 
   // console.log("current filter:", filters.current)
    changeHandler(filters.current)
  }
  

  // const handleFilterChange = (event) => {
  //   setFilterValue(event.target.value);
  // };

  return (
    <Grid container spasing={4}>
      <Autocomplete
        id="filter-cohorts"
        options={cohorts}
        getOptionLabel={(option) => option.label}
        sx={{ width: 180 }}
        renderInput={(params) => <TextField {...params} label="All Cohorts" />}
        onChange={(event, selectedOption) => {
          handleFilterChange(event, "cohort", selectedOption);
        }}
      />

      {/* <Autocomplete
        id="filter-course"
        options={courses}
        getOptionLabel={(option) => option.label}
        sx={{ width: 180 }}
        onChange={(event, selectedOption) => {
          handleFilterChange(event, "course", selectedOption);
        }}
        renderInput={(params) => <TextField {...params} label="All Courses" />}
      />

      <Autocomplete
        id="filter-roles"
        options={roles}
        getOptionLabel={(option) => option.label}
        sx={{ width: 180 }}
        onChange={(event, selectedOption) => {
          handleFilterChange(event, "role", selectedOption);
        }}
        renderInput={(params) => <TextField {...params} label="All Roles" />}
      /> */}
    </Grid>
  );
}
