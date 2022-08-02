import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { Stack } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';


export default function CohortsTable({loading, tableRows, courses}) {

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
    editable: true,
  },
  {
    field: 'status',
    headerName: 'Status',
    type: 'number',
    width: 110,
    editable: true,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'students',
    headerName: 'Students',
    type: 'number',
    width: 100,
    editable: true,
  },
  {
    field: 'mentors',
    headerName: 'Mentors',
    type: 'number',
    width: 100,
    editable: true,
  },
  {
    field: 'archive',
    headerName: 'Archive',
    sortable: false,
    width: 80,
    headerAlign: 'right',
    align: 'right',
  },
];

  return (
    <Box sx={{ height: '500px', width: '100%' }}>
      <DataGrid
        loading={loading}
        rows={tableRows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        components={{
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
      />
    </Box>
  );
}
