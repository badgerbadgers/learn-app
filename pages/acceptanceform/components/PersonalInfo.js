import React, { useContext } from "react";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
// import TextField from "@mui/material/TextField";
import InputField from "./FormFields/InputField";
import { store } from "../../../store";
// import { Formik, useFormik, Form } from "formik";
// import * as Yup from "yup";

function PersonalInfo(props) {
  // Updating user info data through the global state provider
  const { state, dispatch } = useContext(store);
  const { userInfoData } = state;
  function updateUserInfoData(key, value) {
    dispatch({
      type: "UPDATE_PERSONAL_DETAILS",
      payload: { ...userInfoData, [key]: value },
    });
  }

  const {
    formField: { first_name, last_name, email, gitHub, phone },
  } = props;

  // const formik = useFormik({
  //   initialValues: {
  //     first_name: "",
  //     last_name: "",
  //     email: "",
  //     gitHub: "",
  //     phone: "",
  //   },
  //   onSubmit: function (values) {
  //     alert(`You are registered! Name: ${values.name}. Email: ${values.email}. Profession: ${values.profession}.
  //       Age: ${values.age}`);
  //   },
  // });

  // The object of requirements for validation
  // const validate = Yup.object({
  //   first_name: Yup.string()
  //     .max(25, "Must be 25 character of less")
  //     .required("Required"),
  //   last_name: Yup.string()
  //     .max(25, "Must be 25 character of less")
  //     .required("Required"),
  //   email: Yup.string()
  //     .email("Email is Invalid")
  //     .max(150, "Must be less than or equal to 150 characters")
  //     .required("Required"),
  //   gitHub: Yup.string().required("Required"),
  //   phone: Yup.number()
  //     .max(20, "Must be 20 characters or less")
  //     .required("Required"),
  // });

  return (
    <FormControl>
      <Grid container p={3} justify="space-between">
        <Grid container spacing={2} justify="space-between">
          <Grid item xs={12} sm={6} width="100%">
            <InputField
              name={first_name.name}
              label={first_name.label}
              // value={userInfoData.first_name}
              // onChange={(e) => updateUserInfoData("first_name", e.target.value)}
              variant="outlined"
              fullWidth
            />

            {/* <TextField
              name={first_name.name}
              placeholder="Type your first name"
              label={first_name.label}
              fullWidth
              required
              size="small"
              InputLabelProps={{ shrink: true }}
              value={userInfoData.first_name}
              onChange={(e) => updateUserInfoData("first_name", e.target.value)}
            /> */}
          </Grid>
          <Grid item xs={12} sm={6} width="100%">
            <InputField
              name={last_name.name}
              label={last_name.label}
              // value={userInfoData.last_name}
              // onChange={(e) => updateUserInfoData("last_name", e.target.value)}
              variant="outlined"
              fullWidth
            />
            {/* <TextField
              name={last_name.name}
              placeholder="Type your last name"
              label={last_name.label}
              variant="outlined"
              fullWidth
              required
              size="small"
              InputLabelProps={{ shrink: true }}
              value={userInfoData.last_name}
              onChange={(e) => updateUserInfoData("last_name", e.target.value)}
            /> */}
          </Grid>
          <Grid item xs={12} sm={6} width="100%">
            <InputField name={email.name} label={email.label} fullWidth />
            {/* <TextField
              name={email.name}
              placeholder="Type your email"
              label={email.label}
              fullWidth
              required
              size="small"
              InputLabelProps={{ shrink: true }}
              value={userInfoData.email}
              onChange={(e) => updateUserInfoData("email", e.target.value)}
            /> */}
          </Grid>
          <Grid item xs={12} sm={6} width="100%">
            <InputField name={gitHub.name} label={gitHub.label} fullWidth />
            {/* <TextField
              name={gitHub.name}
              placeholder="Type your GitHub username"
              label={gitHub.label}
              variant="outlined"
              fullWidth
              required
              size="small"
              InputLabelProps={{ shrink: true }}
              value={userInfoData.gitHub}
              onChange={(e) => updateUserInfoData("gitHub", e.target.value)}
            /> */}
          </Grid>
          <Grid item xs={12} sm={12} width="100%">
            <InputField name={phone.name} label={phone.label} fullWidth />
            {/* <TextField
              name={phone.name}
              placeholder="Type your phone number"
              label={phone.label}
              fullWidth
              required
              size="small"
              InputLabelProps={{ shrink: true }}
              value={userInfoData.phone}
              onChange={(e) => updateUserInfoData("phone", e.target.value)}
            /> */}
          </Grid>
        </Grid>
      </Grid>
    </FormControl>
  );
}

export default PersonalInfo;
