import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import AddItemForm from "./AddItemForm";
import AddWeekBtns from "./AddWeekBtns";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";

export default function ScheduleItemBreak({
  idx,
  startDate,
  weekType,
  content,
  sectionId,
  showBreakBtns,
  handleShowForm,
  updateItem,
  removeItem }) {

  const [loading, setLoading] = useState(true);
  const [formView, setFormView] = useState(false);

  useEffect(() => {
    setLoading(false)
  }, []);

  if (formView) {
    return <AddItemForm
      saveItem={
        (idx, item) => {
          setFormView(false);
          updateItem(idx, item);
        }
      }
      idx={idx}
      sectionId={sectionId}
      note={content}
      type={weekType}
    />
  }

  return (!loading && <Box
  mb={2}
    sx={{
      height: "112px",
      width: "100%",
      display: "block",
      justifyContent: "flex-end",
      // border: "1px solid green",
      height: "auto"
    }}
  >
    <Box sx={{
      fontSize: "14px",
      display: "inline-block",
      color: "#bababa",
      width: "110px",
      height: "100%",
      
    }}> 
    {startDate}
    </Box>
    <Box sx={{
      p: 2,
      display: "inline-grid",
      width: "calc(100% - 110px)",
      // backgroundColor: "silver",
      height: "auto",
      lineHeight: "63px",
      border: "0.5px solid #D9D9D9",
      gridTemplateColumns:  "2fr 7fr 72px",
    }}>
      <Typography mr={2}
        variant="overline"
        sx={{
          display: "inline-block",
          minWidth: "30%",
          color: "#12284C",
          fontFamily: "Montserrat",
          alignSelf: "center",
        }}>
        {weekType}
      </Typography>
      <Typography
        sx={{
          pr: 4,
          display: "inline-block",
          wordBreak: "break-all",
          maxHeight: "150px",
          overflowY: "auto",        
        }}>
        {content || ""} {/* Add text like "There is no note for students" */}
      </Typography>

      <Stack direction="row" alignItems="center" spacing={1}
        sx={{
          width: "72px",
        }}>
        <IconButton 
        aria-label="edit" 
        size="small"
        onClick={() => { setFormView(true) }}
        sx={{
          display: "inline-grid",
          alignSelf: "center",
        }}

        >
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton 
        aria-label="delete" 
        size="small"
        onClick={() => { removeItem(idx) }}

 >
          <DeleteIcon fontSize="small" />
        </IconButton> 
      </Stack>
    </Box>
    {
      showBreakBtns &&
      <AddWeekBtns
        idx={idx}
        handleShowForm={handleShowForm}
        mt={2}
        sx={{
          display: "flex",
          width: "calc(100% - 110px)",
        }}
      />
    }
  </Box>)
}