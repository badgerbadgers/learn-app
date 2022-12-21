import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import AddIcon from "@mui/icons-material/Add";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Lesson from "./Lesson";
import Section from "./Section";
import Typography from "@mui/material/Typography";

export default function Form({ lessons }) {
  // const [section, setSection] = useState(!!lessons[0] ? lessons[0].section.title : "")
  // const [lesson, setLesson]=useState(lessons.title)
  // console.log(lessons[0].section)

  const uniqueSectionArray = [];
  lessons.forEach((lesson) => {
    if (!uniqueSectionArray.includes(lesson.section.title)) {
      uniqueSectionArray.push(lesson.section.title);
    }
  });
  console.log(uniqueSectionArray);

  return (
    <Box sx={{ width: "100%", m: "2em" }}>
      <Grid item lg={9} sx={{ ml: "3em", mb: "3em" }}>
        <FormControl>
          <Stack>
            {uniqueSectionArray.map((section) => {
              const lessonComponent = lessons.map((lesson) => {
                // return <Box key={lesson._id}>{lesson.title}</Box>;

                if (section === lesson.section.title) {
                  return <Lesson key={lesson._id} title={lesson.title} />;
                }
              });
              return (
                <>
                  <Section sectionTitle={section} />
                  {lessonComponent}
                </>
              );
            })}
          </Stack>
        </FormControl>
        <Button
          sx={{
            border: "1px solid #D9D9D9",
            borderRadius: "20px",
            float: "right",
          }}
          startIcon={<AddIcon />}
        >
          Section
        </Button>
      </Grid>
    </Box>
  );
}
