import { Box, Divider, IconButton, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import ClearIcon from '@mui/icons-material/Clear';
import SaveIcon from '@mui/icons-material/Save';

export default function AddItemForm({ saveItem, idx, sectionId, note }) {

    const [content, setContent] = useState("");

    useEffect(() => {
        setContent(note);
    }, []);

    return (
        <Box
            sx={{
                px: 2,
                display: "block",
                height: "112px",
                display: 'block',
                marginLeft: "120px",
                marginBottom: "40px",
                boxShadow: "0 1px 3px 0 rgb(60 64 67 / 30%), 0 4px 8px 3px rgb(60 64 67 / 15%)",
                borderRadius: "8px"
            }}
        >
            <Stack direction="row"
                spacing={1}
                alignItems="center"
                justifyContent="space-between"
                sx={{ height: "100%" }}>
                <Typography
                    sx={{
                        minWidth: "20%",
                        float: "right",
                    }}> Note for students:</Typography>
                <TextField
                    placeholder="Type your note for the students"
                    label="Note"
                    fullWidth
                    autoFocus
                    InputLabelProps={{ shrink: true }}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />


                <Stack direction="row" 
                divider={<Divider orientation="vertical" flexItem />}
                alignItems="center" justifyContent="flex-end" spacing={1}
                    sx={{
                        display: "inline-block",
                        float: "right"
                    }}>
                    <IconButton
                        aria-label="discard"
                        sx={{
                            "&:hover": {
                                color: "red",
                            },
                        }}
                        onClick={() => { saveItem(null, {}) }}  >
                        <ClearIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                        aria-label="save"
                        sx={{
                            "&:hover": {
                                color: "green",
                            },
                        }}
                        onClick={() => { saveItem(idx, { type: "break", content: content, section: sectionId }) }}  >
                        <SaveIcon fontSize="small" />
                    </IconButton>

                </Stack>

            </Stack>
        </Box>


    )

}