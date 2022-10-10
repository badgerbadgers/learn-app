import * as React from 'react';

import Button from '@mui/material/Button';
import CohortStartDatePicker from './CohortStartDatePicker';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

export default function ScheduleModal({open, setOpen, cohort}) {
  // const [fullWidth, setFullWidth] = useState(true);
  // const [maxWidth, setMaxWidth] = useState('sm');

  // const handleMaxWidthChange = (event) => {
  //   setMaxWidth(
  //     // @ts-expect-error autofill of arbitrary value is not handled.
  //     event.target.value,
  //   );
  // };

  // const handleFullWidthChange = (event) => {
  //   setFullWidth(event.target.checked);
  // };


  console.log("cohort", cohort);
  console.log("coh sch", cohort.schedule);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      
      <Dialog 
      
      PaperProps={{ sx: { width: "100%", height: "100%", p:4 } }}
      // fullWidth={true}
      // maxWidth={true}
      maxWidth="xl"
      open={open} 
      onClose={handleClose}>
        <DialogTitle
        component="div"
        variant="Body2"

         sx={{ 
          fontFamily: "Gotham Rounded",
          fontWeight: "100",
          // fontSize: "1.5rem", 
          color:'#FF5C35',
          fontSize: "36px",
          // backgroundColor:"green",
          justifyContent:"space-between",
      display:'flex',
          // media q or responsive fz
          width: '100%',
          mt: 1,
          }}> 
            Current schedule for {cohort.cohort_name} 
            <CohortStartDatePicker cohort={cohort}/>
            </DialogTitle> 
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
