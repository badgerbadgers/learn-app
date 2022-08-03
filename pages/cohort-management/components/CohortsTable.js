import * as React from 'react';
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



export default function CohortsTable({loading, tableRows, courses}) {
  const [rows, setRows] = React.useState(tableRows);
  const [rowModesModel, setRowModesModel] = React.useState({});


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
   width: 100,
   editable: true,
   },
  {
    field: 'courseName',
    headerName: 'Course',
    width: 160,
    type: "singleSelect",
    editable: true,
    valueOptions: courses,
  },
  {
    field: 'startDate',
    headerName: 'Start Date',
    type: 'date',
    width: 125,
    editable: true,
  },
  {
    field: 'endDate',
    headerName: 'End Date',
    type: 'date',
    width: 125,
    editable: true,
  },
  {
    field: 'week',
    headerName: 'Week',
    type: 'number',
    width: 100,
    editable: false,
  },
  {
    field: 'status',
    headerName: 'Status',
    type: 'number',
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
    editable: false,
  },
  {
    field: 'mentors',
    headerName: 'Mentors',
    type: 'number',
    width: 100,
    editable: false,
  },
  {
    field: 'actions',
    type: 'actions',
    headerName: 'Actions',
    sortable: false,
    width: 80,
    headerAlign: 'right',
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
            // key="1111111"
          />,
          <GridActionsCellItem
            icon={<CancelIcon />}
            label="Cancel"
            className="textPrimary"
            onClick={handleCancelClick(id)}
            color="inherit"
            // key="2222222"
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
          // key="3333333"
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={handleDeleteClick(id)}
          color="inherit"
          // key="4444444"
        />,
      ];
    },

    
  }];

  const EditToolbar = (props) => {
    const { setRows, setRowModesModel } = props;
  
    const handleClick = () => {
      const id = randomId();
      setRows((oldRows) => [...oldRows, { id, name: "", age: "", isNew: true }]);
      setRowModesModel((oldModel) => ({
        ...oldModel,
        [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" }
      }));
    };
  
    return (
      <GridToolbarContainer>
        <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
          Add record
        </Button>
      </GridToolbarContainer>
    );
  }
  
  EditToolbar.propTypes = {
    setRowModesModel: PropTypes.func.isRequired,
    setRows: PropTypes.func.isRequired
  };
  
  



  return (
    <Box sx={{ height: '500px', width: '100%' }}>
      <DataGrid
        loading={loading}
        rows={tableRows}
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
          toolbar: { setRows, setRowModesModel }
        }}
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
}
