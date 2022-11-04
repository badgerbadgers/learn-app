import { Fragment, useEffect, useState } from "react";
import { addDays, format } from "date-fns"

import AddItemForm from "./AddItemForm";
import { Button } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import CohortStartDatePicker from "./CohortStartDatePicker";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ScheduleItemBreak from "./ScheduleItemBreak";
import ScheduleItemLesson from "./ScheduleItemLesson";

export default function ScheduleModal({ open, setOpen, id, cohortName, startDate, schedule, setSchedule }) {

  const [loading, setLoading] = useState(true);
  const [showFormIdx, setShowFormIdx] = useState(null);
  const [showFormType, setShowFormType] = useState();

  useEffect(() => {
    setLoading(false)
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [schedule]);

  const updateCohortSchedule = async (newItems) => {
    const url = "/api/cohorts/";
    await fetch(url + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItems)
    })
  }

  const removeItem = (idx) => {
    let newItems = [...schedule];
    newItems.splice(idx, 1);
    setSchedule(newItems);
    updateCohortSchedule(newItems);
  }

  const insertItem = (idx, newItem) => {
    let newItems = [...schedule];
    newItems.splice(idx + 1, 0, newItem);
    setShowFormIdx(null);
    setSchedule(newItems);
    updateCohortSchedule(newItems);
  }

  const updateItem = (idx, item) => {
    let newItems = [...schedule];
    newItems[idx] = item;
    setSchedule(newItems);
    updateCohortSchedule(newItems);
  }

  const handleShowForm = (idx, formType) => {
    setShowFormIdx(idx);
    setShowFormType(formType);
  }

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
            color: "#FF5C35",
            fontSize: "36px",
            justifyContent: "space-between",
            display: "flex",
            width: "100%",
            mt: 1,
          }}>
          Current schedule for {cohortName}
          <CohortStartDatePicker
            id={id}
            startDate={startDate}
          />
        </DialogTitle>


        <DialogContent >
          {schedule.map((week, idx) => {
            const showBreakBtns = (idx < schedule.length - 1) ? true : false;
            const weekStartDate = startDate ? format(addDays(new Date(startDate), 7 * idx), "MMM dd, yyyy") : `week ${idx + 1}`;
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
                  {showFormIdx === idx && <AddItemForm
                    key={`form-${idx}`}
                    idx={idx}
                    saveItem={insertItem}
                    removeItem={removeItem}
                    sectionId={week.section._id}
                    type={showFormType}
                  />}
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
                    removeItem={removeItem}
                    updateItem={updateItem}
                  />
                  {showFormIdx === idx && <AddItemForm
                    key={`form-${idx}`}
                    idx={idx}
                    saveItem={insertItem}
                    removeItem={removeItem}
                    sectionId={week.section}
                    type={showFormType}
                  />}
                </Fragment>
              )
            }

          })
          }

          <Button //TODO: add handle check for unsaved notes
            onClick={handleClose}
            variant="outlined"
            endIcon={<CloseIcon />}
            sx={{
              float: "right",
              mr: "3rem"
            }}
          >Close</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
