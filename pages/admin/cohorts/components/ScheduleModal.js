import { Fragment, useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
// import { addDays, format } from 'date-fns/esm';
import { addDays, format } from 'date-fns'

import AddItemForm from './AddItemForm';
import Button from '@mui/material/Button';
import CohortStartDatePicker from './CohortStartDatePicker';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ScheduleItemBreak from './ScheduleItemBreak';
import ScheduleItemLesson from './ScheduleItemLesson';
import TextField from '@mui/material/TextField';

export default function ScheduleModal({ open, setOpen, id, cohortName, startDate, schedule, setSchedule }) {


  const [loading, setLoading] = useState(true);
  const [showFormIdx, setShowFormIdx] = useState(null);

  useEffect(() => {
      setLoading(false)
  }, []);

  useEffect(() => {
      setLoading(false);
      console.log(schedule);
  }, [schedule]);


  console.log("cohort", id, cohortName, startDate, schedule)
  
  const updateCohortSchedule = async (idx, newItems) => {
    const url = "/api/cohorts/";
    await fetch(url+id, {  
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItems)
      })
  }


  const  removeItem = (idx) => {
    let newItems = [...schedule];
    newItems.splice(idx, 1);
    setSchedule(newItems);
    updateCohortSchedule(idx, newItems); 
  }


  const  insertItem = (idx, newItem) => {
    let newItems = [...schedule];
    newItems.splice(idx + 1, 0, newItem);
    setShowFormIdx(null);
    setSchedule(newItems);
    updateCohortSchedule(idx, newItems); 
  }

  const handleShowForm = (idx) => {
    setShowFormIdx(idx === showFormIdx ? null : idx);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    !loading && <div>

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
                  <Fragment key={idx}>
                    <ScheduleItemLesson
                      key={idx}
                      id={id}
                      idx={idx}
                      lesson={week.lesson.title}
                      lessonStartDate={weekStartDate}
                      itemType={week.type}
                      sectionTitle={week.section.title}
                      showBreakBtns={showBreakBtns}
                      handleShowForm={handleShowForm}
                      insertItem={insertItem}
                     
                    />
                    {showFormIdx === idx && <AddItemForm key={`form-${idx}`} idx={idx} insertItem={insertItem} removeItem={removeItem} sectionId={week.section._id}   />}
                </Fragment>
                )

              } else if (week.type == "break" || week.type == "review") {
                return (
                <Fragment key={idx}>
                  <ScheduleItemBreak
                    key={idx}
                    id={id}
                    idx={idx}
                    startDate={weekStartDate}
                    weekType={week.type}
                    content={week.content}
                    sectionId={week.section} 
                    showBreakBtns={showBreakBtns}
                    handleShowForm={handleShowForm}
                    insertItem={insertItem}
                    removeItem={removeItem}>
                  </ScheduleItemBreak>
                  {showFormIdx === idx && <AddItemForm key={`form-${idx}`} idx={idx} insertItem={insertItem} removeItem={removeItem} sectionId={sectionId}/>}
                </Fragment>
                )
              }

            })
            }
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}
