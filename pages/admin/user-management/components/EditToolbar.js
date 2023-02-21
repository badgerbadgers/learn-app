import {
  GridRowModes,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import {  useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import Snackbar from "@mui/material/Snackbar";
import { v4 as uuidv4 } from "uuid";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Popover from "@mui/material/Popover";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const EditToolbar = (props) => {
  const { setRows, setRowModesModel, rows, selectionModel, cohorts } = props;
  const [snackbar, setSnackbar] = useState(null);

  //For Popover
  const [anchorEl, setAnchorEl] = useState(null);
  const [cohortSelected, setCohortSelected] = useState(null);
  const [radioGroupSelected, setRadioGroupSelected] = useState("students");

  const handleClickPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setCohortSelected(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleCohortChange = (event, selectedOption) => {
    !selectedOption
      ? setCohortSelected(null)
      : setCohortSelected(selectedOption.value);
  };
  const handleCloseSnackbar = () => setSnackbar(null);

  // For Add To Cohort Button
  const handleAddUsersToCohort = async (payload) => {
    const cohortId = cohortSelected;
    const url = `/api/cohorts/${cohortId}`;
    try {
      await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      handleClose();
      setSnackbar({
        children: "User successfully added to cohort",
        severity: "success",
      });
    } catch (error) {
      const errorMessage = Object.values(error.response.data.message)[0];
      console.error("Error:", error.response.data);
      throw new Error(errorMessage);
      setSnackbar({
        children: "Add user to cohort error",
        severity: "false",
      });
    }
  };

  //For Edit Or Update User
  const handleClick = () => {
    const id = uuidv4();
    setRows((oldRows) => [...oldRows, { id, gh: "", isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "gh" },
    }));
  };

  return (
    <GridToolbarContainer
      sx={{ display: "flex", justifyContent: "space-between" }}
    >
      <Button startIcon={<AddIcon />} onClick={handleClick}>
        Add User
      </Button>

      <Box sx={{ m: 1 }}>
        {selectionModel.length === 0 ? (
          <Button disabled endIcon={<MoreHorizIcon />}>
            Add Users To Cohorts
          </Button>
        ) : (
          <Button onClick={handleClickPopover} endIcon={<MoreHorizIcon />}>
            Add Users To Cohorts
          </Button>
        )}

        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <Box sx={{ m: 2 }}>
            <Autocomplete
              id="filter-cohorts"
              options={cohorts}
              getOptionLabel={(option) => option.label}
              sx={{ width: 180 }}
              renderInput={(params) => (
                <TextField {...params} label="Choose Cohort" />
              )}
              onChange={(event, selectedOption) => {
                handleCohortChange(event, selectedOption);
              }}
            />
            <Box sx={{ mt: 2 }}>
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">
                  Add as:
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="students"
                  name="radio-buttons-group"
                  onChange={(event, value) => {
                    setRadioGroupSelected(value);
                  }}
                >
                  <FormControlLabel
                    value="students"
                    control={<Radio />}
                    label="Student"
                  />
                  <FormControlLabel
                    value="mentors"
                    control={<Radio />}
                    label="Mentor"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
            <Box textAlign="center">
              {!cohortSelected ? (
                <Button disabled>Add To Cohort</Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={() =>
                    handleAddUsersToCohort([radioGroupSelected, selectionModel])
                  }
                >
                  Add To Cohort
                </Button>
              )}
            </Box>
          </Box>
        </Popover>
        {!!snackbar && (
          <Snackbar
            open
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            onClose={handleCloseSnackbar}
            autoHideDuration={6000}
          >
            <Alert {...snackbar} onClose={handleCloseSnackbar} />
          </Snackbar>
        )}
      </Box>
    </GridToolbarContainer>
  );
};

EditToolbar.propTypes = {
  setRowModesModel: PropTypes.func.isRequired,
  setRows: PropTypes.func.isRequired,
  setSelectionModel: PropTypes.func.isRequired,
};

export default EditToolbar;