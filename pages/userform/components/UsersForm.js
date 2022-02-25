import React, { useState } from "react";
import { Grid, TextField } from "@mui/material";
import Controls from "../components/controls/Controls";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import ThemeContextWrapper from "../../../components/theme/ThemeContextWrapper";
import { ThemeContext, themes } from "../../../components/theme/ThemeContextWrapper";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "90%",
      margin: useTheme().spacing(1),
    },
  },
}));

const initialFormValues = {
  fullname: "",
  email: "",
  pronouns: "",
  techStack: "",
  github: "",
  facebook: "",
  linkedin: "",
  skills: "",
  previousIndustry: "",
  video: "",
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

  return (
    <form className={classes.root} onSubmit={handleSumitForm}>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <TextField
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
            placeholder="Node.js, AngularJS, React, Bootstrap, jQuery,"
            value={formData.techStack}
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
            placeholder="HTML, CSS, JavaScript, Teamwork, Problem-solving"
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
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            variant="outlined"
            label="Email"
            name="email"
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="example@google.test.com"
            value={formData.email}
            onChange={handleInputChange}
          />
          <TextField
            variant="outlined"
            label="Facebook"
            name="facebook"
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="@example.test"
            value={formData.facebook}
            onChange={handleInputChange}
          />
          <TextField
            variant="outlined"
            label="GitHub"
            name="github"
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="example.test@github.com"
            value={formData.github}
            onChange={handleInputChange}
          />
          <TextField
            variant="outlined"
            label="LinkedIn"
            name="linkedin"
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="example.test@linkedin.com"
            value={formData.linkedin}
            onChange={handleInputChange}
          />
          <TextField
            variant="outlined"
            label="Video"
            name="video"
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="Url video link"
            value={formData.video}
            onChange={handleInputChange}
          />
          <br/>
          <Stack direction="row" ml={8} spacing={2}>
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
