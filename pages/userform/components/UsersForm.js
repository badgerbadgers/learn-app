import React, { useState } from "react";
import { Chip, Grid, TextField, Typography, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "90%",
      margin: useTheme().spacing(1),
    },
  },
}));

const initialFormValues = {
  id: 0,
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
  const [skillsArray, setSkillsArray] = useState([]);
  const [techStackArray, setTechStackArray] = useState([]);
  const [previousIndustryArray, setPreviousIndustryArray] = useState([]);

  const handleTeckStackArray = () => {
    const arrayTech = [...techStackArray];
    arrayTech.push(userInfoData.techStack);
    setTechStackArray(arrayTech);
    // clear the input form
    let data = userInfoData;
    data.techStack = "";
    setUserInfoData(data);
    console.log("useInfodata", userInfoData);
  };

  const handleSkillsArray = () => {
    const arraySkill = [...skillsArray];
    arraySkill.push(userInfoData.skills);
    setSkillsArray(arraySkill);
    // clear the input form
    let data = userInfoData;
    data.skills = "";
    setUserInfoData(data);
    console.log("arraySkill", arraySkill);
  };

  const handlePreviousIndustryArray = () => {
    const arrayPreviousIndust = [...previousIndustryArray];
    arrayPreviousIndust.push(userInfoData.previousIndustry);
    setPreviousIndustryArray(arrayPreviousIndust);
    // clear the input form
    let data = userInfoData;
    data.previousIndustry = "";
    console.log("arrayPreviousIndust", arrayPreviousIndust);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfoData({ ...userInfoData, [name]: value });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    console.log(userInfoData);

    // POST data to API route using fetch API
    const data = {
      ...userInfoData,
      skillsArray,
      techStackArray,
      previousIndustryArray,
    };
    fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        console.log(res.status, "res status");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // Handle delete functions to cancel input into array
  const handleDeleteSkills = (item) => {
    setSkillsArray((prevState) => prevState.filter((skill, i) => i !== item));
  };

  const handleDeleteTechStack = (item) => {
    setTechStackArray((prevState) => prevState.filter((tech, i) => i !== item));
  };
  const handleDeletePreviousIndustry = (item) => {
    setPreviousIndustryArray((prevState) =>
      prevState.filter((previousIndust, i) => i !== item)
    );
  };

  return (
    <form className={classes.root}>
      <Typography variant="body2" align="left" ml={2} gutterBottom>
        <strong>Personal Info: </strong>
      </Typography>
      <Grid container spacing={1} align="left" ml={0}>
        {/* Input values to fisrt, last name and pronouns fields */}
        <Grid item sx={12} sm={6}>
          <TextField
            name="firstName"
            placeholder="Type your first name"
            label="First Name"
            variant="outlined"
            fullWidth
            required
            size="small"
            InputLabelProps={{ shrink: true }}
            value={userInfoData.firstName}
            onChange={(e) => handleInputChange(e)}
          />
        </Grid>
        <Grid item sx={12} sm={6}>
          <TextField
            name="lastName"
            placeholder="Type your last name"
            label="Last Name"
            variant="outlined"
            fullWidth
            required
            size="small"
            InputLabelProps={{ shrink: true }}
            value={userInfoData.lastName}
            onChange={(e) => handleInputChange(e)}
          />
        </Grid>
        <Grid item sx={12} sm={6}>
          <TextField
            name="pronouns"
            placeholder="Type your pronouns"
            label="Pronouns"
            variant="outlined"
            fullWidth
            size="small"
            InputLabelProps={{ shrink: true }}
            value={userInfoData.pronouns}
            onChange={(e) => handleInputChange(e)}
          />
        </Grid>
        <Grid item sx={12} sm={6}>
          <TextField
            name="techStack"
            placeholder="Type your tech stacks"
            label="Tech Stack"
            variant="outlined"
            fullWidth
            required
            size="small"
            InputLabelProps={{ shrink: true }}
            value={userInfoData.techStack}
            onChange={(e) => handleInputChange(e)}
            InputProps={{
              endAdornment: userInfoData && (
                <Button
                  size="small"
                  variant="contained"
                  onClick={handleTeckStackArray}
                  disabled={userInfoData.techStack.length === 0}
                >
                  Add
                </Button>
              ),
            }}
          />
          {/* It will map and style the tech stack array */}
          {techStackArray.map((tech, item) => (
            <Chip
              key={tech}
              style={{
                backgroundColor: "#FF5C35",
                color: "#FFFFFF",
                marginLeft: "10px",
              }}
              label={tech}
              onDelete={() => handleDeleteTechStack(item)}
            />
          ))}
        </Grid>
        <Grid item sx={12} sm={6}>
          <TextField
            name="skills"
            placeholder="Type your skills"
            label="Skills"
            variant="outlined"
            fullWidth
            required
            size="small"
            InputLabelProps={{ shrink: true }}
            value={userInfoData.skills}
            onChange={(e) => handleInputChange(e)}
            InputProps={{
              endAdornment: userInfoData && (
                <Button
                  size="small"
                  variant="contained"
                  onClick={handleSkillsArray}
                  disabled={userInfoData.skills.length === 0}
                >
                  Add
                </Button>
              ),
            }}
          />
          {/* It will map and style the skills array */}
          {skillsArray.map((skill, item) => (
            <Chip
              key={skill}
              style={{
                backgroundColor: "#FF5C35",
                color: "#FFFFFF",
                marginLeft: "10px",
              }}
              label={skill}
              onDelete={() => handleDeleteSkills(item)}
            />
          ))}
        </Grid>
        <Grid item sx={12} sm={6}>
          <TextField
            name="previousIndustry"
            placeholder="Type your previous industry"
            label="Previous Industry"
            variant="outlined"
            fullWidth
            required
            size="small"
            InputLabelProps={{ shrink: true }}
            value={userInfoData.previousIndustry}
            onChange={(e) => handleInputChange(e)}
            InputProps={{
              endAdornment: userInfoData && (
                <Button
                  size="small"
                  variant="contained"
                  onClick={handlePreviousIndustryArray}
                  disabled={userInfoData.previousIndustry.length === 0}
                >
                  Add
                </Button>
              ),
            }}
          />
          {/* It will map and style the previous industry array */}
          {previousIndustryArray.map((previousIndust, item) => (
            <Chip
              key={previousIndust}
              style={{
                backgroundColor: "#FF5C35",
                color: "#FFFFFF",
                marginLeft: "10px",
              }}
              label={previousIndust}
              onDelete={() => handleDeletePreviousIndustry(item)}
            />
          ))}
        </Grid>
      </Grid>
      <br />
      <Typography variant="body2" align="left" ml={2} gutterBottom>
        <strong>Personal Contact: </strong>
      </Typography>
      {/* Input values to personal contact fields */}
      <Grid container spacing={1} align="left" ml={0}>
        <Grid item sx={12} sm={6}>
          <TextField
            name="email"
            type="email"
            required
            placeholder="example@test.com"
            label="Email"
            variant="outlined"
            fullWidth
            size="small"
            InputLabelProps={{ shrink: true }}
            value={userInfoData.email}
            onChange={(e) => handleInputChange(e)}
          />
        </Grid>
        <Grid item sx={12} sm={6}>
          <TextField
            name="Facebook"
            placeholder="@example.test"
            label="Facebook"
            variant="outlined"
            fullWidth
            size="small"
            InputLabelProps={{ shrink: true }}
            value={userInfoData.facebook}
            onChange={(e) => handleInputChange(e)}
          />
        </Grid>
        <Grid item sx={12} sm={6}>
          <TextField
            name="github"
            placeholder="@example.test"
            label="GitHub"
            variant="outlined"
            fullWidth
            size="small"
            InputLabelProps={{ shrink: true }}
            value={userInfoData.github}
            onChange={(e) => handleInputChange(e)}
          />
        </Grid>
        <Grid item sx={12} sm={6}>
          <TextField
            name="linkedin"
            placeholder="@example.test"
            label="LinkedIn"
            variant="outlined"
            fullWidth
            size="small"
            InputLabelProps={{ shrink: true }}
            value={userInfoData.linkedin}
            onChange={(e) => handleInputChange(e)}
          />
        </Grid>
        <Grid item sx={12} sm={6}>
          <TextField
            name="twitter"
            placeholder="@example.test"
            label="Twitter"
            variant="outlined"
            fullWidth
            size="small"
            InputLabelProps={{ shrink: true }}
            value={userInfoData.twitter}
            onChange={(e) => handleInputChange(e)}
          />
        </Grid>
        <Grid item sx={12} sm={6}>
          <TextField
            name="videoUrl"
            placeholder="Past your video url"
            label="Video Url"
            variant="outlined"
            fullWidth
            size="small"
            InputLabelProps={{ shrink: true }}
            value={userInfoData.videoUrl}
            onChange={(e) => handleInputChange(e)}
          />
        </Grid>
        <Grid container m={2}>
          <Stack direction="row" ml={2} spacing={1}>
            <Button variant="contained" onClick={handleSubmitForm}>
              Submit
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
}

export default UsersForm;
