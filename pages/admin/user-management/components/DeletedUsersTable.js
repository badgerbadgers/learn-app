import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import UnDeleteIcon from "@mui/icons-material/RestoreFromTrashOutlined";
import LinearProgress from "@mui/material/LinearProgress";
import { useSnackbar } from "material-ui-snackbar-provider";
import { Stack } from "@mui/material";
import axios from "axios";

export default function UsersTable({ loading, tableRows }) {
  const [rows, setRows] = useState([]);
  const snackbar = useSnackbar();
  useEffect(() => {
    setRows(tableRows);
  }, [tableRows]);

  const unDeleteUser = async (userId) => { 
    const undeletedRow = rows.find((obj) => obj.id === userId);
    const name = undeletedRow ? undeletedRow.name : null; 
    try {
    const response = await axios.patch(`/api/v1/users/${userId}`, {deleted_at: null},  {headers: { "Content-Type": "application/json" }}, 
       )
      snackbar.showMessage(
        <Alert severity="success">User {name} successfully undeleted.</Alert>
      );
    } catch (error) {
      console.error("Error:", error);
      snackbar.showMessage(<Alert severity="error">Could not undelete {name}.</Alert>);
    }
  };

  const handleUnDeleteClick = (id) => () => {
    unDeleteUser(id);
    setRows(rows.filter((row) => row.id !== id));
  };

  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: 100,
      headerAlign: "center",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      minWidth: 200,
      headerAlign: "center",
    },
    {
      field: "gh",
      headerName: "Github",
      flex: 1,
      minWidth: 100,
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
        params.value;
      },
      headerAlign: "center",
    },

    {
      field: "is_admin",
      headerName: "Is Admin",
      flex: 1,
      width: 150,
      editable: false,
      renderCell: (params) => {
        params.value;
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
        return [
          <GridActionsCellItem
            icon={<UnDeleteIcon />}
            label="UnDelete"
            onClick={handleUnDeleteClick(id)}
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
        components={{
          autoPageSize: true,
          LoadingOverlay: LinearProgress,
          NoRowsOverlay: () => (
            <Stack height="100%" alignItems="center" justifyContent="center">
              So far, there are no deleted users here.
            </Stack>
          ),
          NoResultsOverlay: () => (
            <Stack height="100%" alignItems="center" justifyContent="center">
              Local filter returns no result
            </Stack>
          ),
        }}
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
}