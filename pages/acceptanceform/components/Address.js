import React, { useContext, useState } from 'react';
import { FormControl, FormLabel, FormControlLabel, Grid, Typography, TextField, Radio, RadioGroup, Checkbox } from '@mui/material';
import { store } from "../../../store";

function Address() {
    const { state, dispatch } = useContext(store);
    const { userInfoData } = state;
    function updateUserInfoData(key, value) {
        dispatch({ type: 'UPDATE_PERSONAL_DETAILS', payload: { ...userInfoData, [key]: value } })

    }

    const [isChecked, setIsChecked] = useState(false);

    function handleCheckboxChange(event) {
        if (event.target.checked) {
            userInfoData.mailing_zipcode = userInfoData.physical_zipcode;
            userInfoData.mailing_address = userInfoData.physical_address;
            userInfoData.mailing_city = userInfoData.physical_city;
            userInfoData.mailing_state = userInfoData.physical_state;
            userInfoData.mailing_country = userInfoData.physical_country;
            console.log(userInfoData.mailing_zipcode);
            console.log(userInfoData.mailing_address);
            console.log(userInfoData.mailing_city);
            console.log(userInfoData.mailing_state);
            console.log(userInfoData.mailing_country);
        } else {
            console.log('⛔️ Checkbox is NOT checked');
        }
        setIsChecked(current => !current);
    }

    return (
        <FormControl>
            {/* <Typography variant="body1" gutterBottom>
                <strong>ADDRESS:</strong>
            </Typography> */}
            <Grid container p={3} justify="space-between">
                <Grid container spacing={2} justify="space-between">
                    <Grid item xs={12} sm={12} width="100%">
                        <Typography variant="body1" gutterBottom>
                            <strong>Physical Address: </strong>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} width="100%">
                        <FormLabel id="demo-radio-buttons-group-label" labelPlacement="start">US/US territory resident:</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group"
                            value={userInfoData.US_resident}
                            onChange={(e) => updateUserInfoData('US_resident', e.target.value)}
                        >
                            <FormControlLabel value="yes" control={<Radio size="small" />} labelPlacement="start" label="Yes" />
                            <FormControlLabel value="no" control={<Radio size="small" />} labelPlacement="start" label="No" />
                        </RadioGroup>

                    </Grid>
                    <Grid item xs={12} sm={6} width="100%">
                        <TextField
                            name="physical_zipcode"
                            placeholder="Type your ZIP code"
                            label="ZIP Code"
                            variant="outlined"
                            fullWidth
                            required
                            size="small"
                            InputLabelProps={{ shrink: true }}
                            value={userInfoData.physical_zipcode}
                            onChange={(e) => updateUserInfoData('physical_zipcode', e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} width="100%">
                        <TextField
                            name="physical_address"
                            placeholder="Type your address including apartment #"
                            label="Street Address"
                            fullWidth
                            size="small"
                            InputLabelProps={{ shrink: true }}
                            value={userInfoData.physical_address}
                            onChange={(e) => updateUserInfoData('physical_address', e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} width="100%">
                        <TextField
                            name="physical_city"
                            placeholder="Type your city"
                            label="City"
                            variant="outlined"
                            fullWidth
                            size="small"
                            InputLabelProps={{ shrink: true }}
                            value={userInfoData.physical_city}
                            onChange={(e) => updateUserInfoData('physical_city', e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} width="100%">
                        <TextField
                            name="physical_state"
                            placeholder="Type your state or province"
                            label="State/Province"
                            fullWidth
                            size="small"
                            InputLabelProps={{ shrink: true }}
                            value={userInfoData.physical_state}
                            onChange={(e) => updateUserInfoData('physical_state', e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} width="100%">
                        {
                            userInfoData.US_resident === 'no' &&
                            <TextField
                                name="physical_country"
                                placeholder="Type your country"
                                label="Country"
                                fullWidth
                                size="small"
                                InputLabelProps={{ shrink: true }}
                                value={userInfoData.physical_country}
                                onChange={(e) => updateUserInfoData('physical_country', e.target.value)}
                            />
                        }
                    </Grid>

                    <Grid item xs={12} sm={12} width="100%">
                        <Typography variant="body1" gutterBottom>
                            <strong>Mailing Address: </strong>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} width="100%">
                        <FormControlLabel control={<Checkbox onChange={handleCheckboxChange} />} label="Same as physical address" />
                    </Grid>
                    <Grid item xs={12} sm={6} width="100%">
                        <TextField
                            name="mailing_zipcode"
                            placeholder="Type your ZIP code"
                            label="ZIP/Postal Code"
                            variant="outlined"
                            fullWidth
                            required
                            size="small"
                            InputLabelProps={{ shrink: true }}
                            value={userInfoData.mailing_zipcode}
                            onChange={(e) => updateUserInfoData('mailing_zipcode', e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} width="100%">
                        <TextField
                            name="mailing_address"
                            placeholder="Type your address including apartment #"
                            label="Street Address"
                            fullWidth
                            size="small"
                            InputLabelProps={{ shrink: true }}
                            value={userInfoData.mailing_address}
                            onChange={(e) => updateUserInfoData('mailing_address', e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} width="100%">
                        <TextField
                            name="mailing_city"
                            placeholder="Type your city"
                            label="City"
                            variant="outlined"
                            fullWidth
                            size="small"
                            InputLabelProps={{ shrink: true }}
                            value={userInfoData.mailing_city}
                            onChange={(e) => updateUserInfoData('mailing_city', e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} width="100%">
                        <TextField
                            name="mailing_state"
                            placeholder="Type your state or province"
                            label="State/Province"
                            fullWidth
                            size="small"
                            InputLabelProps={{ shrink: true }}
                            value={userInfoData.mailing_state}
                            onChange={(e) => updateUserInfoData('mailing_state', e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} width="100%">
                        <TextField
                            name="mailing_country"
                            placeholder="Type your country"
                            label="Country"
                            fullWidth
                            size="small"
                            InputLabelProps={{ shrink: true }}
                            value={userInfoData.mailing_country}
                            onChange={(e) => updateUserInfoData('mailing_country', e.target.value)}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </FormControl >
    );
}

export default Address;