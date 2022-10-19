import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import AddWeekBtns from "./AddWeekBtns";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';

export default function ScheduleItemBreak({ id, idx, startDate, weekType, content, sectionId, sectionTitle, showBreakBtns, handleShowForm, insertItem }) {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false)
    }, []);

    return (!loading && <Box
        sx={{
            height: "112px",
            width: "100%",
            margin: "10px",
            display: 'block',
        }}
    >

        <Box sx={{
            fontSize: "14px",
            display: "inline-block",
            color: "#bababa",
            width: "110px",


        }}> {startDate}
        </Box>

        <Box sx={{

            px: 2,
            display: "inline-block",
            width: "calc(100% - 110px)",
            height: "63px",
            lineHeight: "63px",
            border: "0.5px solid #D9D9D9",
        }}>
            <Typography mr={2}
                variant="overline"
                sx={{
                    display: "inline-block",
                    minWidth: "30%",
                    color: "#12284C",
                    fontFamily: "Montserrat"
                }}>
                {weekType}
            </Typography>

            <Typography
                sx={{
                    display: "inline-block",
                    // fontSize: "18px",

                }}>
                {content || ""}
            </Typography>

            <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={1}
                sx={{
                    display: "inline-block",
                    float: "right"
                }}>
                <IconButton aria-label="edit" size="small" >
                    <EditIcon fontSize="small" />
                </IconButton>
                <IconButton aria-label="delete" size="small">
                    <DeleteIcon fontSize="small" />
                </IconButton> </Stack>





        </Box>
        {
            showBreakBtns &&
            <AddWeekBtns
                insertItem={insertItem}
                idx={idx}
                sectionId={sectionId}
                handleShowForm={handleShowForm}
                mt={2}
                sx={{
                    display: "flex",

                    width: "calc(100% - 110px)",

                }}></AddWeekBtns>
        }

    </Box>)
}