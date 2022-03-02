import React, { useState } from "react";
import { Grid, TextField, Typography } from "@mui/material";
import Controls from "../components/controls/Controls";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import { inputFormElements } from "./FormElements";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "90%",
      margin: useTheme().spacing(1),
    },
  },
}));

const initialFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  pronouns: "",
  techStack: "",
  github: "",
  facebook: "",
  linkedin: "",
  twitter: "",
  skills: "",
  previousIndustry: "",
  videoUrl: "",
  userAvatar: "",
};

function UsersForm() {
  const [formData, setFormData] = useState(initialFormValues);
  const classes = useStyles();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log("vlaue", e)
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const resetForm = () => {
    setFormData(initialFormValues);
  };

  const handleSumitForm = (e) => {
    e.preventDefault();
    console.log(formData);
    const storage = localStorage.getItem("savedUsersData");
    if (!storage) {
      localStorage.setItem("savedUsersData", JSON.stringify(formData));
    }
  };

  console.log(formData);

  return (
    <form className={classes.root} onSubmit={handleSumitForm}>
      <Typography variant="body2" align="left" ml={3} gutterBottom>
        Personal Info:
      </Typography>
      <Grid container spacing={1}>
        {inputFormElements.slice(0, 6).map((input) => {
          input.key = input.name;
          return (
            <Grid item sx={input.sx} sm={input.sm} key={input.key}>
              <TextField {...input} onChange={(e) => handleInputChange(e)}/>
            </Grid>
          );
        })}
      </Grid>
      <br />
      <Typography variant="body2" align="left" ml={3} gutterBottom>
        Personal Contact:
      </Typography>
      <Grid container spacing={1}>
        {inputFormElements.slice(6, inputFormElements.length).map((input) => {
          input.key = input.name;
          return (
            <Grid item sx={input.sx} sm={input.sm} key={input.key}>
              <TextField {...input} onChange={(e) => handleInputChange(e)} />
            </Grid>
          );
        })}
        <Grid container m={2}>
          <Stack direction="row" ml={2} spacing={1}>
            <Controls.Button text="Submit" type="submit" />
            <Controls.Button
              variant="outlined"
              text="Reset"
              onClick={resetForm}
            />
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
}

export default UsersForm;
