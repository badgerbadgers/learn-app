import * as React from 'react';

import { Box, IconButton, Stack, TextField, Typography } from "@mui/material";

import SaveIcon from '@mui/icons-material/Save';
import { useEffect } from "react";

export default function AddItemForm({ insertItem, idx, sectionId }) {
    const [content, setContent] = React.useState('');

    useEffect(() => { console.log("IDDDD", idx) }, []);


    return (
        <Box
            sx={{
                px: 2,
                display: "inline-block",
                border: "1px solid lightseagreen",
                height: "112px",
                width: "calc(100%-110px)",
                margin: "10px",
                display: 'block',
                marginLeft: "110px",
            }}
        >
            <Stack direction="row"
                spacing={2} 
                alignItems="center"
                justifyContent="space-between"
                sx={{height: "100%"}}>
                    <Typography noWrap>Note for the students:</Typography>
                <TextField
                    // name="emergency_contact_1_name"
                    placeholder="Type "
                    label="Content for the break"
                    
                    fullWidth
                    // required
                    // size="small"
                    InputLabelProps={{ shrink: true }}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    // sx={{
                    //     display:"inline"

                    // }}
                />
                <IconButton 
                aria-label="edit" 
                size="small" 
                sx={{

                }}
                onClick={() => { insertItem(idx, { type: "break", content: content, section: { _id: sectionId, title: "" } }) }}  >
                    <SaveIcon fontSize="small" />
                </IconButton>
            </Stack>
        </Box>


    )

}