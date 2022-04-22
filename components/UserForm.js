import React, { useState, forwardRef, useEffect } from "react";
import { Chip, Grid, TextField, Typography, Button, Paper, Container } from "@mui/material";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useRouter } from "next/router";
import axios from "axios";
import styles from "../styles/Portfolio.module.css";


// Will animate the display message after the form is submitted
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
});

function UserForm({userInfoData, setUserInfoData}) {
  const [open, setOpen] = useState(false);
  const [techStackArray, setTechStackArray] = useState(userInfoData.techStackArray || []);
  const [skillsArray, setSkillsArray] = useState(userInfoData.skillsArray || []);
  const [previousIndustryArray, setPreviousIndustryArray] = useState(userInfoData.previousIndustryArray || []);
  const [errors, setErrors] = useState({email: ""});

console.log('******Errors value****', errors)

console.log('******Errors state****',!!errors.email)
console.log('***UserInfo email***', userInfoData.email)

  const router = useRouter();
  const id = router.query.id;


  // Handle multiple input change to update the properties of userInfoData
  // Then update the value of the event that was triggered by that onChange
  // and validate the email from the user.
  const handleInputChange = (e) => {
  
     const { name, value } = e.target;

     setUserInfoData({ ...userInfoData, [name]: value.replace(/^\s+/g, "") }); // removes all the spaces in the front of the string.

     if (name === "email") {
      // setUserInfoData({email: value});
      let isEmailValid = new RegExp(/$^|.+@+""[A-Z0-9.-]+\.[A-Z]{2,}$/i).test(value);
      console.log('******is email ****', isEmailValid)
      if (!isEmailValid) {
        setErrors( {email: "Valid email address required."});
      } else {
        setErrors({email: ""});
        console.log(errors)
      }
     }
  
  };

  const handleArrayData = (e) => {
    e.preventDefault();
    const {name} = e.target;  
    if (name === 'techStackBtn') {
      const newArray = [...techStackArray];// Make a copy of the tech stack array first.
      newArray.push(userInfoData.techStackInput);// Update it with the modified tech stack entry.
      setTechStackArray(newArray); // Update the state.
            // clear the input form
      let data = userInfoData; // Assigning userInfoData to data variable.
      data.techStackInput = ""; // Take tech Stack and assign to empty string
      setUserInfoData(data); // update the state

    } else if (name === 'skillsBtn') {
      const newArray = [...skillsArray];
      newArray.push(userInfoData.skillInput);
      setSkillsArray(newArray);
           // clear the input form
      let data = userInfoData; // Assigning userInfoData to data variable.
      data.skillInput = ""; // Take tech Stack and assign to empty string
      setUserInfoData(data); // update the state

    } else if (name === 'previousIndustryBtn') {
      const newArray =  [...previousIndustryArray];
      newArray.push(userInfoData.previousIndustryInput);
      setPreviousIndustryArray(newArray);
           // clear the input form
      let data = userInfoData; // Assigning userInfoData to data variable.
      data.previousIndustryInput = ''; // Take tech Stack and assign to empty string
      setUserInfoData(data); // update the state
    } 
  }

  const handleSubmitForm = (e) => {
    e.preventDefault();
 
    handleDialogChange(); // To pass it in onClick event as multiple functions 

    // POST data to API route using fetch API
    // Remove key object from user form when is posted to the users route
    const { skillInput, techStackInput, previousIndustryInput, ...updatedUserInfoData } = userInfoData;
   
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
    <Container>
      <Paper elevation={15}>
        <div className={styles.titleForm}>
          {<DriveFileRenameOutlineIcon fontSize="large" />}
          <Typography p={2} variant="h5">
            Input Form
          </Typography>
        </div>
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
                  name="techStackInput"
                  placeholder="Press Add for each tech stack"
                  label="Tech Stack"
                  variant="outlined"
                  value={userInfoData.techStackInput}
                  fullWidth
                  size="small"
                  type="text"
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => handleInputChange(e)}
                  InputProps={{
                    endAdornment: userInfoData && (
                      <Button
                        size="small"
                        variant="contained"
                        name="techStackBtn"
                        style={{ maxWidth: "40px", minWidth: "40px" }}
                        onClick={(e) => handleArrayData(e)}
                        disabled={!userInfoData.techStackInput?.length > 0}
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
                      color='secondary'
                      sx={{margin: "8px 4px 8px 0px", fontFamily: "Montserrat"}}
                      label={tech}
                      onDelete={() => handleDeleteTechStack(item)}
                  />
                ))}
              </Grid>
              <Grid item xs={12} sm={6} width="100%">
                <TextField
                  name="skillInput"
                  placeholder="Press Add for each skills"
                  label="Skills"
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={userInfoData.skillInput}
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => handleInputChange(e)}
                  InputProps={{
                    endAdornment: userInfoData && (
                      <Button
                        size="small"
                        name="skillsBtn"
                        variant="contained"
                        style={{ maxWidth: "40px", minWidth: "40px" }}
                        onClick={(e) => handleArrayData(e)}
                        disabled={!userInfoData.skillInput?.length > 0}
                      >
                        Add
                      </Button>
                    )
                  }}
                />

                {/* It will map and style the skills array */}
                {skillsArray.map((skill, item) => (
                  <Chip
                    key={skill}
                    color='secondary'
                    sx={{margin: "8px 4px 8px 0px", fontFamily: "Montserrat"}}
                    label={skill}
                    onDelete={() => handleDeleteSkills(item)}
                  />
                  
                ))}
              </Grid>
              <Grid item xs={12} sm={6} width="100%">
                <TextField
                  name="previousIndustryInput"
                  placeholder="Press Add for each previous"
                  label="Previous Industry"
                  variant="outlined"
                  fullWidth
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  value={userInfoData.previousIndustryInput}
                  onChange={(e) => handleInputChange(e)}
                  InputProps={{
                    endAdornment: !!userInfoData && (
                      <Button
                      disabled={!userInfoData.previousIndustryInput?.length > 0}
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
                {/* It will map and style the previous industry array */}
                {previousIndustryArray.map((previousIndust, item) => (
              
                  <Chip
                    key={previousIndust}
                    color='secondary'
                    sx={{margin: "8px 4px 8px 0px", fontFamily: "Montserrat"}}
                    // className={classes.chipStyle}
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
                  error={!!errors?.email}
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
                    disabled={(userInfoData.firstName || userInfoData.lastName || userInfoData.email) &&
                      !userInfoData.firstName?.length > 0 ||
                      !userInfoData.lastName?.length > 0 ||
                      userInfoData.email.length === 0 ||
                      !!errors.email
                    }
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
      </Paper>
    </Container>
  );
}

export default UserForm;