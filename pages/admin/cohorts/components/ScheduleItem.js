import { Box, Typography } from "@mui/material";

export default function ScheduleItem({id, startDate, lesson, weekNumber }) {
   
    return <Box
    sx={{ backgroundColor:"green", 
    height:"112px", 
    width: "100%", 
    margin:"10px",
}}
    > Item  {lesson} 
    <div>
        <Box> {weekNumber} or date</Box>
        <Box></Box>
    </div>
    </Box>
}