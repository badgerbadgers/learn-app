import React, { useContext } from 'react';
import { FormControl, FormControlLabel, InputLabel, Grid, Typography, Checkbox, Select, MenuItem, OutlinedInput, Box, Chip } from '@mui/material';
import { store } from "../../../store";

// Styling the chips for multi-select input
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function LearningBackground() {

    const { state, dispatch } = useContext(store);
    const { userInfoData } = state;
    function updateUserInfoData(key, value) {
        dispatch({ type: 'UPDATE_PERSONAL_DETAILS', payload: { ...userInfoData, [key]: value } })

    }

    //Setting Menu items options for the Prior Coding Languages multi-select list
    const priorCodingLanguages = ['HTML', 'CSS', 'JavaScript (different from Java)', 'Ruby', 'Rails', 'React', 'Node', 'Express', 'Other'];

    //Setting Menu items options for the Learning Style multi-select list
    const learningStyles = ['Visual (watch videos)', 'Listening (hear a lecture/discussion)', 'Reading (read text)', 'Not sure'];

    function handlePriorCodingLanguagesArrayChange(event) {
        const { target: { value } } = event;
        updateUserInfoData('prior_coding_languages', value)
    };

    function handleDeletePriorCodingLanguages(value) {
        updateUserInfoData('prior_coding_languages', userInfoData.prior_coding_languages.filter((item) => item !== value));
    };

    function handleLearningStyleArrayChange(event) {
        const { target: { value } } = event;
        updateUserInfoData('learning_style', value)
    };

    function handleDeleteLearningStyle(value) {
        updateUserInfoData('learning_style', userInfoData.learning_style.filter((item) => item !== value));
    };

    return (
        <FormControl>
            {/* <Typography>
                <strong>LEARNING BACKGROUND:</strong>
            </Typography> */}
            <Grid container p={3} justify="space-between">
                <Grid container spacing={2} justify="space-between">

                    <Grid item xs={12} sm={6} width="100%">
                        <FormControl sx={{ width: "100%" }} size="small">
                            <InputLabel id="demo-select-small">
                                Prior Coding Education
                            </InputLabel>
                            <Select
                                labelId="demo-select-small"
                                id="demo-multiple-chip"
                                name="prior_coding_education"
                                placeholder="Prior Coding Education"
                                label="Prior Coding Education"
                                variant="outlined"
                                fullWidth
                                size="small"
                                InputLabelProps={{ shrink: true }}
                                value={userInfoData.prior_coding_education}
                                onChange={(e) => updateUserInfoData('prior_coding_education', e.target.value)}
                            >
                                <MenuItem value={10}>A few hours</MenuItem>
                                <MenuItem value={20}>A few days</MenuItem>
                                <MenuItem value={30}>A few weeks</MenuItem>
                                <MenuItem value={40}>A few months</MenuItem>
                                <MenuItem value={50}>A year or two</MenuItem>
                                <MenuItem value={60}>Several years</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} width="100%">
                        <FormControl sx={{ width: "100%" }} size="small">
                            <InputLabel id="demo-select-small">
                                Prior Coding Languages/Frameworks
                            </InputLabel>
                            <Select
                                labelId="demo-select-small"
                                id="demo-multiple-chip"
                                name="prior_coding_education"
                                placeholder="Prior Coding Languages/Frameworks"
                                label="Prior Coding Languages/Frameworks"
                                required
                                multiple
                                variant="outlined"
                                fullWidth
                                size="small"
                                InputLabelProps={{ shrink: true }}
                                value={userInfoData.prior_coding_languages}
                                onChange={handlePriorCodingLanguagesArrayChange}
                                input={
                                    <OutlinedInput id="select-multiple-chip" label="Prior Coding Languages/Frameworks" />
                                }
                                renderValue={(selected) => (
                                    < Box
                                        sx={{
                                            display: "flex",
                                            flexWrap: "wrap",
                                            gap: 0.5
                                        }} >
                                        {selected.map((value) => (
                                            < Chip
                                                key={value}
                                                label={value}
                                                onMouseDown={(event) => {
                                                    event.stopPropagation();
                                                }}
                                                onDelete={() => handleDeletePriorCodingLanguages(value)}
                                                color="secondary" />
                                        ))}
                                    </Box>
                                )}
                                MenuProps={MenuProps}
                            >
                                {priorCodingLanguages.map((value) => (
                                    <MenuItem key={value} value={value}>
                                        <Checkbox checked={userInfoData.prior_coding_languages.indexOf(value) > -1} />
                                        {value}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} width="100%">
                        <FormControl sx={{ width: "100%" }} size="small">
                            <InputLabel id="demo-select-small">
                                Learning Style
                            </InputLabel>
                            <Select
                                labelId="demo-select-small"
                                id="demo-multiple-chip"
                                name="learning_style"
                                placeholder="Learning Style"
                                label="Learning Style"
                                required
                                multiple
                                variant="outlined"
                                fullWidth
                                size="small"
                                InputLabelProps={{ shrink: true }}
                                value={userInfoData.learning_style}
                                onChange={handleLearningStyleArrayChange}
                                input={
                                    <OutlinedInput id="select-multiple-chip" label="Learning Style" />
                                }
                                renderValue={(selected) => (
                                    < Box
                                        sx={{
                                            display: "flex",
                                            flexWrap: "wrap",
                                            gap: 0.5
                                        }} >
                                        {selected.map((value) => (
                                            < Chip
                                                key={value}
                                                label={value}
                                                onMouseDown={(event) => {
                                                    event.stopPropagation();
                                                }}
                                                onDelete={() => handleDeleteLearningStyle(value)}
                                                color="secondary" />
                                        ))}
                                    </Box>
                                )}
                                MenuProps={MenuProps}
                            >
                                {learningStyles.map((value) => (
                                    <MenuItem key={value} value={value}>
                                        <Checkbox checked={userInfoData.learning_style.indexOf(value) > -1} />
                                        {value}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} width="100%">
                        <FormControlLabel control={<Checkbox required />} label="I agree that I am accepting my seat in a class I was offered and understand that the work commitment for each class is expected to be about 15-20 hours per week." />
                    </Grid>
                    <Grid item xs={12} sm={12} width="100%">
                        <FormControlLabel control={<Checkbox required />} label="I commit to trying my best throughout the course and agree to contact Code the Dream if I can no longer participate in this class so I can be made aware of future opportunities available." />
                    </Grid>
                </Grid>
            </Grid>
        </FormControl>
    );
}

export default LearningBackground;