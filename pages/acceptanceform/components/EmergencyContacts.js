import React, { useContext } from 'react';
import { FormControl, FormLabel, FormControlLabel, InputLabel, Grid, Fragment, Typography, TextField, Radio, RadioGroup, Checkbox, Select, MenuItem } from '@mui/material';
import { store } from "../../../store";



function EmergencyContacts() {
    const { state, dispatch } = useContext(store);
    const { userInfoData } = state;
    function updateUserInfoData(key, value) {
        dispatch({ type: 'UPDATE_PERSONAL_DETAILS', payload: { ...userInfoData, [key]: value } })

    }
    return (
        <FormControl>
            {/* <Typography>
                <strong>EMERGENCY CONTACTS:</strong>
            </Typography> */}
            <Grid container p={3} justify="space-between">
                <Grid container spacing={2} justify="space-between">

                    <Grid item xs={12} sm={12} width="100%">
                        <Typography variant="body1" gutterBottom>
                            <strong>Person 1: </strong>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} width="100%">
                        <TextField
                            name="emergency_contact_1_name"
                            placeholder="Type your person's 1 full name"
                            label="Full Name"

                            fullWidth
                            required
                            size="small"
                            InputLabelProps={{ shrink: true }}
                            value={userInfoData.emergency_contact_1_name}
                            onChange={(e) => updateUserInfoData('emergency_contact_1_name', e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} width="100%">
                        <FormControl sx={{ width: "100%" }} size="small">
                            <InputLabel required id="demo-select-small">
                                Relationship
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                required
                                label="Relationship"
                                value={userInfoData.emergency_contact_1_relationship}
                                onChange={(e) => updateUserInfoData('emergency_contact_1_relationship', e.target.value)}
                            >
                                <MenuItem value={10}>Parent/Mother/Father</MenuItem>
                                <MenuItem value={20}>Sibling/Brother/Sister</MenuItem>
                                <MenuItem value={30}>Spouse/Partner</MenuItem>
                                <MenuItem value={40}>Friend</MenuItem>
                                <MenuItem value={50}>Other</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} width="100%">
                        <TextField
                            name="emergency_contact_1_phone"
                            placeholder="Type person's 1 phone number including country code"
                            label="Phone"
                            fullWidth
                            required
                            size="small"
                            InputLabelProps={{ shrink: true }}
                            value={userInfoData.emergency_contact_1_phone}
                            onChange={(e) => updateUserInfoData('emergency_contact_1_phone', e.target.value)}
                        />
                    </Grid>

                    <Grid item xs={12} sm={12} width="100%">
                        <Typography variant="body1" gutterBottom>
                            <strong>Person 2: </strong>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} width="100%">
                        <TextField
                            name="emergency_contact_2_name"
                            placeholder="Type person's 2 full name"
                            label="Full Name"
                            fullWidth
                            required
                            size="small"
                            InputLabelProps={{ shrink: true }}
                            value={userInfoData.emergency_contact_2_name}
                            onChange={(e) => updateUserInfoData('emergency_contact_2_name', e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} width="100%">
                        <FormControl sx={{ width: "100%" }} size="small">
                            <InputLabel required id="demo-select-small">
                                Relationship
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                required
                                label="Relationship"
                                value={userInfoData.emergency_contact_2_relationship}
                                onChange={(e) => updateUserInfoData('emergency_contact_2_relationship', e.target.value)}
                            >
                                <MenuItem value={10}>Parent/Mother/Father</MenuItem>
                                <MenuItem value={20}>Sibling/Brother/Sister</MenuItem>
                                <MenuItem value={30}>Spouse/Partner</MenuItem>
                                <MenuItem value={40}>Friend</MenuItem>
                                <MenuItem value={50}>Other</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} width="100%">
                        <TextField
                            name="emergency_contact_2_phone"
                            placeholder="Type person's 2 phone number including country code"
                            label="Phone"
                            fullWidth
                            required
                            size="small"
                            InputLabelProps={{ shrink: true }}
                            value={userInfoData.emergency_contact_2_phone}
                            onChange={(e) => updateUserInfoData('emergency_contact_2_phone', e.target.value)}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </FormControl>
    );
}

export default EmergencyContacts;