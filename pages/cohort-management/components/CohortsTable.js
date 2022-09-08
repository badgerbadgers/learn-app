import { DataGrid, GridActionsCellItem, GridRowModes, GridToolbarContainer, } from "@mui/x-data-grid";
import React, { useEffect, useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import CancelIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import LinearProgress from '@mui/material/LinearProgress';
import PropTypes from "prop-types";
import SaveIcon from '@mui/icons-material/Save';
import { Stack } from '@mui/material';
import axios from "axios";
import { format } from "date-fns";
import { v4 as uuidv4 } from 'uuid'

const EditToolbar = (props) => {
  const { setRows, setRowModesModel, rows } = props;

  const handleClick = () => {
    const id = uuidv4();
    setRows((oldRows) => [...oldRows, { id, cohortName: "", courseName: "", students: "", isNew: true }]);

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


export default function CohortsTable({ loading, tableRows, courses }) {
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});

  useEffect(() => {
    setRows(tableRows)
  }, [tableRows]);

  const deleteCohort = async (cohortId) => {
    axios
      .delete(
        `/api/cohorts/${cohortId}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        console.log("Deleted Cohort:", res);
      })
      .catch((error) => {
        console.error("Error:", error);
      })
  }

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
    setRows([...rows,])
  };

  const handleDeleteClick = (id) => () => {
    deleteCohort(id)
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

  const processRowUpdate = async (newRow) => {
    const url = "/api/cohorts" + (newRow.isNew ? "" : `/${newRow.id}`);
    const updatedRow = {};
    try{
      await axios
      .post(
        url,
        {
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newRow),
        }
      )
      .then((response) => {
        const course = courses.find(item => item.value === newRow.courseName);
        updatedRow = {
          ...newRow,
          id: response.data._id,
          isNew: false,
          courseName: course.label,
          startDate: newRow.startDate ? format(new Date(newRow.startDate), "MMM dd, yyyy") : "",
          endDate: newRow.endDate ? format(new Date(newRow.endDate), "MMM dd, yyyy") : "",
          courseId: course.value,
        };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
      });
    }catch(error){
      console.error("Error:", error);
    };
    return updatedRow;
  };

  const columns = [
    {
      field: 'cohortName',
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
      minWidth: 250,
      type: "singleSelect",
      editable: true,
      headerAlign: 'center',
      valueOptions: courses,
      valueGetter: (params) => {
        if (params.row.courseName === "") {
          return "";
        }
        const id = params.id;
        return (rowModesModel[id] && rowModesModel[id].mode === GridRowModes.Edit) ? params.row.courseId : params.row.courseName;
      },
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
      field: 'seats',
      headerName: 'Students',
      type: 'string',
      width: 100,
      headerAlign: 'center',
      editable: true,
      valueGetter: (params) => {
        const id = params.id;
        const students = params.row.students || 0;
        const seats = params.row.seats || 0;
        return (rowModesModel[id] && rowModesModel[id].mode === GridRowModes.Edit) ? seats : `${students}/${seats}`;
      }
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
        rowsPerPageOptions={[5, 15, 100]}
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
        onProcessRowUpdateError={(error) => console.log("ERROR", error)}
        componentsProps={{
          toolbar: { setRows, setRowModesModel, rows }
        }}
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
}
