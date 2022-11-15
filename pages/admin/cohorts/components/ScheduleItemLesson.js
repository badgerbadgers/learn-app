import { Box, Typography, useMediaQuery } from "@mui/material";

import AddWeekBtns from "./AddWeekBtns";

export default function ScheduleItemLesson({ idx, lesson, lessonStartDate, sectionTitle, showBreakBtns, handleShowForm }) {
  const matches_md = useMediaQuery("(max-width: 1500px)");
  const matches_sx = useMediaQuery("(max-width: 600px)");


  if (matches_sx) {
    return (<Box
      mb={2}
      sx={{
        height: "auto",
        width: "100%",
        display: "block",
      }}
    >
      <Box sx={{
        fontSize: "14px",
        color: "#bababa",
        width: "100%",
      }}>
        {lessonStartDate}
      </Box>
      <Box sx={{
        p: 2,
        display: "block",
        width: "100%",
        height: "auto",
        backgroundColor: "#f5f5f5",
        alighItems: "center",
      }}>
        <Typography mr={2}
          variant="overline"
          sx={{
            display: "block",
            color: "#12284C",
            fontFamily: "Montserrat",
            height: "100%",
            width: "100%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}>
          {sectionTitle}
        </Typography>
        <Typography
        sx={{
          display: "inline-block",
          wordBreak: "break-all",
          maxHeight: "150px",
          overflowY: "auto",
          whiteSpace: "pre-wrap",
        }}>
          {lesson}
        </Typography>
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

  return <Box
    mb={2}
    sx={{
      height: "112px",
      width: "100%",
      display: "block",
    }}
  >
    <Box sx={{
      fontSize: "14px",
      display: "inline-block",
      color: "#bababa",
      width: "110px",
    }}>
      {lessonStartDate}
    </Box>
    <Box sx={{
      px: 2,
      display: "inline-grid",
      width: "calc(100% - 110px)",
      height: "63px",
      lineHeight: "63px",
      backgroundColor: "#f5f5f5",
      gridTemplateColumns: matches_md ? "1fr 2fr 72px" : "2fr 7fr 72px",
      alighItems: "center",
    }}>
      <Typography mr={2}
        variant="overline"
        sx={{
          color: "#12284C",
          fontFamily: "Montserrat",
          height: "100%",
          lineHeight: "63px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}>
        {sectionTitle}
      </Typography>

      <Typography
        sx={{
          lineHeight: "63px",
          display: "inline-block",
          wordBreak: "break-all",
          maxHeight: "150px",
          overflowY: "hidden",
          overflowX: "auto",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}>
        {lesson}
      </Typography>
      <Box
        sx={{
          width: "72px"
        }}>
      </Box>
    </Box>
    {
      showBreakBtns && <Box
        mt={2}
        sx={{
          ml: "110px",
          mb: "3rem"
        }}>
        <AddWeekBtns
          idx={idx}
          handleShowForm={handleShowForm}
        />
      </Box>
    }
  </Box>
}