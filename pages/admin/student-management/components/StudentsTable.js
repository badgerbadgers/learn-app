import { DataGrid, GridActionsCellItem, GridRowModes, GridToolbarContainer } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
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
import { Stack } from "@mui/material";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
import makeStyles from "@mui/styles/makeStyles";
import { useSnackbar } from "material-ui-snackbar-provider";

const useStyles = makeStyles({
  disabled: {
    opacity: 0.3,
  },
});

const EditToolbar = (props) => {
  const snackbar = useSnackbar();
  const { setRows, setRowModesModel, rows } = props;
  const handleClick = () => {
    const id = uuidv4();
    setRows((oldRows) => [...oldRows, { id, gh: "", isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "gh" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add Student
      </Button>
    </GridToolbarContainer>
  );
};

EditToolbar.propTypes = {
  setRowModesModel: PropTypes.func.isRequired,
  setRows: PropTypes.func.isRequired,
};

export default function StudentsTable({ loading, tableRows }) {
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  const router = useRouter();
  const [filterValue, setFilterValue] = useState("");
  const classes = useStyles();
  const snackbar = useSnackbar();

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
        snackbar.showMessage(
          <Alert
            severity="success"
            sx={{
              width: 300,
            }}
          >
            Student successfully saved
          </Alert>
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
    snackbar.showMessage(
      <Alert
        severity="error"
        sx={{
          width: 300,
        }}
      >
        Error adding student
      </Alert>
    );
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
          toolbar: { setRows, setRowModesModel, rows },
        }}
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
}