import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Stack } from '@mui/material';

  
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



const rows = [
  // { id: 1,
  //   cohortName:'Alpaca',
  //   courseName: 'React',
  //   startDate: '01/26/2022',
  //   endDate:'11/12/2022',
  //   week: '8/30',
  //   status: 'in progress',
  //   students: '45/44',
  //   mentors: '0/0',
  //   archive:'archive' },
  //   {id: 2,
  //   cohortName:'Alpaca',
  //   courseName: 'React',
  //   startDate: '01/26/2022',
  //   endDate:'11/12/2022',
  //   week: '8/30',
  //   status: 'in progress',
  //   students: '45/44',
  //   mentors: '0/0',
  //   archive:'archive' },
    // { 
    //  id: 3,
    // cohortName:'Alpaca',
    // courseName: 'React',
    // startDate: '01/26/2022',
    // endDate:'11/12/2022',
    // week: '8/30',
    // status: 'in progress',
    // students: '45/44',
    // mentors: '0/0',
    // archive:'archive' },

];

export default function CohortsTable({tableRows}) {
  console.log(tableRows, '<====tableRows inside component')


  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={tableRows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        components={{
          NoRowsOverlay: () => (
            <Stack height="100%" alignItems="center" justifyContent="center">
              So far, there are no cohorts here. Would you like to create one?
            </Stack>
          ),
          NoResultsOverlay: () => (
            <Stack height="100%" alignItems="center" justifyContent="center">
              Local filter returns no result
            </Stack>
          )
        }}
      />
    </Box>
  );
}







  // createData('Alpaca', 'Rails', '01/26/2022','11/12/2022','8/30','in progress', '45/44', '0/0', 'archive'),
  // createData('Albatross', 'React', '01/26/2022','11/12/2022','0/30','upcoming', '30/30', '0/0', 'archive'),
  // createData('Borr', 'Intro to Programming', '01/26/2022','11/12/2022','29/30','rescheduled', '12/10', '0/0', 'archive'),
  // createData('Sparrow', 'React', '01/26/1704','11/12/1704','8/15','completed', '115/44', '0/0', 'archive'),


