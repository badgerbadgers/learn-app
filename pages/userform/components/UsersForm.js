import React, { useState } from "react";
import { Paper, Box, Grid, Typography, TextField, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "90%",
      margin: useTheme().spacing(2),
    },
  },
}));

const initialFormValues = {
  id: "",
  fullname: "",
  pronouns: "",
  techStack: "",
  socialMedia: "",
  skills: "",
  previousIndustry: "",
};

function UsersForm() {
  const [formData, setFormData] = useState(initialFormValues);
  const classes = useStyles();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <form className={classes.root}>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <TextField
            id="fullname"
            required
            variant="outlined"
            label="Full Name"
            name="fullname"
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="First and Last name"
            value={formData.fullname}
            onChange={handleInputChange}
          />
          <TextField
            variant="outlined"
            label="Pronouns"
            name="pronouns"
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="He-Him, She-Her"
            value={formData.pronouns}
            onChange={handleInputChange}
          />
          <TextField
            required
            variant="outlined"
            label="Tech Stack"
            name="techStack"
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="Fullstack, Frontend, Backend, ..."
            value={formData.techStack}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            variant="outlined"
            label="Social Media"
            name="socialMedia"
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="GitHub, LinkedIn, ..."
            value={formData.socialMedia}
            onChange={handleInputChange}
          />
          <TextField
            required
            variant="outlined"
            label="Skills"
            name="skills"
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="Skills"
            value={formData.skills}
            onChange={handleInputChange}
          />
          <TextField
            variant="outlined"
            label="Previous Industry"
            name="previousIndustry"
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="Manufacture, Customer Service, Health Care, ..."
            value={formData.previousIndustry}
            onChange={handleInputChange}
          />
          <br />
          <Button variant="outlined">Submit</Button>
          <Button type="button" variant="outlined">
            Reset
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default UsersForm;
