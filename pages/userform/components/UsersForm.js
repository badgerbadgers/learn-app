import React, { useState } from "react";
//import { nanoid } from "nanoid";
import { Grid, TextField, Typography, Button } from "@mui/material";
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
  id: 1,
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
  resume: "",
};

function UsersForm() {
  const classes = useStyles();
  const [userInfoData, setUserInfoData] = useState(initialFormValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfoData({
      ...userInfoData,
      [name]: value,
    });
  };

  const handleSumitForm = (e) => {
    e.preventDefault();
    console.log(userInfoData);

    // POST data to API route using fetch API
    // Using a PUT request to updateUser information
    const data = { userInfoData };
    fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    .then((res) => res.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  };

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
              <TextField
                {...input}
                id={input.id}
                value={input.userInfoData}
                onChange={(e) => handleInputChange(e)}
              />
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
              <TextField
                {...input}
                id={input.id}
                value={input.userInfoData}
                onChange={(e) => handleInputChange(e)}
              />
            </Grid>
          );
        })}
        <Grid container m={2}>
          <Stack direction="row" ml={2} spacing={1}>
            <Button variant="contained" onClick={handleSumitForm}>
              Submit
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
}

export default UsersForm;
