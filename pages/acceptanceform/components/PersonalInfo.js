import React, { useContext } from 'react';
import { FormControl, Grid, Typography, TextField } from '@mui/material';
import { store } from "../../../store";


function PersonalInfo() {
    const { state, dispatch } = useContext(store);
    const { userInfoData } = state;
    function updateUserInfoData(key, value) {
        dispatch({ type: 'UPDATE_PERSONAL_DETAILS', payload: { ...userInfoData, [key]: value } })

    }

    return (
        <FormControl>
            {/* <Typography>
                <strong>PERSONAL INFORMATION:</strong>
            </Typography> */}
            <Grid container p={3} justify="space-between">
                {/* <Typography variant="body1" gutterBottom>
                <strong>Personal Information: </strong>
            </Typography> */}
                <Grid container spacing={2} justify="space-between">
                    <Grid item xs={12} sm={6} width="100%">
                        <TextField
                            name="first_name"
                            placeholder="Type your first name"
                            label="First Name"
                            fullWidth
                            required
                            size="small"
                            InputLabelProps={{ shrink: true }}
                            value={userInfoData.first_name}
                            onChange={(e) => updateUserInfoData('first_name', e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} width="100%">
                        <TextField
                            name="last_name"
                            placeholder="Type your last name"
                            label="Last Name"
                            variant="outlined"
                            fullWidth
                            required
                            size="small"
                            InputLabelProps={{ shrink: true }}
                            value={userInfoData.last_name}
                            onChange={(e) => updateUserInfoData('last_name', e.target.value)}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} width="100%">
                        <TextField
                            name="email"
                            placeholder="Type your email"
                            label="Email"
                            fullWidth
                            required
                            size="small"
                            InputLabelProps={{ shrink: true }}
                            value={userInfoData.email}
                            onChange={(e) => updateUserInfoData('email', e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} width="100%">
                        <TextField
                            name="gitHub"
                            placeholder="Type your GitHub username"
                            label="GitHub Username"
                            variant="outlined"
                            fullWidth
                            required
                            size="small"
                            InputLabelProps={{ shrink: true }}
                            value={userInfoData.gitHub}
                            onChange={(e) => updateUserInfoData('gitHub', e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} width="100%">
                        <TextField
                            name="Phone"
                            placeholder="Type your phone number"
                            label="Phone"

                            fullWidth
                            required
                            size="small"
                            InputLabelProps={{ shrink: true }}
                            value={userInfoData.phone}
                            onChange={(e) => updateUserInfoData('phone', e.target.value)}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </FormControl>
    );
}

export default PersonalInfo;