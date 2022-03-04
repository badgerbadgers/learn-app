import React, { useState } from "react";
import { nanoid } from 'nanoid'
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

function UsersForm({ addUser }) {
  const classes = useStyles();
  const [userInfoData, setUserInfoData] = useState(initialFormValues);
  const [newUser, setNewUser] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log("vlaue", e);
    setUserInfoData({
      ...userInfoData,
      [name]: value,
    });
  };

  const resetForm = () => {
    setUserInfoData(initialFormValues);
  };

  const handleSumitForm = (e) => {
    e.preventDefault();
    console.log(userInfoData);
    const storage = localStorage.getItem("savedUsersData");
    if (!storage) {
      localStorage.setItem("savedUsersData", JSON.stringify(userInfoData));
    }
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    //addUser(newUser);
    addUser({ id: nanoid(), name: userInfoData});
    setNewUser('');
  }

  // fetch('/api/users', {
  //   method: "POST",
  //   body: JSON.stringify({userInfoData}),
  // })
  //   .then((res) => res.json())
  //   .then((result) => {
  //     setUserInfoData(result);
  //     console.log(result);
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //   }
  // )

  return (
    <form className={classes.root}
      onSubmit={handleAddUser}
    >
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
                // onChange={(e) => setNewUser(e.target.value)}
                onChange={(e) => handleInputChange(e)}
                handleSumitForm={handleSumitForm}
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
                // onChange={(e) => setNewUser(e.target.value)}
                onChange={(e) => handleInputChange(e)}
              />
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
