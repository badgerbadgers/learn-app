import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Stack } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';

// TODO: responsive width
const columns = [
  { field: 'cohortName',
   headerName: 'Cohort',
   width: 100 },
  {
    field: 'courseName',
    headerName: 'Course',
    width: 100,
    editable: true,
  },
  {
    field: 'startDate',
    headerName: 'Start Date',
    width: 150,
    editable: true,
  },
  {
    field: 'endDate',
    headerName: 'End Date',
    width: 150,
    editable: true,
  },
  {
    field: 'week',
    headerName: 'Week',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'status',
    headerName: 'Status',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'students',
    headerName: 'Students',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'mentors',
    headerName: 'Mentors',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'archive',
    headerName: 'Archive',
    sortable: false,
    width: 90,
  },
];


export default function CohortsTable({loading, tableRows}) {

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        loading={loading}
        rows={tableRows}
        columns={columns}
        pageSize={5}
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
