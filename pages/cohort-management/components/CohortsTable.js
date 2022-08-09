import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridActionsCellItem, GridToolbarContainer, GridRowModes, } from "@mui/x-data-grid";
import { Stack } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import Button from "@mui/material/Button";
import PropTypes from "prop-types";

 
const EditToolbar = (props) => {
  const { setRows, setRowModesModel, rows } = props;

  const handleClick = () => {
    const id = rows.length;
    setRows((oldRows) => [...oldRows, { id, cohortName: "", courseName: [""], students: "", isNew: true }]);
    
    setRowModesModel((oldModel) => ({
        ...oldModel,
        [id]: { mode: GridRowModes.Edit, fieldToFocus: "cohortName" },
      }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add Cohort
      </Button>
    </GridToolbarContainer>
  );
}

EditToolbar.propTypes = {
  setRowModesModel: PropTypes.func.isRequired,
  setRows: PropTypes.func.isRequired
};


export default function CohortsTable({loading, tableRows, courses}) {
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});

  useEffect(() => {
    setRows(tableRows)
  }, [tableRows]);

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
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true }
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

// TODO: responsive width
const columns  = [
  { field: 'cohortName',
   headerName: 'Cohort',
   flex: 1,
   minWidth: 100,
   editable: true,
   headerAlign: 'center',
   },
  {
    field: 'courseName',
    headerName: 'Course',
    flex: 1, 
    minWidth: 100,
    type: "singleSelect",
    editable: true,
    headerAlign: 'center',
    valueOptions: [...courses, ""],
  },
  {
    field: 'startDate',
    headerName: 'Start Date',
    type: 'date',
    flex: 1,
    width: 125,
    headerAlign: 'center',
    editable: true,
  },
  {
    field: 'endDate',
    headerName: 'End Date',
    flex: 1,
    type: 'date',
    width: 125,
    headerAlign: 'center',
    editable: true,
  },
  {
    field: 'week',
    headerName: 'Week',
    flex: 1,
    type: 'number',
    width: 100,
    headerAlign: 'center',
    editable: false,
  },
  {
    field: 'status',
    headerName: 'Status',
    flex: 1,
    width: 110,
    editable: false,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'students',
    headerName: 'Students',
    type: 'number',
    width: 100,
    headerAlign: 'center',
    editable: false,
  },
  {
    field: 'mentors',
    headerName: 'Mentors',
    type: 'number',
    width: 100,
    headerAlign: 'center',
    editable: false,
  },
  {
    field: 'actions',
    type: 'actions',
    headerName: 'Actions',
    sortable: false,
    width: 80,
    headerAlign: 'center',
    align: 'right',
    cellClassName: 'actions',
    getActions: ({ id }) => {
      const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
      if (isInEditMode) {
        return [
          <GridActionsCellItem
            icon={<SaveIcon />}
            label="Save"
            onClick={handleSaveClick(id)}
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
          onClick={handleEditClick(id)}
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

    
  }];

  

  return (
    <Box sx={{ height: '500px', width: '100%' }}>
      <DataGrid
        loading={loading}
        rows={rows}
        columns={columns}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        components={{
          Toolbar: EditToolbar,
          autoPageSize: true,
          LoadingOverlay: LinearProgress,
          NoRowsOverlay: () => (
            <Stack height="100%" alignItems="center" justifyContent="center">
              So far, there are no cohorts here. Would you like to create one?
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
        componentsProps={{
          toolbar: { setRows, setRowModesModel, rows }
        }}
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
}
