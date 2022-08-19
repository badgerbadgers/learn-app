import React from 'react';
import { Grid, Fragment, Typography, TextField } from '@mui/material';


// const cities = [
//     {
//         value: undefined,
//         label: 'None'
//     },
//     {
//         value: '1',
//         label: 'New York'
//     },
//     {
//         value: '2',
//         label: 'Chicago'
//     },
//     {
//         value: '3',
//         label: 'Saigon'
//     }
// ];

// const states = [
//     {
//         value: undefined,
//         label: 'None'
//     },
//     {
//         value: '11',
//         label: 'Florida'
//     },
//     {
//         value: '22',
//         label: 'Michigan'
//     },
//     {
//         value: '33',
//         label: 'Texas'
//     }
// ];

// const countries = [
//     {
//         value: null,
//         label: 'None'
//     },
//     {
//         value: '111',
//         label: 'United States'
//     },
//     {
//         value: '222',
//         label: 'Italy'
//     },
//     {
//         value: '333',
//         label: 'Vietnam'
//     }
// ];

function PersonalInfo() {
    // const {
    //     formField: {
    //         firstName,
    //         lastName,
    //         email,
    //         github,
    //         phone,
    //     }
    // } = props;
    return (
        // <Fragment>
        <Grid container p={3} justify="space-between">
            <Typography variant="body1" gutterBottom>
                <strong>Personal Information: </strong>
            </Typography>
            <Grid container spacing={2} justify="space-between">
                <Grid item xs={12} sm={6} width="100%">
                    <TextField
                        name="firstName"
                        placeholder="Type your first name"
                        label="First Name"

                        fullWidth
                        required
                        size="small"
                        InputLabelProps={{ shrink: true }}
                    // value={userInfoData.firstName}
                    // onChange={(e) => handleInputChange(e)}
                    />
                </Grid>
                <Grid item xs={12} sm={6} width="100%">
                    <TextField
                        name="lastName"
                        placeholder="Type your last name"
                        label="Last Name"
                        variant="outlined"
                        fullWidth
                        required
                        size="small"
                        InputLabelProps={{ shrink: true }}
                    // value={userInfoData.lastName}
                    // onChange={(e) => handleInputChange(e)}
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
                    // value={userInfoData.firstName}
                    // onChange={(e) => handleInputChange(e)}
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
                    // value={userInfoData.lastName}
                    // onChange={(e) => handleInputChange(e)}
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
                    // value={userInfoData.firstName}
                    // onChange={(e) => handleInputChange(e)}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
}

export default PersonalInfo;