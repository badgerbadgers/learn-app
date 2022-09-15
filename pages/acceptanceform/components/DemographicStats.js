import React, { useContext } from 'react';
import { FormControl, FormLabel, FormControlLabel, Grid, Typography, TextField, Radio, RadioGroup, InputLabel, Select, MenuItem, OutlinedInput, Box, Chip, Checkbox } from '@mui/material';
import { store } from "../../../store";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format } from "date-fns";

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

// function App({ children }) {
//     return (
//         <LocalizationProvider dateAdapter={AdapterDayjs}>
//             {children}
//         </LocalizationProvider>
//     );
// }

function DemographicStats() {

    const { state, dispatch } = useContext(store);
    const { userInfoData } = state;
    function updateUserInfoData(key, value) {
        dispatch({ type: 'UPDATE_PERSONAL_DETAILS', payload: { ...userInfoData, [key]: value } })

    };

    //Setting Menu items options for the Gender Identity multi-select list
    const genderIdentities = ['Woman/Female', 'Man/Male', 'Non-Binary', 'Other'];

    function handleGenderIdentityArrayChange(event) {
        const { target: { value } } = event;
        updateUserInfoData('gender_identity', value)
    };

    function handleDeleteGenderIdentity(value) {
        updateUserInfoData('gender_identity', userInfoData.gender_identity.filter((item) => item !== value));
    };

    return (

        <Grid container p={3} justify="space-between">
            <Grid container spacing={2} justify="space-between">

                <Grid item xs={12} sm={6} width="100%">
                    <TextField
                        type="date"
                        name="dob"
                        placeholder="Type your date of birth"
                        label="Date Of Birth"
                        variant="outlined"
                        fullWidth
                        required
                        size="small"
                        InputLabelProps={{ shrink: true }}
                        value={userInfoData.dob}
                        onChange={(e) => updateUserInfoData('dob', e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6} width="100%">
                    <TextField
                        name="pronouns"
                        placeholder="Type your pronouns"
                        label="Pronouns"
                        fullWidth
                        size="small"
                        InputLabelProps={{ shrink: true }}
                        value={userInfoData.pronouns}
                        onChange={(e) => updateUserInfoData('pronouns', e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6} width="100%">
                    <FormControl sx={{ width: "100%" }} size="small">
                        <InputLabel required id="demo-select-small">
                            Gender Identity
                        </InputLabel>
                        <Select
                            labelId="demo-select-small"
                            id="demo-multiple-chip"
                            name="gender_identity"
                            placeholder="Select your gender identity"
                            label="Gender Identity"
                            required
                            multiple
                            variant="outlined"
                            fullWidth
                            size="small"
                            InputLabelProps={{ shrink: true }}
                            value={userInfoData.gender_identity}
                            onChange={handleGenderIdentityArrayChange}
                            input={
                                <OutlinedInput id="select-multiple-chip" label="Gender Identity" />
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
                                            onDelete={() => handleDeleteGenderIdentity(value)}
                                            color="secondary" />
                                    ))}
                                </Box>
                            )}
                            MenuProps={MenuProps}
                        >
                            {genderIdentities.map((value) => (
                                <MenuItem key={value} value={value}>
                                    <Checkbox checked={userInfoData.gender_identity.indexOf(value) > -1} />
                                    {value}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} width="100%">
                    <TextField
                        name="gender_identity_self"
                        placeholder="Type your gender identity"
                        label="Gender Identity (self described)"
                        fullWidth
                        size="small"
                        InputLabelProps={{ shrink: true }}
                        value={userInfoData.gender_identity_self}
                        onChange={(e) => updateUserInfoData('gender_identity_self', e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6} width="100%">
                    <FormControl sx={{ width: "100%" }} size="small">
                        <InputLabel required id="demo-select-small">
                            Race/Ethnicity
                        </InputLabel>
                        <Select
                            name="race_ethnicity"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            required
                            label="Race/Ethnicity"
                            value={userInfoData.race_ethnicity}
                            onChange={(e) => updateUserInfoData('race_ethnicity', e.target.value)}
                        >
                            <MenuItem value={10}>Asian/Pacific Islander</MenuItem>
                            <MenuItem value={20}>Arab/Middle Eastern</MenuItem>
                            <MenuItem value={30}>Black/Afro Descent/African</MenuItem>
                            <MenuItem value={40}>Hispanic/Latinx/a/o</MenuItem>
                            <MenuItem value={50}>Indigenous/Native American</MenuItem>
                            <MenuItem value={60}>White/European/European Descent</MenuItem>
                            <MenuItem value={70}>Bi-racial/Multi-racial</MenuItem>
                            <MenuItem value={80}>Some other race, ethnicity, or origin</MenuItem>
                            <MenuItem value={90}>Prefer not to say</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} width="100%">
                    <TextField
                        name="race_ethnicity_self"
                        placeholder="Type your race/ethnicity"
                        label="Race/Ethnicity (self described)"
                        fullWidth
                        size="small"
                        InputLabelProps={{ shrink: true }}
                        value={userInfoData.race_ethnicity_self}
                        onChange={(e) => updateUserInfoData('race_ethnicity_self', e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6} width="100%">
                    <FormControl sx={{ width: "100%" }} size="small">
                        <InputLabel id="demo-select-small">
                            Highest Level of Education
                        </InputLabel>
                        <Select
                            name="education"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Higher Level of Education"
                            value={userInfoData.education}
                            onChange={(e) => updateUserInfoData('education', e.target.value)}
                        >
                            <MenuItem value={10}>High School/equivalent</MenuItem>
                            <MenuItem value={20}>Tech/occupational certificate</MenuItem>
                            <MenuItem value={30}>Associate degree</MenuItem>
                            <MenuItem value={40}>Some college coursework completed</MenuItem>
                            <MenuItem value={50}>Bachelor degree</MenuItem>
                            <MenuItem value={60}>Master degree</MenuItem>
                            <MenuItem value={70}>Doctorate</MenuItem>
                            <MenuItem value={80}>Other coursework/licensures/certifications</MenuItem>
                            <MenuItem value={90}>None</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} width="100%">
                    <TextField
                        name="spoken_languages"
                        placeholder="Type languages you speak"
                        label="Spoken Languages"
                        fullWidth
                        size="small"
                        InputLabelProps={{ shrink: true }}
                        value={userInfoData.spoken_languages}
                        onChange={(e) => updateUserInfoData('spoken_languages', e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={4} width="100%">
                    <FormLabel id="demo-radio-buttons-group-label">Currently employed:</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                        value={userInfoData.employed}
                        onChange={(e) => updateUserInfoData('employed', e.target.value)}
                    >
                        <FormControlLabel value="yes" control={<Radio size="small" />} label="Yes" />
                        <FormControlLabel value="no" control={<Radio size="small" />} label="No" />
                    </RadioGroup>

                </Grid>
                <Grid item xs={12} sm={4} width="100%">
                    <FormLabel id="demo-radio-buttons-group-label">Currently in school:</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                        value={userInfoData.in_school}
                        onChange={(e) => updateUserInfoData('in_school', e.target.value)}
                    >
                        <FormControlLabel value="yes" control={<Radio size="small" />} label="Yes" />
                        <FormControlLabel value="no" control={<Radio size="small" />} label="No" />
                    </RadioGroup>

                </Grid>
                <Grid item xs={12} sm={4} width="100%">
                    <FormLabel id="demo-radio-buttons-group-label" required>Low income:</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-radio-buttons-group-label"
                        required
                        name="radio-buttons-group"
                        value={userInfoData.low_income}
                        onChange={(e) => updateUserInfoData('low_income', e.target.value)}
                    >
                        <FormControlLabel value="yes" control={<Radio size="small" />} label="Yes" />
                        <FormControlLabel value="no" control={<Radio size="small" />} label="No" />
                    </RadioGroup>

                </Grid>
            </Grid>
        </Grid>
    );
}

export default DemographicStats;