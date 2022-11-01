import { Box, Typography, useMediaQuery } from "@mui/material";

import AddWeekBtns from "./AddWeekBtns";

export default function ScheduleItemLesson({idx, lesson, lessonStartDate, sectionTitle, showBreakBtns, handleShowForm}) {
  const matches_md = useMediaQuery("(max-width: 1500px)");

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
          lineHeight: "63px"
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
      showBreakBtns &&
      <AddWeekBtns
        handleShowForm={handleShowForm}
        idx={idx}
        mt={2}
        sx={{
          display: "flex",
          width: "calc(100% - 110px)",
          backgroundColor: "green",
        }}
      />
    }
  </Box>
}