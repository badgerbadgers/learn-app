import React, { useState } from "react";
import { Grid, TextField, Typography, Button } from "@mui/material";
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
  listInput: {
    display: "inline-block",
    alignItems: "center",
    margin: "5px 0",
    marginRight: "5px",
    marginTop: "5px",
    padding: "5px",
    borderRadius: "10px",
    backgroundColor: "lightgray",
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
      .then((res) => res.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // Handle delete functions to cancel input into array
  const handleDeleteSkills = (index) => {
    setSkillsArray((prevState) => prevState.filter((skill, i) => i !== index));
  };

  // const handleDeleteSkills = (index) => {
  //   const newSkills = skills.filter((skill) => skill !== index)
  // }

  const handleDeleteTechStack = (index) => {
    setTechStackArray((prevState) =>
      prevState.filter((tech, i) => i !== index)
    );
  };
  const handleDeletePreviousIndustry = (index) => {
    setPreviousIndustryArray((prevState) =>
      prevState.filter((previousIndust, i) => i !== index)
    );
  };

  return (
    <form className={classes.root}>
      <Typography variant="body2" align="left" ml={3} gutterBottom>
        Personal Info:
      </Typography>
      <Grid container spacing={1}>
        {/* Input values to fisrt and last name fields */}
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
        {/* Will add item on array of tech stack field*/}
        <Grid item sx={12} sm={6}>
          <TextField
            name="techStack"
            placeholder="Node.js, AngularJS, React, ..."
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
          {/* It will styling the tech stack array */}
          {techStackArray.map((tech, index) => (
            <div key={tech} className={classes.listInput}>
              {tech}
              <button
                size="small"
                variant="contained"
                onClick={() => handleDeleteTechStack(index)}
              >
                x
              </button>
            </div>
          ))}
        </Grid>
        {/* Will add item on array of skills field*/}
        <Grid item sx={12} sm={6}>
          <TextField
            name="skills"
            placeholder="HTML, JavaScript, Teamwork,..."
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
          {/* It will styling the skills array */}
          {skillsArray.map((skill, index) => (
            <div key={skill} className={classes.listInput}>
              {skill}
              <button
                size="small"
                variant="contained"
                onClick={() => handleDeleteSkills(index)}
              >
                x
              </button>
            </div>
          ))}
        </Grid>
        {/* Will add item on array of previous industry field*/}
        <Grid item sx={12} sm={6}>
          <TextField
            name="previousIndustry"
            placeholder="Manufacture, Customer Service,..."
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
          {/* It will styling the tech stack array */}
          {previousIndustryArray.map((previousIndust, index) => (
            <div key={previousIndust} className={classes.listInput}>
              {previousIndust}
              <button
                size="small"
                variant="contained"
                onClick={() => handleDeletePreviousIndustry(index)}
              >
                x
              </button>
            </div>
          ))}
        </Grid>
      </Grid>
      <br />
      <Typography variant="body2" align="left" ml={3} gutterBottom>
        Personal Contact:
      </Typography>
      {/* Input values to personal contact fields */}
      <Grid container spacing={1}>
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
