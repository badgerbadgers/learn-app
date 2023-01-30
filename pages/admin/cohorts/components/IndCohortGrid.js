import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import LinearProgress from "@mui/material/LinearProgress";
import { Stack } from "@mui/material";

export default function IndCohortGrid({ loading, students }) {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows(students)
  }, [students]);

  const columns = [
    {
      field: "firstName",
      headerName: "First Name",
      flex: 1,
      editable: false,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      flex: 1,
      editable: false,
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
      editable: false,
    },
    {
      field: "progress",
      headerName: "Progress",
      editable: false,
    },
    {
      field: "lastSubmission",
      headerName: "Last Submission",
      flex: 1,
      type: "date",
      headerAlign: "center",
      editable: false,
    },
    {
      field: "studentAdded",
      headerName: "Student Added",
      flex: 1,
      type: "date",
      headerAlign: "center",
      editable: false,
    },
    {
      field: "lastLogin",
      headerName: "Last Login",
      flex: 1,
      type: "date",
      headerAlign: "center",
      editable: false,
    },
    {
      field: "notes",
      headerName: "Notes",
    }];

  return (
    <Box sx={{
      height: "calc(100vh - 64px - 3rem - 3rem)", //100% - header - data grid title - footer
      width: "100%",
      mb: "4rem",
    }}>
      <DataGrid
        rows={rows}
        columns={columns}
        rowsPerPageOptions={[5, 15, 100]}
        checkboxSelection
        disableSelectionOnClick
        components={{
          autoPageSize: true,
          LoadingOverlay: LinearProgress,
          NoRowsOverlay: () => (
            <Stack height="100%" alignItems="center" justifyContent="center">
              So far, there are no students in this cohort
            </Stack>
          ),
          NoResultsOverlay: () => (
            <Stack height="100%" alignItems="center" justifyContent="center">
              Local filter returns no result
            </Stack>
          ),
        }}
        editMode="row"
        componentsProps={{
          pagination: {
            SelectProps: {
              MenuProps: {
                sx: {
                  "& .MuiMenuItem-root": {
                    fontSize: "0.9rem"
                  }
                }
              }
            }
          },
        }}

        experimentalFeatures={{ newEditingApi: true }}

        sx={{
          "*, .MuiSelect-outlined, .MuiInputBase-input": {
            fontFamily: "Montserrat",
            fontSize: "0.9rem",
          },
          ".MuiTablePagination-selectLabel": {  // pagination label
            fontFamily: "Montserrat",
          },
        }}
      />
    </Box>
  );
}