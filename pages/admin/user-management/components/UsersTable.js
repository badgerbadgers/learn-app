import {
  DataGrid,
  GridActionsCellItem,
  GridRowModes,
  GridToolbarContainer,
  //GridSelectionModel,
} from "@mui/x-data-grid";
import React, { useCallback, useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CancelIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import LinearProgress from "@mui/material/LinearProgress";
import PropTypes from "prop-types";
import SaveIcon from "@mui/icons-material/Save";
import Snackbar from "@mui/material/Snackbar";
import {  Stack } from "@mui/material";
import axios from "axios";
import { format } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
import makeStyles from "@mui/styles/makeStyles";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Popover from "@mui/material/Popover";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";


const useStyles = makeStyles({
  disabled: {
    opacity: 0.3,
  },  
});

const EditToolbar = (props) => {
  const { setRows, setRowModesModel, rows, selectionModel, cohorts } = props;
  const [snackbar, setSnackbar] = useState(null);
  
  //for Popover
  const [anchorEl, setAnchorEl] = useState(null);
  const [cohortSelected, setCohortSelected] = useState(null);
  const [radioGroupSelected, setRadioGroupSelected] = useState("student");
  

  const handleClickPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setCohortSelected(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

 const handleCohortChange = (event, selectedOption) =>{
    !selectedOption
      ? setCohortSelected(null)
      : setCohortSelected(selectedOption.value); 
    
  }

  //for add to cohort button
  
  const handleAddToCohort = async () => {
     const cohortId = cohortSelected;
     console.log(cohortSelected);
    axios
      .put(`/api/cohorts/${cohortId}`, {
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cohortId),
        
      }).then(res => {
        console.log(res.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
      
    setSnackbar({
      children: "User successfully added to cohort",
      severity: "success",
    });
  };

  //for edit or update user
  const handleClick = () => {
    const id = uuidv4();
    setRows((oldRows) => [...oldRows, { id, gh: "", isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "gh" },
    }));
  };
  

 //console.log("selectedOption", selectedOption);
 console.log("cohortSelected", cohortSelected);
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
                handleCohortChange(event, selectedOption)
              }}
            />
            <Box sx={{ mt: 2 }}>
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">
                  Add as:
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="student"
                  name="radio-buttons-group"
                  onChange={(event, value) => {
                    setRadioGroupSelected(value);
                    console.log("value", value);
                  }}
                >
                  <FormControlLabel
                    value="student"
                    control={<Radio />}
                    label="Student"
                  />
                  <FormControlLabel
                    value="mentor"
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
                <Button variant="contained" onClick={handleAddToCohort}>
                  Add To Cohort
                </Button>
              )}
            </Box>
          </Box>
        </Popover>
      </Box>
    </GridToolbarContainer>
  );
};

EditToolbar.propTypes = {
  setRowModesModel: PropTypes.func.isRequired,
  setRows: PropTypes.func.isRequired,
  setSelectionModel: PropTypes.func.isRequired,
};

export default function StudentsTable({ loading, tableRows, cohorts }) {
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  const [snackbar, setSnackbar] = useState(null);
  const router = useRouter();
  const [filterValue, setFilterValue] = useState("");
  const classes = useStyles();
  const [selectionModel, setSelectionModel] = useState([]);
  useEffect(() => {
    setRows(tableRows);
  }, [tableRows]);

  const deleteStudent = async (userId) => {
    axios
      .delete(`/api/users/${userId}`, {
        headers: { "Content-Type": "application/json" },
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    setRows([...rows]);
  };

  const handleDeleteClick = (id) => () => {
    deleteStudent(id);
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = async (newRow, oldRow) => {
    // If the row is new, add it to the server. If the row is not new, update it on the server
    const url = "/api/users" + (newRow.isNew ? "" : `/${newRow.id}`);
    const updatedRow = {};
    try {
      await axios[newRow.isNew ? "post" : "put"](url, {
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRow),
      }).then((response) => {
        updatedRow = {
          ...newRow,
          id: response.data.data._id,
          isNew: false,
          //recordCreated: newRow.recordCreated ? format(new Date(newRow.recordCreated), "MMM dd, yyyy") : "",
        };
        setSnackbar({
          children: "Student successfully saved",
          severity: "success",
        });
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
      });
    } catch (error) {
      const errorMessage = Object.values(error.response.data.message)[0];
      console.error("Error:", error.response.data);
      throw new Error(errorMessage);
    }
    return updatedRow;
  };

  const handleCloseSnackbar = () => setSnackbar(null);
  const handleProcessRowUpdateError = useCallback((error) => {
    setSnackbar({ children: error.message, severity: "error" });
  }, []);

  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: 100,
      editable: true,
      headerAlign: "center",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      minWidth: 200,
      editable: true,
      headerAlign: "center",
    },
    {
      field: "gh",
      headerName: "Github",
      flex: 1,
      minWidth: 100,
      editable: true,
      headerAlign: "center",
    },
    {
      field: "recordCreated",
      headerName: "Record Created",
      type: "date",
      flex: 1,
      minWidth: 100,
      editable: false,
      renderCell: (params) => {
        return (
          <div
            className={
              rowModesModel[params.row.id]?.mode === GridRowModes.Edit
                ? classes.disabled
                : null
            }
          >
            {params.value}
          </div>
        );
      },
      headerAlign: "center",
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      width: 150,
      editable: false,
      renderCell: (params) => {
        return (
          <div
            className={
              rowModesModel[params.row.id]?.mode === GridRowModes.Edit
                ? classes.disabled
                : null
            }
          >
            {params.value}
          </div>
        );
      },
      headerAlign: "center",
      align: "center",
    },
    {
      field: "lastLogin",
      headerName: "Last Login",
      flex: 1,
      width: 100,
      editable: false,
      renderCell: (params) => {
        return (
          <div
            className={
              rowModesModel[params.row.id]?.mode === GridRowModes.Edit
                ? classes.disabled
                : null
            }
          >
            {params.value}
          </div>
        );
      },
      headerAlign: "center",
      align: "center",
    },

    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      sortable: false,
      width: 80,
      headerAlign: "center",
      align: "right",
      cellClassName: "actions",
      getActions: ({ id, row }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id, row)}
              key={id}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
              key={id}
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id, row)}
            color="inherit"
            key={id}
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
            key={id}
          />,
        ];
      },
    },
  ];

  return (
    <Box sx={{ height: "500px", width: "100%" }}>
      <DataGrid
        loading={loading}
        rows={rows}
        columns={columns}
        rowsPerPageOptions={[5, 15, 100]}
        checkboxSelection
        disableSelectionOnClick
        onSelectionModelChange={(newSelectionModel) => {
          console.log(newSelectionModel);
          setSelectionModel(newSelectionModel);
        }}
        selectionModel={selectionModel}
        components={{
          Toolbar: EditToolbar,
          autoPageSize: true,
          LoadingOverlay: LinearProgress,
          NoRowsOverlay: () => (
            <Stack height="100%" alignItems="center" justifyContent="center">
              So far, there are no students here. Would you like to create one?
            </Stack>
          ),
          NoResultsOverlay: () => (
            <Stack height="100%" alignItems="center" justifyContent="center">
              Local filter returns no result
            </Stack>
          ),
        }}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowEditStart={handleRowEditStart}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={handleProcessRowUpdateError}
        componentsProps={{
          toolbar: {
            setRows,
            setRowModesModel,
            rows,
            cohorts,
            setSelectionModel,
            selectionModel,
          },
        }}
        experimentalFeatures={{ newEditingApi: true }}
      />
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
  );
}
