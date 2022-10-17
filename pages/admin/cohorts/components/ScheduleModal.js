import * as React from 'react';

import { Grid, Typography } from '@mui/material';
// import { addDays, format } from 'date-fns/esm';
import { addDays, format } from 'date-fns'

import Button from '@mui/material/Button';
import CohortStartDatePicker from './CohortStartDatePicker';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ScheduleItem from './ScheduleItemLesson';
import ScheduleItemBreak from './ScheduleItemBreak';
import TextField from '@mui/material/TextField';

export default function ScheduleModal({ open, setOpen, id, cohortName, startDate, schedule }) {
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

  console.log("cohort", id, cohortName, startDate, schedule)

  const insertItem = (idx, content, section, type) => {
    let newItem = {
      type,
      content,
      section
    }
    schedule.splice(idx + 1, newItem)

  }


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>

      <Dialog

        PaperProps={{ sx: { width: "100%", height: "100%", p: 4 } }}
        maxWidth="xl"
        open={open}
        onClose={handleClose}>
        <DialogTitle
          component="div"
          variant="Body2"

          sx={{
            fontFamily: "Gotham Rounded",
            fontWeight: "100",
            color: '#FF5C35',
            fontSize: "36px",
            justifyContent: "space-between",
            display: 'flex',
            // media q or responsive fz
            width: '100%',
            mt: 1,
          }}>
          Current schedule for {cohortName}
          <CohortStartDatePicker
            id={id}
            startDate={startDate}
          />
        </DialogTitle>


        <DialogContent >
          <Grid >
            {schedule.map((week, idx) => {
              const showBreakBtns = (idx < schedule.length - 1) ? true : false;
              console.log("week", week);

              const weekStartDate = startDate ? format(addDays(new Date(startDate), 7 * idx), 'MMM dd, yyyy') : `week ${idx + 1}`;
              if (week.type === "lesson") {
                return (
                  <ScheduleItem
                    key={idx}
                    id={id}
                    idx={idx}
                    lesson={week.lesson.title}
                    lessonStartDate={weekStartDate}
                    itemType={week.type}
                    sectionTitle={week.section.title}

                    showBreakBtns={showBreakBtns}
                    insertItem={insertItem}
                  />
                )

              }

              return (
                <ScheduleItemBreak
                key={idx}
                id={id}
                idx={idx}
                startDate={weekStartDate}
                weekType={week.type}
                content={week.content}
                sectionId={week.section._id} 
                sectionTitle={week.section.title}
                showBreakBtns={showBreakBtns}
                insertItem={insertItem}>
                </ScheduleItemBreak>

              )
            })
            }
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="outlined" onClick={handleClose}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
