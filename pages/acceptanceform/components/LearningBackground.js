import React, { useContext } from 'react';
import { FormControl, FormLabel, FormControlLabel, Grid, Fragment, Typography, TextField, Radio, RadioGroup, Checkbox, Select, MenuItem } from '@mui/material';
import { store } from "../../../store";


function LearningBackground() {
    const { state, dispatch } = useContext(store);
    const { userInfoData } = state;
    function updateUserInfoData(key, value) {
        dispatch({ type: 'UPDATE_PERSONAL_DETAILS', payload: { ...userInfoData, [key]: value } })

    }
    return (
        <FormControl>
            <FormLabel>
                <strong>LEARNING BACKGROUND:</strong>
            </FormLabel>
            <Grid container p={3} justify="space-between">
                <Grid container spacing={2} justify="space-between">

                    <Grid item xs={12} sm={12} width="100%">
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Learning Style"
                            value={userInfoData.learning_style}
                            onChange={(e) => updateUserInfoData('learning_style', e.target.value)}
                        >
                            <MenuItem value={10}>Visual (watch videos)</MenuItem>
                            <MenuItem value={20}>Listening (hear a lecture/discussion)</MenuItem>
                            <MenuItem value={30}>Reading (read text)</MenuItem>
                            <MenuItem value={40}>Not sure</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={12} width="100%">
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Prior Coding Education"
                            value={userInfoData.prior_coding_education}
                            onChange={(e) => updateUserInfoData('prior_coding_education', e.target.value)}
                        >
                            <MenuItem value={10}>None</MenuItem>
                            <MenuItem value={20}>A few hours</MenuItem>
                            <MenuItem value={30}>A few days</MenuItem>
                            <MenuItem value={40}>A few weeks</MenuItem>
                            <MenuItem value={50}>A few months</MenuItem>
                            <MenuItem value={60}>A year or two</MenuItem>
                            <MenuItem value={70}>Several years</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={12} width="100%">
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Prior Coding Languages/Frameworks"
                            value={userInfoData.prior_coding_languages}
                            onChange={(e) => updateUserInfoData('prior_coding_languages', e.target.value)}
                        >
                            <MenuItem value={10}>HTML</MenuItem>
                            <MenuItem value={20}>CSS</MenuItem>
                            <MenuItem value={30}>JavaScript (different from Java)</MenuItem>
                            <MenuItem value={40}>Ruby</MenuItem>
                            <MenuItem value={10}>Rails</MenuItem>
                            <MenuItem value={20}>React</MenuItem>
                            <MenuItem value={30}>Node</MenuItem>
                            <MenuItem value={40}>Express</MenuItem>
                            <MenuItem value={40}>Other</MenuItem>
                        </Select>
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