import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
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

  const matches_md = useMediaQuery("(max-width: 1500px)");
  const matches_sx = useMediaQuery("(max-width: 600px)");

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

  if (!loading && matches_sx) {
    return (<Box
      mb={2}
      pt={2}
      sx={{
        width: "100%",
        display: "block",
        justifyContent: "flex-end",
        height: "auto"
      }}>
      <Box sx={{
        display: "block",
        color: "#bababa",
        width: "100%",
        height: "100%",
      }}>
        <Box sx={{
          fontSize: "14px",
          display: "inline-block",
          color: "#bababa",
          height: "100%",
        }}>
          {startDate}
        </Box>

        <Typography mr={2}
          variant="overline"
          sx={{
            display: "inline-block",
            color: "#12284C",
            fontFamily: "Montserrat",
            alignSelf: "center",
            float: "right",
          }}>
          {weekType}
        </Typography>

      </Box>

      <Box sx={{
        p: 2,
        display: "inline-grid",
        width: "100%",
        height: "auto",
        lineHeight: "63px",
        border: "0.5px solid #D9D9D9",
      }}>
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

        <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}
          sx={{
            width: "100%",
            pt: 2,
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
            display: "block",
            width: "100%",
          }}
        />
      }
    </Box>)
  }

  return (!loading && <Box
    mb={2}
    sx={{
      height: "112px",
      width: "100%",
      display: "block",
      justifyContent: "flex-end",
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
      height: "auto",
      lineHeight: "63px",
      border: "0.5px solid #D9D9D9",
      gridTemplateColumns: matches_md ? "1fr 2fr 72px" : "2fr 7fr 72px",

    }}>
      <Typography mr={2}
        variant="overline"
        sx={{
          display: "inline-block",
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
      showBreakBtns && <Box
        sx={{
          ml: "110px",
          mb: "3rem",
        }}>
        <AddWeekBtns
          idx={idx}
          handleShowForm={handleShowForm}
          mt={2}
        />
      </Box>
    }
  </Box>)
}