import { Box, Typography } from "@mui/material";

import AddWeekBtns from "./AddWeekBtns";

export default function ScheduleItemLesson({ id, idx, startDate, lesson, lessonStartDate, itemType, sectionTitle, showBreakBtns, handleShowForm,  insertItem }) {

    return <Box
        sx={{
            height: "112px",
            width: "100%",
            margin: "10px",
            display:'block',
        }}
    >

        <Box sx={{
            fontSize: "14px",
            display: "inline-block",
            color: "#bababa",
            width: "110px",


        }}> {lessonStartDate}
        </Box>
   
        <Box sx={{
            px: 2,
            display: "inline-block",
            width: "calc(100% - 110px)",
            height: "63px",
            lineHeight: "63px",
            backgroundColor: "#f5f5f5",
        }}>
            <Typography mr={2}
            variant="overline"
            sx={{
                display: "inline-block",
                minWidth: "30%",
                color: "#12284C",
                fontFamily:"Montserrat"
            }}>
            {sectionTitle}
            </Typography>
            
            <Typography
            sx={{
                display: "inline-block",
                // fontSize: "18px",
                
            }}>
            {lesson}
            </Typography>
            
              
        </Box>
        {
            showBreakBtns &&
            <AddWeekBtns
            insertItem={insertItem}
            handleShowForm={handleShowForm}
            // sectionId={section._id}
            idx={idx}
            mt={2}
             sx={{
                display: "flex",
                
                width: "calc(100% - 110px)",
                backgroundColor: "green",
            }}></AddWeekBtns>
        }

    </Box>
}