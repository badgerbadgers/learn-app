import {
  DataGrid,
  GridActionsCellItem,
  GridRowModes,
} from "@mui/x-data-grid";
import React, { useCallback, useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import CancelIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import LinearProgress from "@mui/material/LinearProgress";
import SaveIcon from "@mui/icons-material/Save";
import { useSnackbar } from "material-ui-snackbar-provider";
import {  Stack } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import makeStyles from "@mui/styles/makeStyles";
import EditToolbar from "./EditToolbar";


const useStyles = makeStyles({
  disabled: {
    opacity: 0.3,
  },  
});

export default function UsersTable({ loading, tableRows, cohorts }) {
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  const snackbar = useSnackbar();
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
      await axios[newRow.isNew ? "post" : "put"](url, newRow, {
        headers: { "Content-Type": "application/json" },
       
      }).then((response) => {
        updatedRow = {
          ...newRow,
          id: response.data.data._id,
          isNew: false,
          //recordCreated: newRow.recordCreated ? format(new Date(newRow.recordCreated), "MMM dd, yyyy") : "",
        };
        snackbar.showMessage(
          <Alert severity="success">User successfully saved.</Alert>
        );
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
      });
    } catch (error) {
      const errorMessage = Object.values(error.response.data.message)[0];
      console.error("Error:", error.response.data);
      throw new Error(errorMessage);
    }
    return updatedRow;
  };

  const handleProcessRowUpdateError = () => {
    snackbar.showMessage(<Alert severity="error">Error adding user</Alert>);
  };

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
      field: "record_created",
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
      field: "last_seen",
      headerName: "Last Seen",
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
    </Box>
  );
}
