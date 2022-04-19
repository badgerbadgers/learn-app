import React, { useState, forwardRef } from "react";
import { Chip, Grid, TextField, Typography, Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { makeStyles } from "@mui/styles";
import { useRouter } from "next/router";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  chipStyle: {
    backgroundColor: "#FF5C35",
    color: "#FFFFFF",
    margin: "8px 4px 8px 0px",
  },
}));

// Will animate the display message after the form is submitted
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function UsersForm({userInfoData, setUserInfoData}) {
  const classes = useStyles();
  const router = useRouter();
  // const [userInfoData, setUserInfoData] = useState(initialFormValues);
  const [open, setOpen] = useState(false);
  const [skillsArray, setSkillsArray] = useState([]);
  const [techStackArray, setTechStackArray] = useState("");
  const [previousIndustryArray, setPreviousIndustryArray] = useState([]);
  const [errors, setErrors] = useState({ email: "" });
 
  const id = router.query.id;

  // Handle multiple input change to update the properties of userInfoData
  // Then update the value of the event that was triggered by that onChange
  // and validate the email from the user.
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      let reg = new RegExp(/$^|.+@[A-Z0-9.-]+\.[A-Z]{2,}$/i).test(value);
      if (!reg) {
        setErrors({ email: "Valid email address required." });
      } else {
        setErrors({ email: "" });
      }
    } else 
    setUserInfoData({ ...userInfoData, [name]: value });

  };

  // else if (name === "techStack") {
    // setArrayValue(value);
    // () => setTechStackArray(...techStackArray, arrayValue)
  
  console.log('****Initial userInfo Data***' + JSON.stringify(userInfoData));
  console.log('*****Initial userInfo tech data***' + JSON.stringify(userInfoData.techStack))
  console.log('***techStackarray' + techStackArray)
  console.log('*****length userInfo tech data***' + JSON.stringify(userInfoData.techStack.length))



  const handleArrayData = (e) => {
    e.preventDefault();
    const {name, value} = e.target;  
    if (name === 'techStackBtn') {
     
      setUserInfoData({techStack: [...userInfoData.techStack, techStackArray]});
      //let data = userInfoData; // Assigning userInfoData to data variable.
      setTechStackArray(''); // Take tech Stack and assign to empty string
      //setUserInfoData(data); // update the state
    } else if (name === 'skillsBtn') {
      const newArray = [...skillsArray];
      newArray.push(userInfoData.skills);
      setSkillsArray(newArray);
      let data = userInfoData; // Assigning userInfoData to data variable.
      data.skills = []; // Take tech Stack and assign to empty string
      setUserInfoData(data); // update the state
    } else if (name === 'previousIndustryBtn') {
      const newArray =  [...previousIndustryArray];
      newArray.push(userInfoData.previousIndustry);
      setPreviousIndustryArray(newArray);
      let data = userInfoData; // Assigning userInfoData to data variable.
      data.previousIndustry = []; // Take tech Stack and assign to empty string
      setUserInfoData(data); // update the state
    } 
  }

  const handleSubmitForm = (e) => {
    e.preventDefault();
    console.log(userInfoData);
    handleDialogChange(); // To pass it in onClick event as multiple functions 

    // POST data to API route using fetch API
    // Remove key object from user form when is posted to the users route
    const { skills, techStack, previousIndustry, ...updatedUserInfoData } = userInfoData;
   
    const data = {
      ...updatedUserInfoData,
      skillsArray,
      techStackArray,
      previousIndustryArray,
    };
    axios
      .post(
        "/api/users",
        {
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        },
        { params: { id: id } }
      )
      .then((res) => {
        console.log(res.data.message, "response message");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };    

  // Handle delete functions to cancel input into array of
  // Do not remove the param skill, tech and previousIndust
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

  const handleDialogChange = () => {
    setOpen(!open)
  }

  // Passing multiple functions on onClick event
  const handleDialogComplete = () => {
    handleDialogChange();
    router.push("/dashboard");
  }

  return (
    <form>
      <Grid container p={3}>
        <Typography variant="body1" gutterBottom>
          <strong>Personal Info: </strong>
        </Typography>
        <Grid container spacing={2}>
          {/* Input values to fisrt, last name and pronouns fields */}
          <Grid item xs={12} sm={6} width="100%">
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
              value={userInfoData.lastName}
              onChange={(e) => handleInputChange(e)}
            />
          </Grid>
          <Grid item xs={12} sm={6} width="100%">
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
          <Grid item xs={12} sm={6} width="100%">
            <TextField
              name="techStack"
              placeholder="Press Add for each tech stack"
              label="Tech Stack"
              variant="outlined"
              fullWidth
              size="small"
              type="text"
              InputLabelProps={{ shrink: true }}
              
              onChange={(e) => 
                setTechStackArray(e.target.value)
              }
              InputProps={{
                endAdornment: userInfoData && (
                  <Button
                    size="small"
                    variant="contained"
                    name="techStackBtn"
                    style={{ maxWidth: "40px", minWidth: "40px" }}
                    onClick={(e) => handleArrayData(e)}
                    disabled={userInfoData.techStack && userInfoData.techStack.length === 0}
                  >
                    Add
                  </Button>
                ),
              }}
            />
            {userInfoData.techStack.length > 0 ? userInfoData.techStack.map((tech, item) => (
              <Chip 
                key={tech}
                color="primary"
                sx={{margin: "8px 4px 8px 0px"}}
                // className={classes.chipStyle}
                label={tech}
                onDelete={() => handleDeleteTechStack(item)}
              />
            )) : ""/* It will map and style the tech stack array */
            //     techStackArray.map((tech, item) => (
            //   <Chip 
            //     key={tech}
            //     color="primary"
            //     sx={{margin: "8px 4px 8px 0px"}}
            //     // className={classes.chipStyle}
            //     label={tech}
            //     onDelete={() => handleDeleteTechStack(item)}
            //   />
             //))
             }
          </Grid>
          <Grid item xs={12} sm={6} width="100%">
            <TextField
              name="skills"
              placeholder="Press Add for each skills"
              label="Skills"
              variant="outlined"
              fullWidth
              size="small"
              InputLabelProps={{ shrink: true }}
              value={userInfoData.skills}
              onChange={(e) => handleInputChange(e)}
              InputProps={{
                endAdornment: userInfoData && (
                  <Button
                    size="small"
                    name="skillsBtn"
                    variant="contained"
                    style={{ maxWidth: "40px", minWidth: "40px" }}
                    onClick={(e) => handleArrayData(e)}
                    disabled={userInfoData.skills && userInfoData.skills.length === 0}
                  >
                    Add
                  </Button>
                ),
              }}
            />

            {/* {userInfoData.skills ? userInfoData.skills.map((skill, i) => (
              <Chip
              key={skill}
              className={classes.chipStyle}
              label={skill}
              onDelete={() => handleDeleteSkills(item)}
              />
              )) : ""} */}

            {/* It will map and style the skills array */}
            {skillsArray.map((skill, item) => (
                  
              <Chip
                key={skill}
                className={classes.chipStyle}
                label={skill}
                onDelete={() => handleDeleteSkills(item)}
              />
              
            ))}
          </Grid>
          <Grid item xs={12} sm={6} width="100%">
            <TextField
              name="previousIndustry"
              placeholder="Press Add for each previous"
              label="Previous Industry"
              variant="outlined"
              fullWidth
              size="small"
              InputLabelProps={{ shrink: true }}
              value={userInfoData.previousIndustry}
              onChange={(e) => handleInputChange(e)}
              InputProps={{
                endAdornment: userInfoData && (
                  <Button
                  disabled={userInfoData.previousIndustry && userInfoData.previousIndustry.length === 0}
                  onClick={(e) => handleArrayData(e)}
                  name="previousIndustryBtn"
                  size="small"
                  variant="contained"
                  style={{ maxWidth: "40px", minWidth: "40px" }}
                  >
                    Add
                  </Button>
                ),
              }}
            />
            {/* {userInfoData.previousIndustry && userInfoData.previousIndustry.map((previousIndust, item) => (
              console.log({previousIndust}),
              <Chip
                key={previousIndust}
                className={classes.chipStyle}
                label={previousIndust}
                onDelete={() => handleDeletePreviousIndustry(item)}
              />
            ))} */}

            {/* It will map and style the previous industry array */}
            {previousIndustryArray.map((previousIndust, item) => (
              console.log({previousIndust}),
              <Chip
                key={previousIndust}
                className={classes.chipStyle}
                label={previousIndust}
                onDelete={() => handleDeletePreviousIndustry(item)}
              />
            ))}
          </Grid>
        </Grid>
        <br />
        <Typography variant="body1" mt={2} gutterBottom>
          <strong>Personal Contact: </strong>
        </Typography>
        {/* Input values to personal contact fields */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} width="100%">
            <TextField
              name="email"
              type="email"
              required
              placeholder="example@test.com"
              label="Email"
              variant="outlined"
              fullWidth
              size="small"
              error={Boolean(errors?.email)}
              helperText={errors?.email}
              InputLabelProps={{ shrink: true }}
              value={userInfoData.email}
              onChange={(e) => handleInputChange(e)}
            />
          </Grid>
          <Grid item xs={12} sm={6} width="100%">
            <TextField
              name="linkedin"
              placeholder="Enter your @username"
              label="LinkedIn"
              variant="outlined"
              fullWidth
              size="small"
              InputLabelProps={{ shrink: true }}
              value={userInfoData.linkedin}
              onChange={(e) => handleInputChange(e)}
            />
          </Grid>
          <Grid item xs={12} sm={6} width="100%">
            <TextField
              name="twitter"
              placeholder="Enter your @username"
              label="Twitter"
              variant="outlined"
              fullWidth
              size="small"
              InputLabelProps={{ shrink: true }}
              value={userInfoData.twitter}
              onChange={(e) => handleInputChange(e)}
            />
          </Grid>
          <Grid item xs={12} sm={6} width="100%">
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
          <Grid
            container
            mt={2}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <div>
              <Button
                variant="contained"
                // disabled={(userInfoData.firstName || userInfoData.lastName || userInfoData.email) &&
                //   userInfoData.firstName.length === 0 ||
                //   userInfoData.lastName.length === 0 ||
                //   userInfoData.email.length === 0
                // }
                onClick={(e) => handleSubmitForm(e)} 
              >           
                Submit
              </Button>
              <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleDialogChange}
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogTitle color="green">
                  {"Code The Dream Apprenticeship Form"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-slide-description">
                    Thank you for submitting the CTD apprenticeship Form.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={handleDialogComplete}
                  >
                    Close
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}

export default UsersForm;