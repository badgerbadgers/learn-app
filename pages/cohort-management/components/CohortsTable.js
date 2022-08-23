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
import axios from "axios";


const EditToolbar = (props) => {
  const { setRows, setRowModesModel, rows } = props;

  const handleClick = () => {
    const id =  Math.floor(Math.random()*100);
    console.log(id, 'id in new');
    setRows((oldRows) => [...oldRows, { id, cohortName: "", courseName: "", students: [], mentors: [], isNew: true }]);

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

  const createBasicSchedule = async () => {
    console.log("creating a new schedule")

  }

  const handleRowEditStart = (params, event) => {
    console.log("handleRowEditStart", params);
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop = (params, event) => {
    console.log(params, 'params in handleRowEditStop')
    event.defaultMuiPrevented = true;
  };

  const handleEditClick = (id) => () => {
    console.log(id, 'id in  handleEditClick')
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id, row) => () => {
    // const updatedRow = rows.find(element => element.id == id);
    console.log(id, row, "ID in handleSaveClick");
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    setRows([...rows, ])
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
    console.log("NEW ROW", JSON.stringify(newRow));
    axios
      .post(
        "/api/cohorts",
        {
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newRow),
        }
      )
      .then((res) => {
        console.log("response message");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    const course = courses.find(item => item.value === newRow.courseName);
    console.log("COURSE:", course, courses);
    const updatedRow = { ...newRow, isNew: false, courseName: course.label };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };


  // TODO: responsive width
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
      // valueSetter: (params) => {
      //   console.log("****valueSetter", params);
      //   const newVal = params.row.courseName;
      //   console.log('newVal', newVal)
      //   return { ...params.row, newVal};
      // },
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
        rowsPerPageOptions={[5, 15,100]}
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
