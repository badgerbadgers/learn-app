// TODO - add code to use loading statue to show a spinner or progress bar; add code to use error messages and provide feedback when errors are received.

import { Box, Button, useMediaQuery } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { addDays, format } from "date-fns";
import axios from "axios";
import AddItemForm from "./AddItemForm";
import CloseIcon from "@mui/icons-material/Close";
import CohortStartDatePicker from "./CohortStartDatePicker";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ScheduleItemBreak from "./ScheduleItemBreak";
import ScheduleItemLesson from "./ScheduleItemLesson";
import getData from "../../../../lib/getData";

export default function ScheduleModal({
  open,
  setOpen,
  id,
  cohortName,
  startDate,
  setStartDate,
}) {
  const [loading, setLoading] = useState(false);
  const [schedule, setSchedule] = useState([]);
  const [error, setError] = useState(null);
  const [updateScheduleError, setUpdateScheduleError] = useState(null);
  const [showFormIdx, setShowFormIdx] = useState(null);
  const [showFormType, setShowFormType] = useState();
  const [date, setDate] = useState(null);
  const [errorDate, setErrorDate] = useState(null);
  const matches_sx = useMediaQuery("(max-width: 600px)"); // TODO  - check this out when work with styling

  useEffect(() => {
    setDate(startDate);
  }, [startDate]);

  useEffect(() => {
    if (open) {
      try {
        setLoading(true);
        const fetchSchedule = async () => {
          const url = `/api/v1/cohorts/${id}/schedule`;
          const response = await getData({}, url);
          setSchedule(response.data);
        };
        fetchSchedule();
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
        setError(error.message);
      }
    }
  }, [id, open]);

  const updateStartDate = async (date) => {
    try {
      const url = `/api/v1/cohorts/${id}`;
      await axios.patch(url, { start_date: date });
      setStartDate(date);
    } catch (error) {
      console.error(error);
      setErrorDate(error.message);
    }
  };

  const updateSchedule = async (payload) => {
    try {
      const url = `/api/v1/cohorts/${id}/schedule`;
      const { data } = await axios.put(url, { schedule: payload });
      setSchedule(data.data);
    } catch (error) {
      console.error(error);
      setUpdateScheduleError(error.message);
    }
  };

  const removeItem = (idx) => {
    let newItems = [...schedule];
    newItems.splice(idx, 1);
    updateSchedule(newItems);
  };

  const insertItem = (idx, newItem) => {
    let newItems = [...schedule];
    newItems.splice(idx + 1, 0, newItem);
    updateSchedule(newItems);
    setShowFormIdx(null);
  };

  const updateItem = (idx, item) => {
    let newItems = [...schedule];
    newItems[idx] = item;
    updateSchedule(newItems);
  };

  const handleShowForm = (idx, formType) => {
    setShowFormIdx(idx);
    setShowFormType(formType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    !loading && (
      <Dialog
        disableEscapeKeyDown
        PaperProps={{
          sx: { width: "100%", height: "100%", p: 4, minWidth: "360px" },
        }}
        maxWidth="xl"
        open={open}
        onClose={handleClose}
      >
        <DialogTitle
          variant="Body2"
          sx={{
            fontWeight: "100",
            color: "#FF5C35",
            fontSize: matches_sx ? "24px" : "36px",
            justifyContent: "space-between",
            display: matches_sx ? "block" : "flex",
            width: "100%",
            mt: 1,
          }}
        >
          Current schedule for {cohortName}
          <Box
            sx={{
              mt: matches_sx ? 3 : 1,
              mb: matches_sx ? 3 : 1,
            }}
          >
            <CohortStartDatePicker
              id={id}
              date={date}
              setDate={setDate}
              updateDate={updateStartDate}
            />
          </Box>
        </DialogTitle>
        <DialogContent>
          {schedule &&
            schedule.map((week, idx) => {
              const showBreakBtns = idx < schedule.length - 1 ? true : false;
              const weekStartDate = date
                ? format(addDays(new Date(date), 7 * idx), "MMM dd, yyyy")
                : `week ${idx + 1}`;

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
                    {showFormIdx === idx && (
                      <AddItemForm
                        key={`form-${idx}`}
                        idx={idx}
                        saveItem={insertItem}
                        removeItem={removeItem}
                        sectionId={week.section._id}
                        type={showFormType}
                        cancel={setShowFormIdx}
                      />
                    )}
                  </Fragment>
                );
              } else if (week.type === "break" || week.type === "review") {
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
                    {showFormIdx === idx && (
                      <AddItemForm
                        key={`form-${idx}`}
                        idx={idx}
                        saveItem={insertItem}
                        removeItem={removeItem}
                        sectionId={week.section}
                        type={showFormType}
                        cancel={setShowFormIdx}
                      />
                    )}
                  </Fragment>
                );
              }
            })}

          <Button //TODO: add handle check for unsaved notes
            onClick={handleClose}
            variant="outlined"
            endIcon={<CloseIcon />}
            sx={{
              float: "right",
              mr: matches_sx ? "auto" : "3rem",
              my: matches_sx ? "20px" : "10px",
            }}
          >
            Close
          </Button>
        </DialogContent>
      </Dialog>
    )
  );
}
